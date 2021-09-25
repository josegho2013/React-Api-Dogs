const { Router } = require("express");
const router = Router();
const {
    getDogs,
    searchByName,
    getDogById,
    createDogs,
} = require("../controllers/Dogs");

router.get("/", getDogs);
router.get("/search", searchByName);
router.get("/gameDetail/:id", getDogById);
router.post("/create", createDogs);

module.exports = router;
