import React, { Component } from "react";
import Nav from "../components/Nav";
import MyJobsCard from "../components/MyJobsCard";
import MyWorkedJobsCard from "../components/MyWorkedJobsCard";
import List from "../components/List";
//import { Link } from 'react-router-dom';
import MyJobsModal from "../components/MyJobsModal";
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
import { FormBtn } from "../components/Form";



class MyJobs extends Component {
    state = {
        myJobs: "",
        user: {},
        jobChoice: "employer",
        workedJobs: ""
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
    
    employerJobs = () => {
        this.setState({ jobChoice: "employer" });
        console.log('employer')
    }

    workerJobs = () => {
        this.setState({ jobChoice: "worker" });
        API.getMyWorkedJobs(this.state.user.id)
        .then(res => {
            this.setState({ workedJobs: res.data })
            console.log(res.data)
        })
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
                        <div className="col-md-4 mt-5 text-left">
                            
                            <button onClick={()=>this.employerJobs()} className="btn d-block"><h3>EMPLOYr</h3></button>
                            <button onClick={()=>this.workerJobs()} className="btn d-block"><h3>WORKr</h3></button>                          
                            
                        </div>
                        <div className="col-md-8">
                            <div>
                                {this.state.jobChoice === "employer" ? 
                                (<div><h1 className="text-dark mt-5">Posted Jobs</h1>
                                {this.state.myJobs.length ? (<div><List><MyJobsCard key={this.state.myJobs._id} results={this.state.myJobs} title={this.state.myJobs.title} description={this.state.myJobs.description} deleteJob={this.deleteJob} completeJob={this.completeJob} reopenJob={this.reopenJob} /></List>
                                <MyJobsModal
                                mappedModal={this.state.myJobs}
                                >
                                </MyJobsModal></div>) : (<h3 className="mt-5 text-center text-secondary">You don't have any posted Jobs </h3>)} 
                                </div>) : (<div><h1 className="text-dark mt-5">Worked Jobs</h1>
                                {this.state.workedJobs.length ? (<div><List><MyWorkedJobsCard key={this.state.workedJobs._id} results={this.state.workedJobs} title={this.state.workedJobs.title} description={this.state.workedJobs.description}/>
                                    </List></div>) : (<h3 className="mt-5 text-center text-secondary">You don't have any worked Jobs </h3>)} 
                                </div>)}
                                
                            </div>
                           
                        </div>
                        
                    </div>
                </div>
                        
           </div>
        )
    }
}

export default MyJobs;