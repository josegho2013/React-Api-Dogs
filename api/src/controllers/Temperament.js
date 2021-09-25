const axios = require("axios");
const { Temperament } = require("../db");
const { API_KEY } = process.env;

async function getTemperament(req, res, next) {
  const apiUrl = await axios.get(
    `https://api.thedogapi.com/v1/breeds?page_size=50&key=${API_KEY}`
  );
  try {
    apiUrl.data.results.forEach((item) => {
      Temperament.findOrCreate({ where: { name: item.name } });
    });
    let response = await Temperament.findAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getTemperament,
};
