import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import Nav from "../components/Nav";
import API from "../utils/API";
import Popup from "reactjs-popup";
import Footer from "../components/Footer";
import "./style.css"

class SignUp extends Component {

    state = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
        submitMessage: ""
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        //event.preventDefault();
        const newUser = {
            firstname: this.state.firstname.trim().toLowerCase(),
            email: this.state.email.trim().toLowerCase(),
            password: this.state.password.trim().toLowerCase(),
            password2: this.state.confirmPassword.trim().toLowerCase()
        }
        API.saveUser(newUser)
        .then(res => {
            if(res.data[0].type === "warning"){
                this.setState({submitMessage: res.data[0].msg})
              
            } else {
                this.setState({submitMessage: res.data[0].msg})
                this.setState({firstname: ""});
                this.setState({email: ""});
                this.setState({password: ""});
                this.setState({password2: ""});
            }
        })
        .catch(err => console.log(err)); 
    };

    loginRedirect = () => {
        this.props.history.push('/login')
    }

    render() {
        return (
            <div>
                <Nav page="/">
                    <a className="nav-link" href="/login">
                    Log in
                    </a>
                    <a className="nav-link" href="/sign-up">
                    Sign up
                    </a> 
                </Nav>
                <div className="container text-center">
                    <h1 className="text-dark text- center mt-5 mb-5">Sign Up</h1>
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <Input
                            value={this.state.firstname}
                            onChange={this.handleInputChange}
                            name="firstname"
                            placeholder="firstname"
                            />
                            <Input
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="Email"
                            />
                            <Input
                                value={this.state.password}
                                onChange={this.handleInputChange}
                                name="password"
                                placeholder="password"
                                type="password"
                            />
                            <Input
                                value={this.state.confirmPassword}
                                onChange={this.handleInputChange}
                                name="confirmPassword"
                                placeholder="confirm password"
                                type="password"
                            />

                            {/* this section uses a tooltip to let user know of error messages or lets them redirect to login */}
                            {this.state.submitMessage === "Account successfully created, you may login." ? ( <Popup trigger={<button className=" btn signUPBtn text-white"
                            disabled={
                                !(this.state.firstname) ||
                                !(this.state.email) ||
                                !(this.state.password) ||
                                !(this.state.confirmPassword) 
                            }
                            >
                            Submit
                            </button>} onOpen={this.handleFormSubmit}  position="top center" closeOnDocumentClick modal>
                            <div className="text-center"> 
                            {this.state.submitMessage}
                            
                            <FormBtn id="signupRedirect" onClick={this.loginRedirect}>Login</FormBtn>
                           
                            </div>
                            </Popup>) : (<Popup trigger={<button className=" btn signUPBtn text-white" 
                            disabled={
                                !(this.state.firstname) ||
                                !(this.state.email) ||
                                !(this.state.password) ||
                                !(this.state.confirmPassword) 
                            }
                            >
                            Submit
                            </button>} onOpen={this.handleFormSubmit}  position="top center" closeOnDocumentClick modal>
                            {this.state.submitMessage}
                            </Popup>)
                            }
                            
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
            </div>
            <Footer style={{top: 60}}/>
           </div>
        )
    }

}

export default SignUp;
