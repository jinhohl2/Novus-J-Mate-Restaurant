import React from 'react';
import logo from './Front-End/assets/logo.svg';
import './Front-End/scss/App.scss';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
} from "react-router-dom";
import LogInView from "./Front-End/pages/logInView";
import SignUpView from "./Front-End/pages/signUpView";

function App() {
  return (
    <Router>
      <div className="App">
        <div id="nav-bar">
          <h1>New Experiences</h1>
          {/* Check if user is logged in, if not show this nav bar. */}
          <div id="links">
            <Link to="/log-in">Log In</Link>
            <Link to="/sign-up">Sign Up</Link>
          </div>
          {/* If logged in, show nav bar with: Dashboard, Analytics, Friends, and Profile (avatar + dropdown choices) */}
        </div>

        <div id="div-routes">
          <Routes>
            <Route path={"/log-in"} element={<LogInView></LogInView>}></Route>
            <Route path={"/sign-up"} element={<SignUpView></SignUpView>}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
