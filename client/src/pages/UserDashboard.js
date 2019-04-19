import React, { Component } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
//import MapContainer  from "../components/MapContainer";



class userDashboard extends Component {
    state = {
        jobResults: "",
        loggedIn: true,
        user: {}
    }

    componentDidMount() {
        this.loadJobs();
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
        })
    }

    loadJobs = () => {
        API.getJobs()
        .then(res => {
            this.setState({ jobResults: res.data })
            
        })
        .catch(err => console.log(err));
    }
    
    contactEmployer = (email) => {
        window.location.href = `mailto:${email}`
    }

    render() {
        //only show job postings that arent ours
        const results = Array.from(this.state.jobResults)
        const filteredResults = results.filter(jobs => jobs.posterId !== this.state.user.id);
       
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
                                {filteredResults.length ? (<Card key={filteredResults._id} results={filteredResults} title={filteredResults.title} description={filteredResults.description} contactEmployer={this.contactEmployer}/>
                                    ) : (<h3 className="mt-5 text-center text-secondary">Sorry, there are no available jobs in your area.</h3>)} 
                                </List>
                            </div>
                        </div>
                        <div className="col-md-4 text-right">
                            <div>
                                <h4 className="mt-5"> Welcome, {this.state.user.firstname}</h4>
                                <h3 className="">
                                <Link to={"/postJob"} className="text-dark">
                                    Post a job
                                </Link>
                                </h3>  
                                <h3 className="">
                                <Link to={"/MyJobs"} className="text-dark">
                                    My Jobs
                                </Link>
                                </h3>       
                                {/* <MapContainer/>                     */}

                            </div>
                        </div>
                    </div>
                </div>
                        
           </div>
        )
    }
}

export default userDashboard;