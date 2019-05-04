import React, { Component } from "react";
import Nav from "../components/Nav";
import MyJobsCard from "../components/MyJobsCard";
import MyWorkedJobsCard from "../components/MyWorkedJobsCard";
import List from "../components/List";
import MyJobsModal from "../components/MyJobsModal";
import WorkedJobsModal from "../components/WorkedJobsModal";
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
import Footer from "../components/Footer"

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
        API.completeMyJob(id)
        .then(res => {
            this.loadMyJobs(this.state.user.id);
        })
        .catch(err => console.log(err));
    }

    reopenJob = (id) => {
        API.reopenMyJob(id)
        .then(res => {
            this.loadMyJobs(this.state.user.id);
        })
        .catch(err => console.log(err));
    }
    
    employerJobs = () => {
        this.setState({ jobChoice: "employer" });
    }

    workerJobs = () => {
        this.setState({ jobChoice: "worker" });
        API.getMyWorkedJobs(this.state.user.id)
        .then(res => {
            this.setState({ workedJobs: res.data });
        })
    }

    render() {
        return (
            <div>
                {/* Nav Component */}
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </a>
                        <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                            <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <a className="dropdown-item" href="/profile">Edit Profile</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>

                <div className="container">
                    <div className="row">
                        <div className="col-md-3 mt-5 text-left px-3 myJobsCatCol">
                            <h1>Jobs</h1>
                            <button onClick={()=>this.employerJobs()} className="btn d-block"><h3><small>As an </small><span className="myJobsBtn"> EMPLOYr</span></h3></button>
                            <button onClick={()=>this.workerJobs()} className="btn d-block"><h3><small>As a</small><span className="myJobsBtn"> WORKr</span></h3></button>                          
                            
                        </div>
                        <div className="col-md-9">
                            <div>
                                {this.state.jobChoice === "employer" ? 
                                (<div><h2 className="text-muted mt-5 mb-2">POSTED JOBS</h2>
                                {this.state.myJobs.length ? (<div><List><MyJobsCard key={this.state.myJobs._id} results={this.state.myJobs} title={this.state.myJobs.title} description={this.state.myJobs.description} deleteJob={this.deleteJob} completeJob={this.completeJob} reopenJob={this.reopenJob} /></List>
                                <MyJobsModal
                                mappedModal={this.state.myJobs}
                                loadMyJobs={ () => this.loadMyJobs(this.state.user.id)}
                                >
                                </MyJobsModal></div>) : (<h3 className="mt-5 text-center text-secondary">You don't have any posted Jobs </h3>)} 
                                </div>) : (<div><h2 className="text-muted mt-5 mb-2">WORKED JOBS</h2>
                                {this.state.workedJobs.length ? (<div><List><MyWorkedJobsCard key={this.state.workedJobs._id} results={this.state.workedJobs} title={this.state.workedJobs.title} description={this.state.workedJobs.description}/>
                                    </List><WorkedJobsModal
                                mappedModal={this.state.workedJobs}
                                loadMyJobs={ ()=>this.workerJobs()}
                                >
                                </WorkedJobsModal></div>) : (<h3 className="mt-5 text-center text-secondary">You don't have any worked Jobs </h3>)} 
                                </div>)}
                                
                            </div>
                           
                        </div>
                        
                    </div>
                </div>
                <Footer style={{top: 100}}></Footer>        
           </div>
        )
    }
}

export default MyJobs;