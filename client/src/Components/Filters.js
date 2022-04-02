import { React, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Styles/Filters.css";
import {
  getTemperament,
  filterTemperament,
  getDogsApi,
  getDogsDb,
  getAllDogs,
  filterOrderAsc,
  filterOrderDes,
  filterByWeighLighter,
  filterByWeightHighest,
  filterLifeSpanMenor,
  filterLifeSpanMayor,
} from "../Redux/actions/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const temperament = useSelector(({ temperament }) => temperament);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handlefilter = (e) => {
    dispatch(filterTemperament(e.target.value));
  };

  const handleOrder = (e) => {
    if (e.target.value === "Ascendent") {
      dispatch(filterOrderAsc(e.target.value));
    } else if (e.target.value === "Descendent") {
      dispatch(filterOrderDes(e.target.value));
    } else {
      dispatch(getAllDogs());
    }
  };

  const handleWeight = (e) => {
    if (e.target.value === "Lighter") {
      dispatch(filterByWeighLighter(e.target.value));
    } else if (e.target.value === "Heavier") {
      dispatch(filterByWeightHighest(e.target.value));
    } else {
      dispatch(getAllDogs());
    }
  };

  const handleLifeSpan = (e) => {
    if (e.target.value === "Young") {
      dispatch(filterLifeSpanMenor(e.target.value));
    } else if (e.target.value === "Old") {
      dispatch(filterLifeSpanMayor(e.target.value));
    } else {
      dispatch(getAllDogs());
    }
  };
  const handleDog = (e) => {
    if (e.target.value === "Originals") {
      dispatch(getDogsApi());
    } else if (e.target.value === "Customs") {
      dispatch(getDogsDb());
    } else {
      dispatch(getAllDogs());
    }
  };

  return (
    <div className="filters">
      <div>
        <p>Temperament</p>
        <select onChange={(e) => handlefilter(e)}>
          <option default>All</option>
          {temperament?.map((G) => (
            <option key={G.id} value={G.name}>
              {G.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p>Dogs</p>
        <select onChange={(e) => handleDog(e)}>
          <option default>All</option>
          <option>Originals</option>
          <option>Customs</option>
        </select>
      </div>

      <div>
        <p>Order</p>
        <select onChange={(e) => handleOrder(e)}>
          <option default>All</option>
          <option>Ascendent</option>
          <option>Descendent</option>
        </select>
      </div>

      <div>
        <p>Weight</p>
        <select onChange={(e) => handleWeight(e)}>
          <option default>All</option>
          <option>Lighter</option>
          <option>Heavier</option>
        </select>
      </div>
      <div>
        <div>
          <p>Life Span:</p>
          <select onChange={(e) => handleLifeSpan(e)}>
            <option default>All</option>
            <option>Young</option>
            <option>Old</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
