import React, { Component } from "react";
import { Input, FormBtn, TextArea } from "../components/Form";
//import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import API from "../utils/API";


class EmailPostr extends Component {

    state = {
        name: "",
        email: "",
        message: "",

    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        const email = {
            name: this.state.name,
            email: this.state.email,
            message: this.state.message
        }
        console.log(email)
        API.sendEmail(email)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err)); 
    };

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
                <div className="container text-center">
                    <h1 className="text-dark text- center mt-5 mb-5">Contact The Postr</h1>
                    
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <Input
                                value={this.state.name}
                                onChange={this.handleInputChange}
                                name="name"
                                placeholder="name"
                            />

                            <Input
                                value={this.state.email}
                                onChange={this.handleInputChange}
                                name="email"
                                placeholder="email"
                            />

                            <TextArea
                                value={this.state.message}
                                onChange={this.handleInputChange}
                                name="message"
                                placeholder="enter your message here"
                            />

                            <FormBtn
                            disabled={
                                !(this.state.name) ||
                                !(this.state.email) ||
                                !(this.state.message)
                                
                            }
                            onClick= {this.handleFormSubmit}
                            >
                            Submit
                            </FormBtn>

                            {/* make a link for contacting seller with through email and sms */}
                            <a href="mailto:willrackley65@gmail.com">Send email</a>
                            <a href="sms:+18327210743">Send a SMS</a>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    
            </div>
           </div>
        )
    }

}

export default EmailPostr;