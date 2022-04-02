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
      <div className="landing1">
        <div className="images">
          <div className="img1" />
          <div className="img2" />
          <div className="img3" />
          <div className="img4" />
        </div>
        <p>REACT API DOGS</p>
        <Link to="/home">
          <button>Welcome</button>
        </Link>
      </div>
      <div className="landing2"></div>
    </div>
  );
};

export default Landing;
