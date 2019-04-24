import React, { Component } from "react";
import Nav from "../components/Nav";
import MyJobsCard from "../components/MyJobsCard";
import CategoryCard from "../components/Categories"
import List from "../components/List";
//import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import CategoriesContainer from '../components/Categories';
import API from "../utils/API";



class JobsByCategory extends Component {
    state = {
        jobsByCategory: "",
        user: {},
        category: ""
    }

    componentDidMount() {
        let cat = "Landscaping";
        this.loadJobsByCategory(cat);
        const token = localStorage.getItem('jwt');
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            // this.setState({category: res.data})
            this.setState({category: "Landscaping"})
            //this.loadJobsByCategory(this.state.jobs.category);
            
            console.log(this.state.category);
        })
    }

    loadJobsByCategory = (category) => {
        API.getJobsByCategory(category)
        .then(res => {
            this.setState({ jobsByCategory: category })
            console.log(res.data)
        })
        .catch(err => console.log(err));
    }

    render() {
        return (
            <div>
                
                <Nav>
                    <a className="nav-link" href="/dashboard" >
                        Dashboard
                    </a>
                    <NavItemLogout/>
                </Nav>

                <div className="container">
                    <div className="row">
                         
                        <div className="col-md-6">
                            
                        <div>
                            <h1 className="text-dark mt-5">Jobs by Category </h1>
                            <List>
                            {this.state.jobsByCategory.length ? (<CategoryCard key={this.state.jobsByCategory._id} results={this.state.jobsByCategory} title={this.state.jobsByCategory.title} description={this.state.jobsByCategory.description} deleteJob={this.deleteJob}/>
                                ) : (<h3 className="mt-5 text-center text-secondary">Job by category - No jobs</h3>)} 
                            </List>
                        </div>
                        
                        </div>
                        <div className="col-md-4 text-right">
                            <div>
                                <h4 className="mt-5"> Welcome, {this.state.user.firstname}</h4>
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

export default JobsByCategory;