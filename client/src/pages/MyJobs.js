import React, { Component } from "react";
import Nav from "../components/Nav";
import MyJobsCard from "../components/MyJobsCard";
import List from "../components/List";
//import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";



class MyJobs extends Component {
    state = {
        myJobs: "",
        user: {}
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            this.loadMyJobs(this.state.user.id);
            //console.log(this.state.user)
        })
    }

    loadMyJobs = (id) => {
        API.getMyJobs(id)
        .then(res => {
            this.setState({ myJobs: res.data })
        })
        .catch(err => console.log(err));
    }

    deleteJob = (id) => {
        API.deleteMyJob(id)
        .then(res => {
            this.loadMyJobs(this.state.user.id);
        })
        .catch(err => console.log(err));
    }

    completeJob = (id) => {
        console.log(id)
        API.completeMyJob(id)
        .then(res => {
            this.loadMyJobs(this.state.user.id);
        })
        .catch(err => console.log(err));
    }

    reopenJob = (id) => {
        console.log(id)
        API.reopenMyJob(id)
        .then(res => {
            this.loadMyJobs(this.state.user.id);
        })
        .catch(err => console.log(err));
    }
    

    render() {
        return (
            <div>
                
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </div>
                        <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                            <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>

                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <div>
                                <h1 className="text-dark mt-5">My Posted Jobs</h1>
                                <List>
                                {this.state.myJobs.length ? (<MyJobsCard key={this.state.myJobs._id} results={this.state.myJobs} title={this.state.myJobs.title} description={this.state.myJobs.description} deleteJob={this.deleteJob} completeJob={this.completeJob} reopenJob={this.reopenJob} />
                                    ) : (<h3 className="mt-5 text-center text-secondary">You don't have any posted Jobs </h3>)} 
                                </List>
                            </div>
                        </div>
                        <div className="col-md-4 text-right">
                            <div>
                            
                                <h3 className="">
                            
                                </h3>      
                                                    
                            </div>
                        </div>
                    </div>
                </div>
                        
           </div>
        )
    }
}

export default MyJobs;