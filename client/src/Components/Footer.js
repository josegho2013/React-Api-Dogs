import React from "react";
// import { GiGecko } from "react-icons/gi";
import { FaDog } from "react-icons/fa";
import "./Styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer_container">
      <h1>
        {" "}
        <FaDog size="4rem" />
        DOGS <br />
        API
      </h1>
      <div>
        <h3>Realizado por:</h3>
        <h4>José Hernández</h4>
      </div>
    </div>
  );
};

export default Footer;
