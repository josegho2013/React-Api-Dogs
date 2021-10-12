const { Router } = require("express");
const router = Router();
const { getTemperament } = require("../controllers/Temperaments");

router.get("/", getTemperament);

module.exports = router;
