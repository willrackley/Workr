import React, { Component } from "react";
import { Input, FormBtn, TextArea, CategoryDropdown } from "../components/Form";
import NavItemLogout from '../components/NavItemLogout';
import Nav from "../components/Nav";
import API from "../utils/API";


class PostingJob extends Component {

    state = {
        user: {},
        title: "",
        description: "",
        city: "",
        category: "",

    }

    componentDidMount() {
        const jwt = this.getToken();
        if(!jwt) {
           this.props.history.push('/login');
        }
        API.getUser({ headers: {Authorization: `JWT ${jwt}` } })
        .then(res => {
            this.setState({user: res.data})
            console.log(this.state.user)
        })
        .catch( err => {
            localStorage.removeItem('jwt')
            this.props.history.push('/login');
        })

    }

    getToken(){
        return localStorage.getItem('jwt')
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
        console.log('clicked')
        const newJob = {
            posterId: this.state.user.id,
            title: this.state.title,
            description: this.state.description,
            city: this.state.city,
            category: this.state.category
        }
        API.saveJob(newJob)
        .then(res => {
            console.log(res.data);
        })
        .catch(err => console.log(err)); 
    };


    render() {
        return (
            <div>
                <Nav>
                    <NavItemLogout />
                    <a className="nav-link" href="/dashboard" >
                        Dashboard
                    </a>
                </Nav>
                <div className="container text-center">
                    <h1 className="text-dark text- center mt-5 mb-5">Post a New Job</h1>
                    
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name="title"
                            placeholder="title"
                            />

                            <TextArea
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                name="description"
                                placeholder="description"
                            />

                            <Input
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                name="city"
                                placeholder="city"
                            />

                            <CategoryDropdown
                                value={this.state.category}
                                onChange={this.handleInputChange}
                                name="category"
                                placeholder="category"
                            />

                            <FormBtn
                            disabled={
                                !(this.state.title) ||
                                !(this.state.description) ||
                                !(this.state.city) ||
                                !(this.state.category) 
                            }
                            onClick= {this.handleFormSubmit}
                            >
                            Submit
                            </FormBtn>
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    
            </div>
           </div>
        )
    }

}

export default PostingJob;