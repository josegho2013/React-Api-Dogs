import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Card.css";

const Card = ({ image, name, temperaments, id, weight,life_span }) => {
  return (
    <div className="card">
      <img className="img" src={image} alt="" height="200px" width="200px" />
      <div className="info">
        <h2>{name}</h2>
        <h3>I am</h3>
        <div className="temp">
          {temperaments.map((t) => {
            return <li key={t.name}>{t.name}</li>;
          })}
        </div>
        <h4>años de vida= {life_span}</h4>
        <h5>weight: {weight} kg</h5>
        <Link to={`/CardDetail/${id}`}>
          <button>Ver mas</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
