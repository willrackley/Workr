import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
//import API from "../utils/API";

class SignUp extends Component {

    state = {
        firstname: "",
        email: "",
        password: "",
        confirmPassword: "",
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        event.preventDefault();
        console.log(`${this.state.firstname}
        ${this.state.email}
        ${this.state.password}
        ${this.state.confirmPassword}`)
    };

    render() {
        return (
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
                        />
                        <Input
                            value={this.state.confirmPassword}
                            onChange={this.handleInputChange}
                            name="confirmPassword"
                            placeholder="confirm password"
                        />

                        <FormBtn 
                        disabled={
                            !(this.state.firstname) ||
                            !(this.state.email) ||
                            !(this.state.password) ||
                            !(this.state.confirmPassword) 
                        }
                        onClick={this.handleFormSubmit}
                        >
                        Submit
                        </FormBtn>
                    </div>
                    <div className="col-md-4">
                    </div>
                </div>
                
           </div>
        )
    }

}

export default SignUp;
