import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getAllDogs } from "../Redux/actions/actions";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Card from "./Card";

import "./Styles/Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const requestDogs = useSelector(({ requestDogs }) => requestDogs);
  // sconst setPage = useSelector(({ setPage }) => setPage);

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDogs = currentPage * dogsPerPage;
  const indexOfFirsDogs = indexOfLastDogs - dogsPerPage;
  const dogspage = requestDogs?.slice(indexOfFirsDogs, indexOfLastDogs);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(getAllDogs());
  }, [dispatch]);

  return (
    <div>
      <div className="line_dog" />
      <Filters />
      <hr className="line"></hr>
      <div className="dogs">
        {dogspage ? (
          dogspage.map((po) => {
            if (typeof po.image === "string" && po.image.length > 0) {
              po.image = JSON.parse(po.image);
            }
            return (
              <Card
                key={po.id}
                id={po.id}
                image={po.image.url}
                name={po.name}
                temperaments={po.temperaments}
                weight={po.weight}
                life_span={po.life_span}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <Pagination
        dogsPerPage={dogsPerPage}
        totalDogs={requestDogs?.length}
        paginate={paginate}
        currentPage={currentPage}
        key={"#"}
      />
    </div>
  );
};

export default Home;
