import React, { Component } from "react";
import Nav from "../components/Nav";

class LandingPage extends Component {

    render() {
        return (
            <div>
                <Nav>
                    <a className="nav-link" href="/login">
                Log in
                </a>
                <a className="nav-link" href="/sign-up">
                Sign up
                </a> 
                </Nav>
                <div className="container">
                    <h1 className="text-dark mt-5">Landing Page</h1>
                </div>
           </div>
        )
    }

}

export default LandingPage;
