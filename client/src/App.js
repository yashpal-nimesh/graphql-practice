import React from 'react';
import HomePage from './Components/HomePage';
import MainPage from './Components/MainPage';


import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import AuthApi from './AuthApi';


function App() {


  const [auth, setAuth] = React.useState();

  let data = [];

  if (localStorage.getItem("user")) {
    data = JSON.parse(localStorage.getItem("user"));
  }


  return (
    <>

      <AuthApi.Provider value={{ auth, setAuth }}>
        <Router>

          <Switch>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>


            <ProtectedMain path="/main" auth={data} Component={MainPage} />

            <Route path="/home">
              <HomePage />
            </Route>

            <Route path="/*">
              <Redirect to="/main" />
            </Route>



          </Switch>
        </Router>

      </AuthApi.Provider>

    </>
  );
}


const ProtectedMain = ({ auth, Component, ...rest }) => {


  return (
    <Route
      {...rest}
      render={() => auth.length ? (
        <Component />
      )
        :
        (
          <Redirect to="/home" />
        )
      }
    />
  )
}

export default App;
