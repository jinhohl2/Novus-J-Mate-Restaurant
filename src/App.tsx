import React from 'react';
import '../src/Front-End/scss/App.scss';

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";

import NavBar from "./Front-End/pages/00_NavBar";
import LogInView from "./Front-End/pages/01_logInView";
import SignUpView from "./Front-End/pages/02_signUpView";
import UserProfile from "./Front-End/pages/03_user_profile";




function App() {
  return (
      <React.Fragment>
          <Router>
              <NavBar/>

              <Routes>
                  <Route path={"/log-in"} element={<LogInView></LogInView>}></Route>
                  <Route path={"/sign-up"} element={<SignUpView></SignUpView>}></Route>
                  <Route path={"/user-profile"} element={<UserProfile></UserProfile>}></Route>

              </Routes>
          </Router>
      </React.Fragment>



  );
}

export default App;
