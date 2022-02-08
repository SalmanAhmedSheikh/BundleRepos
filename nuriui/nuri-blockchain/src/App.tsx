import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import LatestBlocks from "./Components/latest-blocks/latest-blocks";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Block from "./Components/block/block";
import Navbar from "./Components/navbar/navbar";

const App = () => {
  const [latestBlocks, setLatestBlocks] = useState<any[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/listBlocks")
      .then((res) => {
        setLatestBlocks(res.data);
      })
      .catch((error) => {
        console.log("erorr while retrieving data", error);
      });
  }, []);

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="Content">
          <Switch>
            <Route exact path="/">
              <LatestBlocks />
            </Route>
            <Route exact path={"/block/:blockId"}>
              <Block />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;
