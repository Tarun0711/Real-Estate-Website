const express = require("express");
const router = express.Router();
const stateController = require("../controllers/StateController");
const upload = require("../config/Upload");
router.post("/states", upload.fields([{ name: "image", maxCount: 10 }]), stateController.createState);
router.get("/states", stateController.getAllStates);
router.get("/states/:id", stateController.getStateById);
router.put("/states/:id", stateController.updateState);
router.delete("/states/:id", stateController.deleteState);
router.post("/states/:id/cities", stateController.addCityToState);
router.delete(
  "/states/:stateId/cities/:cityId",
  stateController.removeCityFromState
);

module.exports = router;
