import React, { Component } from "react";
import Nav from "../components/Nav";
import NavItemLogout from '../components/NavItemLogout';
import InboxMessageCard from "../components/InboxMessageCard";
import SentMessageCard from "../components/SentMessageCard";
import API from "../utils/API";
import List from "../components/List";

class MyMessages extends Component {
    state = {
        user: {},
        messageResults: "",
        mailbox: "inbox"
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            this.loadMyMessages(this.state.user.id)
        })
    }

    loadMyMessages = (userId) => {
        this.setState({mailbox: "inbox"});
        API.getMyMessages(userId)
        .then(res => {
            this.setState({ messageResults: res.data })
           
        })
    }

    loadSentMessages = (userId) => {
        this.setState({mailbox: "sent"})
        API.getSentMessages(userId)
        .then(res => {
            this.setState({ messageResults: res.data })
        })
    }

    render() {
        
        return (
            <div>
                <Nav>
                    <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </div>
                        <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                            <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-3">
                            <h4>Messages</h4>

                            <button
                            className="btn d-block"
                            onClick={()=>this.loadMyMessages(this.state.user.id)}
                            >
                            Inbox
                            </button>

                            <button
                            className="btn d-block"
                            onClick={()=>this.loadSentMessages(this.state.user.id)}
                            >
                            Sent
                            </button>
                        </div>
                    
                    <div className="col-md-9">
                        <div>
                            {this.state.mailbox === "inbox" ? 
                            (<List>
                                {this.state.messageResults.length ? (<InboxMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date}/>
                                ) : (<h3 className="mt-5 text-center text-secondary">You haven't posted any Jobs yet</h3>)} 
                            </List>) : 
                            (<List>
                                {this.state.messageResults.length ? (<SentMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date}/>
                                ) : (<h3 className="mt-5 text-center text-secondary">You haven't posted any Jobs yet</h3>)} 
                            </List>)
                            }
                        </div>
                    </div>
                </div>
                </div>
            </div>
        )
    }
}

export default MyMessages;