import React, { Component } from "react";
import Nav from "../components/Nav";
import NavItemLogout from '../components/NavItemLogout';
import InboxMessageCard from "../components/InboxMessageCard";
import SentMessageCard from "../components/SentMessageCard";
import API from "../utils/API";
import List from "../components/List";
import ReplyModal from "../components/ReplyModal";
import {FormBtn} from "../components/Form";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
let sendingOffer = false;
class MyMessages extends Component {
    state = {
        user: {},
        messageResults: "",
        mailbox: "inbox",
        replyMessageBody: "",
        messageData: "",
        jobOwner: "",
        
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

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    getMessageData = (data) => {
        sendingOffer = false
        this.setState({messageData: data}) 
        API.getJobs()
        .then(res => {
            
            for(let i=0; i < res.data.length; i++){
                if(res.data[i].posterId === this.state.messageData.senderId){
                   this.setState({ jobOwner: this.state.messageData.senderId });
                   
                } else if(res.data[i].posterId === this.state.messageData.recieverId){
                    this.setState({ jobOwner: this.state.messageData.recieverId });
                    this.setState({sendJobOffer: true})
                }
            }
        })
        .catch(err => console.log(err));
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

    sendReply = (senderId, title, senderName, message) => {
        console.log(sendingOffer)
        if(!sendingOffer){
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
                this.createNotification('success')
                this.setState({ replyMessageBody: ""});
            })
            .catch(err => this.createNotification('error'));
        } else {
            let newOffer = {
                senderId: this.state.user.id,
                senderName: this.state.user.firstname,
                recieverId: senderId,
                recieverName: senderName,
                jobTitle: title,
                inResponseMessage: "",
                jobOwner: this.state.jobOwner,
                messageBody: `${this.state.user.firstname} has offered you the Job!\nJob: ${title}\ndo you accept?`
            }
            console.log(newOffer)
            API.saveOfferMessage(newOffer)
            .then(response => {
                this.createNotification('success')
                console.log(response.data)
            })
            .catch(err => this.createNotification('error'));
         }
        
    }


    sendJobOffer = () => {
        sendingOffer = true;
        this.sendReply(this.state.messageData.senderId, this.state.messageData.jobTitle, this.state.messageData.senderName,
            )
    }

    deleteMessage = (id) => {
        
        API.deleteMyMessage(id)
        .then(res => {
            console.log('deletd')
            this.loadMyMessages(this.state.user.id);
        })
        .catch(err => console.log(err));
    }

    createNotification = (type) => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
              NotificationManager.success('', 'Message Sent');
            break;
          case 'warning':
            NotificationManager.warning('Warning message', 'Close after 3000ms', 3000);
            break;
          case 'error':
            NotificationManager.error('', 'something went wrong, please try again');
            break;
          default: 
          return;
        }
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
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>
                <div className="container mt-5">
                    <div className="row">
                        <div className="col-md-2">
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
                    
                    <div className="col-md-10">
                        <NotificationContainer/>
                        <div>
                            {this.state.mailbox === "inbox" ? 
                            (<div><h3 className="mb-3">Inbox</h3>
                           
                                {this.state.messageResults.length ? ( <div><List>
                                <InboxMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date} getMessageData={this.getMessageData} deleteMessage={this.deleteMessage} getdataforJobOffer={this.getdataforJobOffer}/></List>
                                <ReplyModal
                                mappedModal={this.state.messageResults}
                                value={this.state.replyMessageBody}
                                onChange={this.handleInputChange}
                                name="replyMessageBody"
                                type="text"
                                toName={this.state.messageData.senderName}
                                > 
                                <FormBtn onClick={()=>this.sendReply(this.state.messageData.senderId, this.state.messageData.jobTitle, this.state.messageData.senderName,
                                this.state.messageData.messageBody)} data-dismiss="modal" aria-label="Close">SEND
                                </FormBtn>
                                {this.state.messageData.recieverId === this.state.messageData.jobOwner ? (<FormBtn onClick={()=>this.sendJobOffer()} data-dismiss="modal" aria-label="Close">Send Job Offer</FormBtn>):("")}
                                </ReplyModal></div>
                                ):(<h3 className="mt-5 text-center text-secondary">Mailbox empty</h3>)} 

                            </div>) : 
                            (<div><h3 className="mb-3">Sent</h3>
                            
                                {this.state.messageResults.length ? (<List><SentMessageCard key={this.state.messageResults._id} results={this.state.messageResults} senderName={this.state.messageResults.senderName} messageBody={this.state.messageResults.messageBody} jobTitle={this.state.messageResults.jobTitle} date={this.state.messageResults.date} deleteMessage={this.deleteMessage}/>
                                </List>) : (<h3 className="mt-5 text-center text-secondary">Mailbox empty</h3>)} 
                            </div>)
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