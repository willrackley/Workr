import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";

function App() {
 
  return (
    <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/sign-up" component={SignUp} />
        </Switch>
    </Router>
  );
}


export default App;
