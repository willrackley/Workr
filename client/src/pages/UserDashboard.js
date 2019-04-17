import React, { Component } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
import { MapContainer } from "../components/MapContainer";

class userDashboard extends Component {
    state = {
        jobResults: "",
        loggedIn: true,
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
    

    
     

    render() {
        return (
            <div>
                
                <Nav>
                    <NavItemLogout/>
                </Nav>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            
                            <div>
                                <h1 className="text-dark mt-5">User Dashboard</h1>
                                <List>
                                {this.state.jobResults.length ? (<Card key={this.state.jobResults._id} results={this.state.jobResults} title={this.state.jobResults.title} description={this.state.jobResults.description}/>
                                    ) : (<h3 className="mt-5 text-center text-secondary">Sorry, there are no available jobs in your area.</h3>)} 
                                </List>
                            </div>
                        </div>
                        <div className="col-md-4 text-right">
                            <div>
                                <h1 className="mt-5">
                                <Link to={"/postJob"} className="text-dark">
                                    Post a job
                                </Link>
                                <MapContainer/>
                                </h1>                          
                            </div>
                        </div>
                    </div>
                </div>
                        
           </div>
        )
    }

}

export default userDashboard;