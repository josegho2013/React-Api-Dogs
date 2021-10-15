const axios = require("axios");
const { Temperaments } = require("../db");
const { API_KEY } = process.env;

async function getTemperament(req, res, next) {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?key=${API_KEY}`
    );

    apiUrl.data.forEach((item) => {
      if (item.temperament) {
        item.temperament.split(", ").forEach((name) => {
          if (name) {
            Temperaments.findOrCreate({ where: { name: name } });
          }
        });
      }
    });

    let response = await Temperaments.findAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTemperament,
};
