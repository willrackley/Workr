import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import userDashboard from './pages/UserDashboard';
import PostingJob from './pages/PostingJob';

function App() {
 
  return (
    <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Route exact path="/dashboard" component={userDashboard} />
          <Route exact path="/postJob" component={PostingJob}/>
        </Switch>
    </Router>
  );
}


export default App;
