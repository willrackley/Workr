import React, { Component } from "react";
import Nav from "../components/Nav";
import Jumbotron from "../components/Jumbotron";
import Footer from "../components/Footer";

class LandingPage extends Component {

    signupRedirect = () => {
        this.props.history.push('/sign-up')
    }
    render() {
        return (//
            <div>
                <Nav page="/">
                    <a className="nav-link" href="/login">
                Log in
                </a>
                <a className="nav-link" href="/sign-up">
                Sign up
                </a> 
                </Nav>
                
                    <Jumbotron>
                        <div className="jumbotronInfo text-center">
                            <h1 className="text-white"><span>EARN</span> CASH & <span>FINISH</span> TASKS</h1>
                            <p className="text-white">The easiest way to earn some quick cash or finish that job you've been putting off</p>
                            <button className="btn registerButton text-white" onClick={this.signupRedirect}>REGISTER</button>
                        </div>
                    </Jumbotron>
               <Footer/>
           </div>
        )
    }

}

export default LandingPage;
