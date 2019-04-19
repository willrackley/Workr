import React, { Component } from "react";
import Nav from "../components/Nav";
import Jumbotron from "../components/Jumbotron"

class LandingPage extends Component {

    render() {
        return (//
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
                    <Jumbotron>
                      
                    </Jumbotron>
                </div>
           </div>
        )
    }

}

export default LandingPage;
