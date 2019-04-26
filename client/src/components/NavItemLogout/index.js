import React, { Component } from "react";
import { withRouter } from 'react-router-dom'
import "./style.css";

class NavItemLogout extends Component  {
    state = {

    }

    logOut = () => {
        localStorage.removeItem('jwt');
        //this.props.history.push('/landingPage');
    }

    render() {
    return (
        <a className="nav-link logoutText pl-4" href="/login" onClick={this.logOut}>
            Log out
        </a>
    );
  }
}

export default withRouter(NavItemLogout);