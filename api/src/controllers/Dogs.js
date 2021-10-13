const { Op } = require("sequelize");
const axios = require("axios");
const { Dog, Temperaments } = require("../db");
const { API_KEY } = process.env;
const { v4: uuidv4 } = require("uuid");

async function getAllDogs(req, res, next) {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?${API_KEY}`
    );
    let apiInfo = await apiUrl.data.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.metric,
        weight: el.weight.metric,
        life_span: el.life_span,
        image: el.image,
        temperaments: el.temperament
          ? el.temperament.split(", ").map((a) => {
              return { name: a };
            })
          : [],
      };
    });

    let dataBase = await Dog.findAll({
      attributes: ["id", "name", "height", "weight", "life_span", "image"],
      include: [
        {
          attributes: ["name"],
          model: Temperaments,
          through: {
            attributes: [],
          },
        },
      ],
    });

    let response = dataBase.concat(apiInfo);
    // let response = apiInfo.concat(dataBase);
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
}

async function getDogsApi(req, res, next) {
  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds?limit=12${API_KEY}`
    );

    let apiInfo = await apiUrl.data.map((el) => {
      return {
        id: el.id,
        name: el.name,
        height: el.height.metric,
        weight: el.weight.metric,
        life_span: el.life_span,
        image: el.image,
        temperaments: el.temperament
          ? el.temperament.split(", ").map((a) => {
              return { name: a };
            })
          : [],
      };
    });

    return res.status(200).json(apiInfo);
  } catch (error) {
    next(error);
  }
}

async function getDogsDb(req, res, next) {
  try {
    let dataBase = await Dog.findAll({
      attributes: ["id", "name", "height", "weight", "life_span", "image"],
      include: [
        {
          model: Temperaments,
          through: {
            attributes: [],
          },
        },
      ],
    });

    return res.status(200).json(dataBase);
  } catch (error) {
    next(error);
  }
}

async function searchByName(req, res, next) {
  const search = req.query.q; 

  try {
    const apiUrl = await axios.get(
      `https://api.thedogapi.com/v1/breeds/search?q=${search} `
    );
    let apiInfo = await apiUrl.data.map((item) => {
      return item.reference_image_id;
    });

    //search in DB
    let dataBase = await Dog.findAll({
      where: {
        name: { [Op.like]: `%${search}%` },
      },
      attributes: ["id", "name", "height", "weight", "life_span", "image"],
      include: [
        {
          model: Temperaments,
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
      const dogId = await Dog.findByPk(id, {
        include: [
          {
            model: Temperaments,
            through: {
              attributes: [],
            },
          },
        ],
      });

      // dogId.dog.dataValues["dataBase"] = true;
      return res.status(200).json(dogId);
    } catch (error) {
      next(error);
    }
  } else {
    try {
      const { data } = await axios.get(
        `https://api.thedogapi.com/v1/breeds/${id}?key=${API_KEY}`
      );
      const apiUrl = await axios.get(
        `https://api.thedogapi.com/v1/breeds?limit=12${API_KEY}`
      );

      let element = {};
      for (let i = 0; i < (await apiUrl.data.length); i++) {
        if (apiUrl.data[i].image.id === data.reference_image_id) {
          element["id"] = apiUrl.data[i].image.id;
          element["url"] = apiUrl.data[i].image.url;
        }
      }

      let dogs = {
        id: data.id,
        name: data.name,
        height: data.height,
        weight: data.weight,
        life_span: data.life_span,
        image: element,
        temperaments: data.temperament,
        bred_for: data.bred_for,
        breed_group: data.breed_group,
        origin: data.origin,
      };
      return res.status(200).json(dogs);
    } catch (error) {
      next(error);
    }
  }
}

async function createDogs(req, res) {
  let { name, weight, height, life_span, image, temperaments } = req.body;

  try {
    let dogCreated = await Dog.create({
      id: uuidv4(),
      name,
      weight,
      height,
      life_span,
      image,
    });
    if (temperaments.length > 0) {
      temperaments.forEach(async (temp) => {
        try {
          let dbTemperament = await Temperaments.findOne({
            where: { name: temp },
          });
          dogCreated.addTemperaments(dbTemperament);
        } catch (error) {
          next(error);
        }
      });
    }

    return res.status(200).send("Creacion exitosa");
  } catch (error) {
    return res.send(error);
  }
}

async function dogDelete(req, res, next) {
  const id = req.params.id;

  if (id.includes("-")) {
    try {
      const dogId = await Dog.destroy( {
        where: { id },
      });

      return res.sendStatus(200);
    } catch (error) {
      next(error);
    }
  } else {
    return res.status(404).send("Can´t delete this dog!");
  }
}

module.exports = {
  getAllDogs,
  getDogsApi,
  getDogsDb,
  searchByName,
  getDogById,
  createDogs,
  dogDelete,
};
