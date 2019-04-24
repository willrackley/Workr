import React, { Component } from "react";
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
//import MapContainer  from "../components/MapContainer";
let results = "";
let filteredResults = "";

class userDashboard extends Component {
    state = {
        jobResults: "",
        loggedIn: true,
        user: {},
        category: "All"
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

    loadJobsByCategory = (categoryChange) => {
        this.setState({ category: categoryChange})
    }
    
    contactEmployer = (email) => {
        window.location.href = `mailto:${email}`
    }

    render() {
        //conditionals to handle filtering the job postings by category
        if(this.state.category === "All"){
            results = Array.from(this.state.jobResults)
        } else {
            results = Array.from(this.state.jobResults).filter(jobs => jobs.category === this.state.category);
        }
        // if(this.state.category === "Landscaping"){
        //     results = Array.from(this.state.jobResults).filter(jobs => jobs.category === "Landscaping");
        // }
        // if(this.state.category === "House Work"){
        //     results = Array.from(this.state.jobResults).filter(jobs => jobs.category === "House Work");
        // }  
        
       
        //only show job postings that arent ours
        filteredResults = results.filter(jobs => jobs.posterId !== this.state.user.id);
        

        return (
            <div>
                
                <Nav>
                    <NavItemLogout/>
                </Nav>

                <div className="container">
                    <h4 className="mt-3"> Welcome, {this.state.user.firstname}</h4>
                    <div className="row">
                        {/* category section of page */}
                        <div className="col-md-3">
                            <h4 className="mt-3">Categories</h4>

                            <button
                            className="btn d-block"
                            onClick={()=>this.loadJobsByCategory("All")}>
                            All Jobs
                            </button>
                            
                            <button
                            className="btn d-block mt-1"
                            onClick={()=>this.loadJobsByCategory("Landscaping")}>Landscaping
                            </button>

                            <button
                            className="btn d-block mt-1"
                            onClick={()=>this.loadJobsByCategory("House Work")}
                            >House Work
                            </button>
                           
                        </div>
                        {/* Job posts section of page */}
                        <div className="col-md-7"> 
                            <div>
                                <h1 className="text-dark mt-2">Jobs <small className="text-muted">Nationwide</small></h1>
                                <List>
                                {filteredResults.length ? (<Card key={filteredResults._id} results={filteredResults} title={filteredResults.title} description={filteredResults.description} contactEmployer={this.contactEmployer}/>
                                    ) : (<h3 className="mt-5 text-center text-secondary">Sorry, there are no available jobs in your area.</h3>)} 
                                </List>
                            </div>
                        </div>
                        {/* setting options */}
                        <div className="col-md-2 text-right">
                            <div>
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