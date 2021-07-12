import React, { Fragment, useState, useEffect } from "react";

import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { toast } from "react-toastify";
import { base_address } from "./ipAddress";

//components

import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Viatura from "./components/Viatura";
import ViaturaAdd from "./components/ViaturaAdd";
import AtribuirCondutor from "./components/AtribuirCondutor";
import Perfil from "./components/Perfil";
import Carta from "./components/Carta";

toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch(base_address + ":8000/sinit/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token },
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const [goBack, setGoBack] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated(boolean);
  };

  const setBack = (boolean) => {
    setGoBack(boolean);
  };

  return (
    <Fragment>
      <Router>
        <div className="container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route
              exact
              path="/login"
              render={(props) =>
                !isAuthenticated ? (
                  <Login {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/register"
              render={(props) =>
                !isAuthenticated ? (
                  <Register {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/dashboard"
              render={(props) =>
                isAuthenticated ? (
                  <Dashboard {...props} setAuth={setAuth} />
                ) : (
                  <Redirect to="/login" />
                )
              }
            />
            <Route exact path="/viatura">
              <Viatura />
            </Route>
            <Route exact path="/perfil">
              <Perfil />
            </Route>
            <Route
              exact
              path="/viatura/nif"
              render={(props) =>
                !goBack ? (
                  <ViaturaAdd {...props} setGoBack={setBack} />
                ) : (
                  <Redirect to="/viatura" />
                )
              }
            />
            <Route
              exact
              path="/cidadao/carta"
              render={(props) =>
                !goBack ? (
                  <Carta {...props} setGoBack={setBack} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
            <Route
              exact
              path="/evento/condutor"
              render={(props) =>
                !goBack ? (
                  <AtribuirCondutor {...props} setGoBack={setBack} />
                ) : (
                  <Redirect to="/dashboard" />
                )
              }
            />
          </Switch>
        </div>
      </Router>
    </Fragment>
  );
}

export default App;
