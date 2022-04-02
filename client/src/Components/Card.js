import React from "react";
import { Link } from "react-router-dom";
import "./Styles/Card.css";

const Card = ({ image, name, temperaments, id, weight, life_span }) => {
  return (
    <div className="card">
      <img className="img" src={image} alt="" height="200px" width="200px" />
      <div className="info">
        <h2>{name}</h2>
        <div className="temp">
          <h3>My temperament is: </h3>
          {temperaments.map((t) => {
            return <li key={t.name}>{t.name}</li>;
          })}
        </div>
        <h5>Weight: {weight} kg</h5>
        <h5>Life Span: {life_span}</h5>

        <Link to={`/CardDetail/${id}`}>
          <button className="btn_card">Ver mas</button>
        </Link>
      </div>
    </div>
  );
};

export default Card;
