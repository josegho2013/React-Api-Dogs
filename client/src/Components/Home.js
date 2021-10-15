import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FaDog } from "react-icons/fa";
import Filters from "./Filters";
import Pagination from "./Pagination";
import Card from "./Card";

import "./Styles/Home.css";

const Home = () => {
  const requestDogs = useSelector(({ requestDogs }) => requestDogs);

  // paginacion
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  // Paso 1
  const indexOfLastDogs = currentPage * dogsPerPage;
  const indexOfFirsDogs = indexOfLastDogs - dogsPerPage;
  const dogspage = requestDogs?.slice(indexOfFirsDogs, indexOfLastDogs);
  // Actualizaciòn
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="home">
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
                height={po.height}
                life_span={po.life_span}
              />
            );
          })
        ) : (
          <div>Loading...</div>
        )}
        {dogspage.length === 0 ? (
          <div className="noSearch">
            <h1>
              <FaDog size="5rem" />
              UPSSSSSS!
            </h1>
            <p>No se encontro lo que buscabas!</p>
          </div>
        ) : (
          <></>
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
