import "./App.css";
import React from "react";
import { Route } from "react-router-dom";
import Home from "./Components/Home";
import Landing from "./Components/Landing";
import Create from "./Components/Create";
import CardDetail from "./Components/CardDetail";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";

function App() {
  return (
    <div>
      <Route exact path="/" component={Landing} />
      <Route path="/Home" component={Navbar} />
      <Route exact path="/Home" component={Home} />
      <Route exact path="/create" component={Create} />
      <Route
        exact
        path="/CardDetail/:id"
        render={({ match }) => <CardDetail id={match.params.id} />}
      />
      <Route path="/Home" component={Footer} />
    </div>
  );
}

export default App;
