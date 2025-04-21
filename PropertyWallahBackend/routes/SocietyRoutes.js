const express = require("express");
const router = express.Router();
const societyController = require("../controllers/SocietyController");
const upload = require("../config/Upload");
// Society Routes

router.get("/societies", societyController.getAllSocieties);
router.get("/societies/:id", societyController.getSocietyById);

router.post(
  "/societies",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
  ]),
  societyController.createSociety
);
router.put(
  "/societies/:id",
  upload.fields([
    { name: "images", maxCount: 10 },
    { name: "brochure", maxCount: 1 },
  ]),
  societyController.updateSociety
);
router.delete("/societies/:id", societyController.deleteSociety);
router.patch("/societies/:id/status", societyController.updateStatus);

// Society Details Routes
router.post("/society-details", societyController.createSocietyDetails);

// Seller Contact Routes
router.post("/seller-contacts", societyController.createSellerContact);
router.get("/seller-contacts/:id", societyController.getSellerContactById);
router.put("/seller-contacts/:id", societyController.updateSellerContact);
router.delete("/seller-contacts/:id", societyController.deleteSellerContact);

module.exports = router;
