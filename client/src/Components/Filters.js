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
  filterByHeightLow,
  filterByHeightHigh,
} from "../Redux/actions/actions";

const Filters = () => {
  const dispatch = useDispatch();
  const temperament = useSelector(({ temperament }) => temperament);
  const dogsAll = useSelector(({ dogsAll }) => dogsAll);

  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  const handlefilter = (e) => {
    dispatch(filterTemperament(e.target.value));
  };

  const handleOrder = (e) => {
    if (e.target.value === "Ascendente") {
      dispatch(filterOrderAsc(e.target.value));
    } else {
      dispatch(filterOrderDes(e.target.value));
    }
  };

  const handleWeight = (e) => {
    if (e.target.value === "menor") {
      dispatch(filterByWeighLighter(e.target.value));
    } else {
      dispatch(filterByWeightHighest(e.target.value));
    }
  };
  const handleHeight = (e) => {
    if (e.target.value === "menor") {
      dispatch(filterByHeightLow());
    } else {
      dispatch(filterByHeightHigh());
    }
  };
  const handleDog = (e) => {
    if (e.target.value === "Originales") {
      dispatch(getDogsApi());
    } else if (e.target.value === "Creados") {
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
          <option>Originales</option>
          <option>Creados</option>
        </select>
      </div>

      <div>
        <p>Order</p>

        <select onChange={(e) => handleOrder(e)}>
          <option default>All</option>
          <option>Ascendente</option>
          <option>Descendente</option>
        </select>
      </div>

      {/* <div>Filter By Heigh </div>
      <select onChange={(e) => handleHeigh(e)}>
        <option default>All</option>
        <option >Lower</option>
        <option>High</option>
      </select> */}

      <div>
        <p>Weight</p>

        <select onChange={(e) => handleWeight(e)}>
          <option default>All</option>
          <option>menor</option>
          <option>mayor</option>
        </select>
      </div>
      <div>
        <div>
          <p>Height</p>
          <select onChange={(e) => handleHeight(e)}>
            <option default>All</option>
            <option>menor</option>
            <option>mayor</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Filters;
