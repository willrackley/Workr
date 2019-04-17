import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import userDashboard from './pages/UserDashboard';
import PostingJob from './pages/PostingJob';
import Authorize from './components/Authorize'
function App() {
 
  return (
    <Router>
        <Switch>
          
          <Route exact path="/" component={LandingPage} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/sign-up" component={SignUp} />
          <Authorize>
            <Route exact path="/dashboard" component={userDashboard} />
            <Route exact path="/postJob" component={PostingJob}/>
          </Authorize>
          
        </Switch>
    </Router>
  );
}


export default App;
