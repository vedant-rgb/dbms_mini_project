const router = require("express").Router();
const projectController = require("../controller/projectController");

router.get("/", projectController.initialRoute);
router.get("/ByTrainNumber/:Train_No", projectController.byTrainNumber);
router.get('/SrcDest/:source/:destination', projectController.srcDest);
router.get('/ByStationCode/:station', projectController.searchByStation);

module.exports = router;
