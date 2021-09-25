const { Router } = require('express');
const router = Router();
const RouterDogs = require("./routes");
const RouterTemperament = require("./routes");

router.use("/dogs", RouterDogs);
router.use("/temperament", RouterTemperament);


module.exports = router;
