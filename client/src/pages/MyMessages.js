import React, { Component } from "react";
import Nav from "../components/Nav";
import NavItemLogout from '../components/NavItemLogout';
import InboxMessageCard from "../components/InboxMessageCard";
import SentMessageCard from "../components/SentMessageCard";
import API from "../utils/API";
import List from "../components/List";
import Footer from "../components/Footer";
import ReplyModal from "../components/ReplyModal";
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import $ from 'jquery';
let sendingOffer = false;
let acceptingOffer = true;
let decliningOffer = true;

class MyMessages extends Component {
    state = {
        user: {},
        messageResults: "",
        mailbox: "inbox",
        replyMessageBody: "",
        messageData: "",
        jobOwner: "",
        jobId: ""
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            this.loadMyMessages(this.state.user.id)
            $("#sentMessage").hide()
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    //grab data from messages
    getMessageData = (data) => {
        console.log(data)
        sendingOffer = false;
        acceptingOffer = false;
        decliningOffer = false;
        this.setState({messageData: data})
        this.setState({ jobOwner: data.jobOwner}) 
    }

    getdataforJobOffer = (data) => {
        this.setState({messageData: data})
       
        confirmAlert({
            title: `You are about to send a job offer.`,
            message: 'Are you sure you want to do this?',
            buttons: [
                {
                label: 'Yes',
                onClick: () => this.sendJobOffer(this.state.messageData.senderId, this.state.messageData.jobTitle, this.state.messageData.senderName, this.state.messageData.messageBody)
                },
                {
                label: 'No',
                onClick: () => {}
                }
            ]
            })
    }

    hideSentMessage = () => {
       return $("#sentMessage").fadeOut();
    }

    sendReply = (senderId, title, senderName, message) => {
        console.log(`acceptingOffer: ${acceptingOffer}`)
        console.log(`sendingOffer ${sendingOffer}`)
        console.log(`decliningOffer ${decliningOffer}`)
        if(!sendingOffer && !acceptingOffer && !decliningOffer){
            let newMessage = {
                senderId: this.state.user.id,
                senderName: this.state.user.firstname,
                recieverId: senderId,
                recieverName: senderName,
                jobTitle: title,
                jobOwner: this.state.jobOwner,
                messageBody: this.state.replyMessageBody,
                inResponseMessage: message
            }
             console.log(newMessage);
            API.saveMessage(newMessage)
            .then(res => {
                $("#sentMessage").fadeIn()
                setTimeout(this.hideSentMessage, 2000)
                this.setState({ replyMessageBody: ""});
            })
            .catch(err => this.createNotification('error'));
        } if(sendingOffer && !acceptingOffer  && !decliningOffer)  {
            let newOffer = {
                senderId: this.state.user.id,
                senderName: this.state.user.firstname,
                recieverId: senderId,
                recieverName: senderName,
                jobTitle: title,
                jobOwner: this.state.jobOwner,
                messageBody: `${this.state.user.firstname} has offered you the Job!`
            }
            console.log(newOffer)
            API.saveOfferMessage(newOffer)
            .then(response => {
                $("#sentMessage").fadeIn()
                setTimeout(this.hideSentMessage, 2000)
                console.log(response.data)
            })
            .catch(err => console.log('error'));
        }

        if(!sendingOffer && acceptingOffer  && !decliningOffer){
            let acceptOffer = {
                senderId: this.state.user.id,
                senderName: this.state.user.firstname,
                recieverId: senderId,
                recieverName: senderName,
                jobTitle: title,
                jobOwner: this.state.jobOwner,
                messageBody: `${this.state.user.firstname} has accepted your offer!`
            }
            console.log(acceptOffer)
            API.saveOfferMessage(acceptOffer)
            .then(response => {
                $("#sentMessage").fadeIn()
                setTimeout(this.hideSentMessage, 2000)
                console.log(response.data)
            })
            .catch(err => console.log('error'));
        }
        if(decliningOffer){
            let newDeclinedOffer = {
                senderId: this.state.user.id,
                senderName: this.state.user.firstname,
                recieverId: senderId,
                recieverName: senderName,
                jobTitle: title,
                jobOwner: senderId,
                messageBody: `${this.state.user.firstname} has declined your offer!`
            }
            console.log(newDeclinedOffer)
            API.saveOfferMessage(newDeclinedOffer)
            .then(response => {
                
                console.log(response.data)
            })
            .catch(err => console.log('error'));
        }
        
        
    }

    sendJobOffer = () => {
        acceptingOffer = false;
        sendingOffer = true;
        decliningOffer = false;
        this.sendReply(this.state.messageData.senderId, this.state.messageData.jobTitle, this.state.messageData.senderName)
    }

    acceptJob = (data) => {
        decliningOffer = false;
        console.log(data)
        this.setState({ jobOwner: data.jobOwner}) 
        API.getJobs()
        .then(res => {
            
            for(let i=0; i < res.data.length; i++){
                if(res.data[i].posterId === data.jobOwner && res.data[i].title === data.jobTitle){ 
                   this.setState({ jobId: res.data[i]._id  });
                } 
            }
            
            let acceptingUser = {user: data.recieverId, name: data.recieverName};
            API.acceptJob(this.state.jobId, acceptingUser)
            .then(res => {
                acceptingOffer = true;
                this.sendReply(data.senderId, data.jobTitle, data.senderName)
            })
        })
        .catch(err => console.log(err));
    }

    declineOffer = (data) => {
        this.sendReply(data.senderId, data.jobTitle, data.senderName)
    }

    deleteMessage = (id) => {
        API.deleteMyMessage(id)
        .then(res => {
            console.log('deletd')
            this.loadMyMessages(this.state.user.id);
        })
        .catch(err => console.log(err));
    }



    render() {   
        return (
            <div>
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </a>
                        <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                            <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <a className="dropdown-item" href="/profile">Edit Profile</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-2 myMessagesCatCol">
                            <h4>Messages</h4>

                            <button
                            className="btn d-block mailboxBtn"
                            onClick={()=>this.loadMyMessages(this.state.user.id)}
                            >
                            <h4><i className="fas fa-inbox"></i> Inbox</h4>
                            </button>

                            <button
                            className="btn d-block mailboxBtn"
                            onClick={()=>this.loadSentMessages(this.state.user.id)}
                            >
                            <h4> <i className="fas fa-paper-plane"></i> Sent</h4>
                            </button>
                        </div>
                    
                    <div className="col-md-10">
                       
                        <div>
                            {this.state.mailbox === "inbox" ? 
                            (<div><h2 className="mb-3 text-muted">Inbox</h2>
                           <h1 id="sentMessage" className="text-right text-white">Message Sent</h1>
                                {this.state.messageResults.length ? ( <div><List>
                                <InboxMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date} getMessageData={this.getMessageData} deleteMessage={this.deleteMessage} getdataforJobOffer={this.getdataforJobOffer} acceptJob={this.acceptJob} declineOffer={this.declineOffer}/></List>
                                <ReplyModal
                                mappedModal={this.state.messageResults}
                                value={this.state.replyMessageBody}
                                onChange={this.handleInputChange}
                                name="replyMessageBody"
                                type="text"
                                toName={this.state.messageData.senderName}
                                > 
                                <button className="btn signUPBtn text-white" onClick={()=>this.sendReply(this.state.messageData.senderId, this.state.messageData.jobTitle, this.state.messageData.senderName,
                                this.state.messageData.messageBody)} data-dismiss="modal" aria-label="Close">SEND
                                </button>
                                {this.state.messageData.recieverId === this.state.messageData.jobOwner ? (<button className="btn signUPBtn glowBorder text-white" onClick={()=>this.sendJobOffer()} data-dismiss="modal" aria-label="Close">Send Job Offer</button>):("")}
                                </ReplyModal></div>
                                ):(<h3 className="mt-5 text-center text-secondary">Mailbox empty</h3>)} 

                            </div>) : 
                            (<div><h2 className="mb-3 text-muted">Sent</h2>
                            
                                {this.state.messageResults.length ? (<List><SentMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date} deleteMessage={this.deleteMessage}/>
                                </List>) : (<h3 className="mt-5 text-center text-secondary">Mailbox empty</h3>)} 
                            </div>)
                            }
                            
                        </div>
                    </div>
                </div>
                </div>
                <Footer style={{top: 300}}></Footer> 
            </div>
        )
    }
}

export default MyMessages;