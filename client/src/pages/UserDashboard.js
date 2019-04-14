import React, { Component } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
import { Redirect } from 'react-router-dom';
import API from "../utils/API";

class userDashboard extends Component {
    state = {
        jobResults: "",
        loggedIn: true
    }

    componentDidMount() {
        this.loadJobs();
    }

    loadJobs = () => {
        API.getJobs()
        .then(res => {
            this.setState({ jobResults: res.data })
        })
        .catch(err => console.log(err));
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
                    <List>
                    {this.state.jobResults.length ? (<Card key={this.state.jobResults._id} results={this.state.jobResults} title={this.state.jobResults.title} description={this.state.jobResults.description}/>
                        ) : (<h3 className="mt-5 text-center text-secondary">Sorry, there are no available jobs in your area.</h3>)} 
                    </List>
                </div>)}
           </div>
        )
    }

}

export default userDashboard;