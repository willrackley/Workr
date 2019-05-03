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

                    {/* info section */}
                    <div className="container aboutContainer">
                        <div className="text-center my-5 text-muted"><h2 className="mt-5 display-4 aboutTitle">Everyone's an <span className="titleHighlight"> EMPLOYr</span> and a <span className="titleHighlight"> WORKr</span></h2></div>
                        <div className="row">
                           <div className="col-md-6 ">
                                <h4 className="mb-3 landingText titleHighlight">EMPLOYr</h4>
                                <p className="aboutText">Tackle any job like a boss by hiring someone to complete the job for you.</p>
                           </div>
                           <div className="col-md-6 landingRow employrPic">
                           </div>
                        <div className="row">
                            <div className="col-md-6 landingRow moneyPic">
                           </div>
                            <div className="col-md-6 text-right">
                                <div>
                                    <h4 className="mb-3 landingText titleHighlight">WORKr</h4>
                                    <p className="aboutText">If you have some spare time you can earn some quick cash by being a WORKr. Search the WORKr site for any job near you to start earning.</p>
                                </div>
                                
                           </div>
                        </div>
                        </div>
                    </div>
               <Footer/>
           </div>
        )
    }

}

export default LandingPage;
