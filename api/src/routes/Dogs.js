const { Router } = require("express");
const router = Router();
const {
    getAllDogs,
    getDogsApi,
    getDogsDb,
    searchByName,
    getDogById,
    createDogs,
} = require("../controllers/Dogs");


router.get("/", getAllDogs);
router.get("/api", getDogsApi);
router.get("/db", getDogsDb);
router.get("/search", searchByName);
router.get("/dogDetail/:id", getDogById);
router.post("/create", createDogs);

module.exports = router;
