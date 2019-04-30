import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import API from "../utils/API";


class Login extends Component {

    state = {
        email: "",
        password: "",
        loggedIn: false
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password
        }

        
        API.authenticateUser(user)
        .then(res => {
            if(res.data) {
            localStorage.setItem('jwt', res.data.token)
            this.props.history.push('/dashboard')
            } else {
                //show an error
            }
            
        })
        .catch(err => console.log(err)); 
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
                    <h1 className="text-dark text- center mt-5 mb-5">Log in</h1>
                    {this.state.loggedIn ? (<Redirect to='/dashboard' />) : (
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            
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
                                type="password"
                                placeholder="password"
                            />

                            <FormBtn 
                            disabled={
                                !(this.state.email) ||
                                !(this.state.password)
                            }
                            onClick={this.handleFormSubmit}
                            >
                            Submit
                            </FormBtn>
                            
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>)}
            </div>
           
           </div>
        )
    }

}

export default Login;
