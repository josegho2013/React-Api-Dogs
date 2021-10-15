import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchById, dogDelete } from "../Redux/actions/actions";
import Navbar from "./Navbar";
import { FaDog } from "react-icons/fa";
import Footer from "./Footer";
import { getAllDogs } from "../Redux/actions/actions";

import "./Styles/Detail.css";

const CardDetail = ({ id }) => {
  const dispatch = useDispatch();
  const searchId = useSelector(({ searchById }) => searchById);
  const [deleted, setDeleted] = useState(false);
  
  useEffect(() => {
    dispatch(searchById(id));
  }, [dispatch, id]);

  const handleDelete = (id) => {
    dispatch(dogDelete(id));
    setDeleted(true);
  };
  const reset = () => {
    dispatch(getAllDogs());
  };

  return (
    <div>
      <Navbar />
      <div className="detail">
        {searchId ? (
          <div className="data">
            <div>
              <h3>{searchId?.name}</h3>
              {typeof searchId?.height === "string" ? (
                <p>Height: {searchId?.height} Cm</p>
              ) : (
                <p>Height: {searchId?.height?.metric} Cm</p>
              )}

              {typeof searchId?.weight === "string" ? (
                <p>weight: {searchId?.weight} kg</p>
              ) : (
                <p>weight: {searchId?.weight?.metric} kg </p>
              )}

              <p>Life Span: {searchId?.life_span} Años</p>

              <h3>Temperaments</h3>
              {typeof searchId?.temperaments === "string" ? (
                <div className="temp">
                  <li>{searchId?.temperaments}</li>
                </div>
              ) : (
                <div className="temp">
                  {searchId?.temperaments?.map((a) => {
                    return <li key={a.id}>{a.name}</li>;
                  })}
                </div>
              )}
            </div>
            <img src={searchId?.image?.url} alt={searchId?.id}></img>
          </div>
        ) : (
          <div>Loading...</div>
        )}
        <div className="back">
          {id.includes("-") ? (
            <button onClick={() => handleDelete(id)}>Delete</button>
          ) : (
            <></>
          )}
          <Link to="/home">
            <button onClick={() => reset()} className="button">
              Go Home
            </button>
          </Link>
        </div>
      </div>
      {deleted ? (
        <div className="popUp" transition={{ duration: 0.2 }}>
          <h1>
            <FaDog size="5rem" />
            GOOD <br />
            JOB
          </h1>

          <p>Your dog has been successfully eliminated!</p>
          <Link to="/home">
            <button onClick={() => reset()} className="button">
              Go Home
            </button>
          </Link>
        </div>
      ) : (
        <></>
      )}
      <Footer />
    </div>
  );
};

export default CardDetail;
