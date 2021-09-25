const { Op } = require("sequelize");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

async function getDogs(req, res, next) {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?${API_KEY}`
      ); 
      let apiInfo = await apiUrl.data.map((el) => {
          return {
        id: el.id,
        name: el.name,
        height: el.height,
        weight: el.weight,
        life_span: el.life_span,
        image: el.image.url,
        temperament: el.temperament
      };
    });

    let dataBase = await Dog.findAll({
      attributes: ["id", "name", "height", "weight", "life_span", "image"],
      include: [
        {
          model: Temperament,
          through: {
            attributes: [],
          },
        },
      ],
    });

    let response = apiInfo.concat(dataBase);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function searchByName(req, res, next) {
  const search = req.query.q; // query cuando busdcas un solo dato
  //search in API

  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?page_size=100&key=${API_KEY}&search=${search}`
    );
    let apiInfo = await apiUrl.data.results.map((item) => {
      return {
        id: item.id,
        name: item.name,
        height: item.height,
        weight: item.weight,
        life_span: item.life_span,
        image: item.image.url,
        temperament: item.temperament.map((p) => {
          return p.temperament;
        }),
      };
    });

    //search in DB

    let dataBase = await Dogs.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      attributes: ["id", "name", "height", "weight", "life_span", "image"],
      include: [
        {
          model: Temperament,
          through: {
            attributes: [],
          },
        },
      ],
    });
    let response = apiInfo.concat(dataBase);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getDogById(req, res, next) {
  const id = req.params.id;

  if (id.includes("-")) {
    try {
      const dogId = await Dogs.findByPk(id, {
        include: [
          {
            model: Temperament,
            through: {
              attributes: [],
            },
          },
        ],
      });
      return res.status(200).json(dogId);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}?key=${API_KEY}`
      );

      let dogs = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span,
        image: data.image,

        temperament: item.temperament.map((p) => {
          return p.temperament;
        }),
      };
      return res.status(200).json(dogs);
    } catch (error) {
      next(error);
    }
  }
}

function createDogs(req, res) {
  const { name, weight, height, life_span, image, temperament } = req.body;

  Dogs.findOrCreate({
    where: {
      id: uuidv4(),
      name: name,
      weight: weight,
      height: height,
      life_span: life_span,
      image: image,
    },
  })
    .then((newDogs) => {
      // cuando creas el nuevo juego asignarle una plataforma y genero

      // platforms.forEach((id) => newGame[0].addPlatforms(id));
      // genres.forEach((id) => newGame[0].addGenres(id));
      return res.status(200).json(newDogs);
    })
    .catch((error) => {
      return res.status(404).send(error);
    });
}

module.exports = {
  getDogs,
  searchByName,
  getDogById,
  createDogs,
};
