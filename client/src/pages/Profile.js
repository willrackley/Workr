import React, { Component } from "react";
import { Input, FormBtn } from "../components/Form";
import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import API from "../utils/API";
import 'react-notifications/lib/notifications.css';
import NavItemLogout from '../components/NavItemLogout';
import {NotificationContainer, NotificationManager} from 'react-notifications';


class Profile extends Component {
    state = {
        user: {},
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            console.log(this.state.user)
        })
    }

    render(){
        return(
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
            <div>{this.state.user.firstname}</div>
        
        </div>    )
    }

}

export default Profile;