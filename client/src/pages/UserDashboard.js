import React, { Component } from "react";
import Nav from "../components/Nav";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";

class userDashboard extends Component {
    state = {
        loggedIn: true
    }
    logOut = () => {
        API.logOut();
    }

    render() {
        return (
            <div>
                
                <Nav>
                    <a className="nav-link" href="/login" onClick={this.logOut}>
                    Log out
                    </a>
                </Nav>
                {!this.state.loggedIn ? (<Redirect to='/' />) : (
                <div className="container">
                    <h1 className="text-dark mt-5">User Dashboard</h1>
            </div>)}
           </div>
        )
    }

}

export default userDashboard;