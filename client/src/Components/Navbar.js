import { React, useState } from "react";
import { useDispatch } from "react-redux";
import { searchByName } from "../Redux/actions/actions";
import { getAllDogs } from "../Redux/actions/actions";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import "./Styles/Navbar.css";

const NavBar = () => {
  const [search, setSearch] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(searchByName(search));
    // if (search) {
    //   setSearch("");
    // }
  };

  const reset = () => {
    dispatch(getAllDogs());
  };

  return (
    <div className="navbar">
      <h1>
        {" "}
        <Link className="landing_link" to="/">
          <FaDog size="5rem" />
        </Link>
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
    </div>
  );
};

export default NavBar;
