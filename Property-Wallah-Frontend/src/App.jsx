import React, { useState, useEffect } from "react";
import "./App.css";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Home from "./Screens/Landing/Home";
import PostProperty from "./components/core/PostProperty";
import { useSelector, useDispatch } from "react-redux";
import { selectIsAuthenticated } from "./Redux/Auth";
import LoginModal from "./components/core/Auth/LoginRegister";
import Properties from "./Screens/Landing/PropertyListing/Properties";
import PropertyCard from "./Screens/Landing/projectDetails";
import SocietyForm from "./components/core/Society/SocietyForm";
import { fetchAllProperties } from "./Redux/PropertySlice";
import NewsletterModal from "./components/common/Newslettermodal";
import PolotnoEditor from "./Screens/Landing/PropertyListing/PolotnoEditor";
import SingleP from "./Screens/Landing/SingleP";
import Plans from "./Screens/Plans";
import TermsAndConditions from "./Screens/termsAndConditions";
import PrivacyAndPolicy from "./Screens/PrivacyAndPolicy";
import Profile from "./components/core/Profile/Profile";
import PageReplica from "./Raplica"; // Import the new component
import Aboutus from "./Screens/Aboutus";
import Contactus from "./Screens/Contactus";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  

  return <>{isAuthenticated ? element : <LoginModal open={true} />}</>;
};

function App() {
  const dispatch = useDispatch();
  const { loading, properties } = useSelector((state) => state.properties);
  const location = useLocation();
  
  useEffect(() => {
    if (!loading && properties.length === 0) {
      dispatch(fetchAllProperties());
    }
  }, [dispatch, loading, properties.length]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const { pwUser } = useSelector((state) => state.profile);
  // console.log("mkasd",properties)

  return ( 
    <div className="w-full bg-white">
      {!pwUser && <NewsletterModal />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/post-property"
          element={<PrivateRoute element={<PostProperty />} />}
        />
        <Route path='/profile/:id/:name' element={<PrivateRoute element={<Profile />} />} />
        <Route path="/properties" element={<Properties />} />
        <Route path="/properties/:propertyName/:propertyId" element={<SingleP />} />
        <Route path="/project-details/:projectName/:projectId" element={<PropertyCard />} />
        <Route path="/society" element={<PrivateRoute element={<SocietyForm />} />}/>
        <Route path="/plutno" element={<PolotnoEditor/>} />
        <Route path="/plans" element={<Plans/>}/>
        <Route path="/info/privacy-policy" element={<PrivacyAndPolicy/>} />
        <Route path="/info/term-and-conditions" element={<TermsAndConditions/>} />  
        <Route path="/info/about-us" element={<Aboutus/>} /> 
        <Route path="/contact-us" element={<Contactus/>} /> 
        <Route path="/page-replica.txt" element={<PageReplica />} /> 
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
