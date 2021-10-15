import React from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getAllDogs } from "../Redux/actions/actions";
import { Link } from "react-router-dom";
import "./Styles/Landing.css";

const Landing = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div className="landing">
      <Link to="/home">
        <button className="button">Welcome</button>
      </Link>
    </div>
  );
};

export default Landing;
