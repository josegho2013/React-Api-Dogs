import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Select from "react-select";
import { createDogs } from "../Redux/actions/actions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { FaDog } from "react-icons/fa";
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
  const [created, setCreated] = useState(false);
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
    if (!error.name) {
      e.preventDefault();
      dispatch(createDogs(newDog));
      setInput({
        name: "",
        image: "",
        temperaments: [],
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_SpanMin: "",
        life_SpanMax: "",
      });

      setCreated(true);
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
      <Navbar />
      <div className="input">
        <h2>Create your new Dog</h2>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="form_1">
            <div className="general">
              <input
                className="sub-input name"
                type="text"
                name="name"
                placeholder="Insert Name"
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
              <input
                required
                className="sub-input"
                type="number"
                name="heightMin"
                placeholder="Height Min"
                min="1"
                max="30"
                value={input.heightMin}
                onChange={(e) => handleChange(e)}
              />

              <input
                required
                className="sub-input"
                type="number"
                name="heightMax"
                placeholder="Height Max"
                min="5"
                max="40"
                value={input.heightMax}
                onChange={(e) => handleChange(e)}
              />
              <label>Cm </label>
            </div>

            <div className="general">
              <input
                required
                className="sub-input"
                type="number"
                name="weightMin"
                placeholder="Weight Min"
                min="1"
                max="150"
                value={input.weightMin}
                onChange={(e) => handleChange(e)}
              />
              <input
                required
                className="sub-input"
                type="number"
                name="weightMax"
                placeholder="Weight Max"
                min="1"
                max="150"
                value={input.weightMax}
                onChange={(e) => handleChange(e)}
              />
              <label>Kg </label>
            </div>
            <div className="general">
              <input
                required
                placeholder="Life Span Min"
                className="sub-input"
                type="number"
                name="life_spanMin"
                min="1"
                max="30"
                value={input.life_spanMin}
                onChange={(e) => handleChange(e)}
              />

              <input
                required
                placeholder="Life Span Max"
                className="sub-input"
                type="number"
                name="life_spanMax"
                min="1"
                max="30"
                value={input.life_spanMax}
                onChange={(e) => handleChange(e)}
              />
              <label>Years</label>
            </div>
            <div className="general name">
              <Select
                placeholder="Select Temperaments.."
                required
                className="temper"
                onChange={(e) => handleSelect(e)}
                defaultValue={"All"}
                isMulti
                options={prueba}
                closeMenuOnSelect={false}
              />
            </div>
          </div>

          <div className="form_2">
            <div className="image">
              <input
                required
                className="sub-input"
                type="url"
                name="image"
                placeholder="Insert Image URL"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <button type="submit">Create</button>
          </div>
        </form>
      </div>
      {created ? (
        <div className="popUp" transition={{ duration: 0.2 }}>
          <h1>
            <FaDog size="5rem" />
            GOOD <br />
            JOB
          </h1>

          <p>Your dog was created successfully!</p>
          <Link to="/Home">
            <button>Go Home</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};
export default Create;


  /* <select>
  {temperament.map((t) => {
    <option default>All</option>;
    return (
      <option key={t.id} value={t.name}>
        {t.name}
      </option>
    );
  })}
  </select> */
