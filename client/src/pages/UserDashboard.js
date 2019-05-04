import React, { Component } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'; 
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
import 'react-notifications/lib/notifications.css';
import MessageModal from "../components/MessageModal";
import Footer from "../components/Footer"
import {NotificationContainer, NotificationManager} from 'react-notifications';
import zipcodes from "zipcodes";
import "./style.css"



let results = "";
let filteredResults = "";
;

class userDashboard extends Component {
    state = {
        jobResults: "",
        loggedIn: true,
        user: {},
        category: "All",
        messageBody: undefined,
        jobInfoForMessage: "",
        nearbyCities: "",
        nearbyStates: "",
        lat: "",
        long: "", 
        zip: "",
        loading: true,
        jobLocation: "Nearby"
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data});
            navigator.geolocation.getCurrentPosition(
                position => {
                  const { latitude, longitude } = position.coords;

                this.setState({
                lat: latitude,
                lng: longitude,
                loading: false
                });
                const updatedLatitude = this.state.lat;
                const updatedLongitude = this.state.lng;
        
                this.handleChange(updatedLatitude, updatedLongitude);
        },() => {
                    this.setState({ loading: false });
        
        })
       
    })
    }
    
    handleChange = (updatedLatitude, updatedLongitude) => {
            const API_URL =
            "https://us1.locationiq.com/v1/reverse.php?key=69b410ea8cf9cb&lat=" +
            updatedLatitude +
            "&lon=" +
            updatedLongitude +
            "&format=json";
            axios.get(API_URL).then(
            response => {
                const myZip = response.data.address.postcode;
                this.setState({ zip: myZip });
                this.raduisLookUp();
            });
    }
    
    raduisLookUp = () => {
        const cities = [];
        const rad = zipcodes.radius(this.state.zip, 50);
        
        let loc = {}
        for (var i = 0; i < rad.length; i++) {
            loc = (zipcodes.lookup(rad[i]));
            cities.push({city: loc.city.toLowerCase(), state: loc.state.toLowerCase()})
        }
        this.setState({ nearbyCities: cities });
        this.loadJobs()
    }

    loadJobs = () => {
        this.setState({ loading: true})
        API.getJobs()
        .then(res => {
            
            const nearbyJobs = []
            
            
            for(let j=0; j < res.data.length; j++){
                for(let i=0; i < this.state.nearbyCities.length; i++){
                    if(res.data[j].city === this.state.nearbyCities[i].city && res.data[j].state === this.state.nearbyCities[i].state ){
                        nearbyJobs.push(res.data[j])
                    } 
                }
            }

            API.getAllUsers()
            .then(res => {
                for(let k=0; k < nearbyJobs.length; k++){
                    for(let h=0; h < res.data.length; h++){
                        if(nearbyJobs[k].posterId === res.data[h]._id){
                            nearbyJobs[k].profileImage = res.data[h].profileImage;
                            nearbyJobs[k].username = res.data[h].username;
                        }
                    }
                }
                //filter out repeated entries
                const filteredNearbyJobs = (nearbyJobs) => nearbyJobs.filter((k, l) => nearbyJobs.indexOf(k) === l)
                this.setState({ jobResults: filteredNearbyJobs(nearbyJobs) })
                this.setState({ jobLocation: "Nearby"})
                this.setState({ loading: false})
            })
            
            
        })
        .catch(err => console.log(err));
    }

    loadJobsNationwide = () => {
        this.setState({ loading: true})

        API.getJobs()
        .then(res => {
            // this.setState ({ jobResults: res.data });
            const nationwideJobs = [];
            for(let n=0; n < res.data.length; n++){
                nationwideJobs.push(res.data[n]);
            }
            
            API.getAllUsers()
            .then(res => {
                for(let l=0; l < nationwideJobs.length; l++){
                    
                    for(let m=0; m < res.data.length; m++){
                        if(nationwideJobs[l].posterId === res.data[m]._id){
                            nationwideJobs[l].profileImage = res.data[m].profileImage;
                            nationwideJobs[l].username = res.data[m].username;
                            
                        }
                    }
                }
                
                this.setState({ jobResults: nationwideJobs })
                this.setState({ jobLocation: "Nationwide"});
                this.setState({ loading: false});
            })
        })
        .catch(err => console.log(err));
    }

    loadJobsByCategory = (categoryChange) => {
        this.setState({ category: categoryChange})
    }
    
    nearbyButton = () => {
        this.setState({ loading: true })
        this.loadJobs();
    }

    nationwideButton = () => {
        this.setState({ loading: true })
        this.loadJobsNationwide();
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };
    
    sendMessageToEmployer = (posterId, title, posterName) => {
        let newMessage = {
            senderId: this.state.user.id,
            senderName: this.state.user.firstname,
            recieverId: posterId,
            recieverName: posterName,
            jobOwner: posterId,
            jobTitle: title,
            messageBody: this.state.messageBody
        }
        API.saveMessage(newMessage)
        .then(res => {
            //message displays sent message
            this.createNotification('success')
            this.setState({ messageBody: ""});
        })
        .catch(err => this.createNotification('error'));
    }

 
    //function to display messages
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

    getDataForMessage = (jobInfo) => {
        this.setState({jobInfoForMessage: jobInfo})
    }

    render() {
        //conditional to handle filtering the job postings by category
        if(this.state.category === "All"){
            results = Array.from(this.state.jobResults).filter(jobs => jobs.status !== "completed")
        } else {
            results = Array.from(this.state.jobResults).filter(jobs => jobs.category === this.state.category);
        }

        //only show job postings that arent from the user
        filteredResults = results.filter(jobs => jobs.posterId !== this.state.user.id);

        return (
            <div>
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <button className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </button>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <a className="dropdown-item" href="/profile">Edit Profile</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>

                <div className="container">
                    <h4 className="my-3"> Welcome, {this.state.user.firstname}</h4>
                    <div className="row">
                        {/* category section of page */}
                        <div className="col-md-3 categoryCol">
                            <h4 className="mt-3">Categories</h4>

                            <ButtonGroup vertical> 
                                <Button 
                                    variant="white"
                                    className="btn catBtns d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("All")}>
                                   <i className="fas fa-toolbox"></i> All Jobs
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn catBtns d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("Landscaping")}>
                                    <i className="fas fa-tree"></i> Landscaping
                                </Button>

                                <Button
                                    variant="white"
                                    className="btn catBtns d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("House Work")}
                                    > 
                                    <i className="fas fa-house-damage"></i> House Work
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn catBtns d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("Car Cleaning")}
                                    >
                                    <i className="fas fa-car-alt"></i> Car Cleaning
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn catBtns d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("Miscellaneous")}
                                    >
                                    <i className="fas fa-tools"></i> Miscellaneous
                                </Button>

                            </ButtonGroup>

                        </div>
                        {/* Job posts section of page */}
                        <div className="col-md-9"> 
                            <NotificationContainer/>
                            {this.state.loading ? (<div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>):( <div>
                                <h1 className="text-dark mt-2">Jobs <small className="text-muted">{this.state.jobLocation}</small></h1>
                                <button className="btn formBtn mt-2 mr-2 locationBtn" onClick={ () => this.nearbyButton()}>Nearby</button >
                                <button  className="btn formBtn mt-2 locationBtn" onClick={ () => this.nationwideButton()}>Nationwide</button >
                                <List>
                                {filteredResults.length ? (<Card key={filteredResults._id} results={filteredResults} title={filteredResults.title} description={filteredResults.description} city={filteredResults.city} state={filteredResults.state} contactEmployer={this.contactEmployer} handleInputChange={this.handleInputChange} value={this.state.messageBody} sendMessageToEmployer={this.sendMessageToEmployer} dashboardRedirect={this.dashboardRedirect} getDataForMessage={this.getDataForMessage}/>
                                ) : (<h3 className="mt-5 text-center text-secondary">Sorry, there are no available jobs in your area.</h3>)} 
                                </List>
                                <MessageModal
                                mappedModal={filteredResults}
                                value={this.state.messageBody}
                                onChange={this.handleInputChange}
                                name="messageBody"
                                type="text"
                                > 
                                <button className="btn signUPBtn text-white" onClick={()=>this.sendMessageToEmployer(this.state.jobInfoForMessage.posterId, this.state.jobInfoForMessage.title, this.state.jobInfoForMessage.posterName)} data-dismiss="modal" aria-label="Close">SEND
                                </button>
                                </MessageModal>
                            </div>)}
                        </div>
                    </div>
                </div>
               <Footer style={{top: 160}}/>
                
            </div> 
        )
    }
}

export default userDashboard;