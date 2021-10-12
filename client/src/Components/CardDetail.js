import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { searchById } from "../Redux/actions/actions";
import Navbar from "./Navbar";
import Footer from "./Footer";
import "./Styles/Detail.css";

const CardDetail = ({ id }) => {
  const dispatch = useDispatch();
  const searchId = useSelector(({ searchById }) => searchById);

  useEffect(() => {
    dispatch(searchById(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);
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
                <li>{searchId?.temperaments}</li>
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
          <Link to="/Home">
            <button>Go Home</button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CardDetail;
