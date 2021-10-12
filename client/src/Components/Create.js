import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { createDogs } from "../Redux/actions/actions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Styles/Create.css";
const { v4: uuidv4 } = require("uuid");

const validate = (input) => {
  let error = {};

  if (!/^[A-Za-z]+$/.test(input.name) && input.name.length > 0) {
    error.name = "El nombre solo puede contener letras";
  }
  return error;
};

const Create = () => {
  const dispatch = useDispatch();
  const temperament = useSelector(({ temperament }) => temperament);
  const [error, setError] = useState({
    name: "",
  
  });

  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_spanMin: "",
    life_spanMax: "",
    image: {
      id: "",
      url: "",
    },
    temperaments: [],
  });

  const prueba = temperament.map((t) => {
    return {
      value: t.name,
      label: t.name,
    };
  });

  function handleChange(e) {
    if (e.target.name === "image") {
      setInput({
        ...input,
        image: {
          id: uuidv4(),
          url: e.target.value,
        },
      });
    } else {
      setInput({
        ...input,
        [e.target.name]: e.target.value,
      });
    }
    setError(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleSubmit(e) {
    const newDog = {
      name: input.name,
      height: input.heightMin + " - " + input.heightMax,
      weight: input.weightMin + " - " + input.weightMax,
      life_span: input.life_spanMin + " - " + input.life_spanMax,
      image: input.image,
      temperaments: input.temperaments,
    };
    if (!error.name ) {
      e.preventDefault();
      dispatch(createDogs(newDog));
      setInput({
        name: "",
        // image: "",
        // temperaments: [],
        // heightMin: "",
        // heightMax: "",
        // weightMin: "",
        // weightMax: "",
        // life_SpanMin: "",
        // life_SpanMax: "",
      });

      alert("Dogs Create");
    } else {
      e.preventDefault();
      alert("Tienes campos vacios");
    }
  }

  function handleSelect(e) {
    setInput({
      ...input,
      temperaments: e.map((i) => {
        return i.value;
      }),
    });
  }

  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div className="input">
        <h2>Create your new Dog</h2>

        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="general">
            <label>Name:</label>
            <input
              className="sub-input"
              type="text"
              name="name"
              placeholder="Insert Dogs Name"
              value={input.name}
              onChange={(e) => handleChange(e)}
              pattern="[a-zA-Z ]{3,15}"
              required
            />
            {!error.name ? null : (
              <span>
                <p className="name_error_add">{error.name}</p>
              </span>
            )}
          </div>
          <div className="general">
            <label>Height: </label>
            <input
              required
              className="sub-input"
              type="number"
              name="heightMin"
              placeholder="desde"
              min="1"
              max="30"
              value={input.heightMin}
              onChange={(e) => handleChange(e)}
            />
            <label> Cm</label>

            <input
              required
              className="sub-input"
              type="number"
              name="heightMax"
              placeholder="hasta"
              min="5"
              max="40"
              value={input.heightMax}
              onChange={(e) => handleChange(e)}
            />
            <label> Cm</label>
          </div>

          <div className="general">
            <label> Weight: </label>
            <input
            required
              className="sub-input"
              type="number"
              name="weightMin"
              placeholder="weight"
              min="1"
              max="150"
              value={input.weightMin}
              onChange={(e) => handleChange(e)}
            />

            <label> Kg </label>
            <input
              required
              className="sub-input"
              type="number"
              name="weightMax"
              placeholder="weight"
              min="1"
              max="150"
              value={input.weightMax}
              onChange={(e) => handleChange(e)}
            />

            <label> Kg </label>
          </div>
          <div className="general">
            <h4>Life_span</h4>

            <input
              required
              className="sub-input"
              type="number"
              name="life_spanMin"
              min="1"
              max="30"
              value={input.life_spanMin}
              onChange={(e) => handleChange(e)}
            />
            <label>Años: </label>

            <input
              required
              className="sub-input"
              type="number"
              name="life_spanMax"
              min="1"
              max="30"
              value={input.life_spanMax}
              onChange={(e) => handleChange(e)}
            />
            <label>Años: </label>
          </div>

          <div className="general">
            <label>Imagen: </label>
            <input
              required
              className="sub-input"
              type="url"
              name="image"
              placeholder="Select image"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <div className="general">
            <h4>Temperament: </h4>
            <Select
              required
              className="temper"
              onChange={(e) => handleSelect(e)}
              defaultValue={"All"}
              isMulti
              options={prueba}
              closeMenuOnSelect={false}
              styles={{
                borderBotton: "1px dotted blue",
                borderRadius: "200px",
              }}
            />
          </div>
          {/* <select>
          {temperament.map((t) => {
            <option default>All</option>;
            return (
              <option key={t.id} value={t.name}>
                {t.name}
              </option>
            );
          })}
        </select> */}

          <button type="submit">Create</button>
          <Link to="/home">
            <button>Delete</button>
          </Link>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};
export default Create;
