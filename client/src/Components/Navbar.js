import { React, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { searchByName } from "../Redux/actions/actions";
import { getDogsApi, getDogsDb } from "../Redux/actions/actions";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import "./Styles/Navbar.css";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const requestDogs = useSelector(({ requestDogs }) => requestDogs);
  const notFound = useSelector(({ notFound }) => notFound);
  // const [searched, setSearched] = useState(false);
  let searched = false;
  console.log("notFound", notFound);
  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchByName(search));
    if (search) {
      setSearch("");
    }
    if (!notFound) {
      searched = false;
    } else {
      searched = true;
    }
  };

  const reset = () => {
    dispatch(getDogsApi());
    dispatch(getDogsDb());
    searched = false;
  };

  return (
    <div className="navbar">
      <h1>
        {" "}
        <FaDog size="5rem" />
        DOGS <br />
        API
      </h1>
      <div className="links">
        <Link to="/home">
          <button onClick={() => reset()} className="button">
            Home
          </button>
        </Link>
        <Link to="/Create">
          <button>Create Dog</button>
        </Link>
      </div>

      <form onSubmit={(e) => handleSearch(e)}>
        <input
          type="search"
          placeholder="Search dogs..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {searched ? (
        <div className="popUp" transition={{ duration: 0.2 }}>
          <h1>
            <FaDog size="5rem" />
            GOOD <br />
            JOB
          </h1>

          <p>no se encontro lo que buscaba!</p>
          <Link to="/home">
            <button onClick={() => reset()}>Go Home</button>
          </Link>
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};

export default NavBar;
