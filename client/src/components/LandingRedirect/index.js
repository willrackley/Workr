import React, { Component } from "react";
import API from "../../utils/API"
import { withRouter } from 'react-router-dom'


class LandingRedirect extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: undefined
        }
    }
    
    componentDidMount() {
        const jwt = this.getToken();
        if(jwt) {
           this.props.history.push('/dashboard');
        }
       
        // API.getUser({ headers: {Authorization: `JWT ${jwt}` } })
        // .then(res => {
        //     this.setState({user: res.data})
        // })
        // .catch( err => {
        //     localStorage.removeItem('jwt')
        //     this.props.history.push('/login');
        // })

    }

    getToken(){
        return localStorage.getItem('jwt')
    }

    render(){
        // if(this.state.user === undefined){
        //     return(
        //         <div> Loading...</div>
        //     )
        // }
        return (
           
            <div>
                {this.props.children}
            </div>
            
        );
    }
}


export default withRouter(LandingRedirect);