const { Router } = require('express');
const router = Router();
const RouterDogs = require("./Dogs");
const RouterTemperament = require("./Temperaments");

router.use("/dogs", RouterDogs);
router.use("/temperaments", RouterTemperament);


module.exports = router;
