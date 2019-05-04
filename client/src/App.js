import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import userDashboard from './pages/UserDashboard';
import MyJobs from './pages/MyJobs';
import Profile from './pages/Profile';
import PostingJob from './pages/PostingJob';
import MyMessages from './pages/MyMessages';
import Authorize from './components/Authorize'
import "./App.css"
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
            <Route exact path="/myJobs" component={MyJobs}/>
            <Route exact path="/messages" component={MyMessages}/>
            <Route exact path="/profile" component={Profile}/>
          </Authorize>
        </Switch>
    </Router>
  );
}


export default App;
