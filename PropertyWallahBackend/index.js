const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");

const dotenv = require("dotenv");
const cors = require("cors");

const authRoute=require('./routes/AuthRoutes')
const propertyRoutes=require('./routes/PropertyRoutes')
const societyRoutes=require('./routes/SocietyRoutes')
const stateRoutes=require('./routes/StateRoutes')
const emailRoutes=require('./routes/EmailRoutes') 
const planRoutes=require('./routes/PlansRoutes')
const subscribeRoute = require('./routes/Email');



dotenv.config();
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      serverSelectionTimeoutMS: 5000, 
    });
    console.log("DB Connected Successfully 🔥");
  } catch (error) {
    console.error("DB Connection Failed", error);
    process.exit(1); 
  }
};   

connectDB();

app.use(express.json());
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "*",
    credentials: true,
    maxAge: 14400,
  })
);


app.use('/api/v1/user',authRoute)
app.use('/api/v1/property',propertyRoutes)
app.use('/api/v1/society',societyRoutes)
app.use('/api/v1/state',stateRoutes)
app.use('/api/v1/mail',emailRoutes)
app.use('/api/v1/plans',planRoutes)
app.use('/api/v1/email', subscribeRoute);
app.use('/api/v1/contact', require('./routes/ContactRoutes'));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "client/build")));
app.use("/upload", express.static(path.join(__dirname, "upload")));

app.get("/", (req, res) => {
  res.status(200).json({
    message: "Welcome to the Property Wallah Backend",
  });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT} 🤝`);
});
