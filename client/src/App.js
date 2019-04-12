import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Nav from "./components/Nav";
import LandingPage from "./pages/LandingPage";

function App() {
 
  return (
    <Router>
        <Nav />
        <Switch>
          <Route exact path="/" component={LandingPage} />
        </Switch>
    </Router>
  );
}


export default App;
