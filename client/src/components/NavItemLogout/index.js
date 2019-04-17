import React, { Component } from "react";
import { withRouter } from 'react-router-dom'


class NavItemLogout extends Component  {
    state = {

    }

    logOut = () => {
        localStorage.removeItem('jwt');
        //this.props.history.push('/landingPage');
    }

    render() {
    return (
        <a className="nav-link" href="/login" onClick={this.logOut}>
            Log out
        </a>
    );
  }
}

export default withRouter(NavItemLogout);