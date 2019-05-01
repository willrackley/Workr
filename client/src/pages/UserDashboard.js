import React, { Component } from "react";
import axios from "axios";
import Button from 'react-bootstrap/Button'; 
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import { faTree, faCar, faHouseDamage, faTools, faToolbox } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Nav from "../components/Nav";
import Card from "../components/Card";
import List from "../components/List";
//import { Link } from 'react-router-dom';
import NavItemLogout from '../components/NavItemLogout';
import API from "../utils/API";
//import MapContainer  from "../components/MapContainer";
//import cities from "../components/MapContainer";
import 'react-notifications/lib/notifications.css';
import MessageModal from "../components/MessageModal";
import {FormBtn} from "../components/Form";
import {NotificationContainer, NotificationManager} from 'react-notifications';
import zipcodes from "zipcodes";
// import { GoogleApiWrapper, Map, Marker, InfoWindow } from "google-maps-react";
// import React_App_API_KEY_G from "../components/MapContainer/config_keys"
// const API_KEY = React_App_API_KEY_G;


let results = "";
let filteredResults = "";

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
                console.log(this.state.zip);
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
        console.log()
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
            //filter out repeated entries
            const filteredNearbyJobs = (nearbyJobs) => nearbyJobs.filter((k, l) => nearbyJobs.indexOf(k) === l)
            this.setState({ jobResults:filteredNearbyJobs(nearbyJobs) })
            this.setState({ jobLocation: "Nearby"})
            this.setState({ loading: false})
        })
        .catch(err => console.log(err));
    }

    loadJobsNationwide = () => {
        this.setState({ loading: true})
        API.getJobs()
        .then(res => {
            this.setState ({ jobResults: res.data });
            
            this.setState({ jobLocation: "Nationwide"});
            this.setState({ loading: false});
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
         console.log(newMessage);
        API.saveMessage(newMessage)
        .then(res => {
            this.createNotification('success')
            this.setState({ messageBody: ""});
        })
        .catch(err => this.createNotification('error'));
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
            //   NotificationManager.error('Error message', 'Click me!', 5000, () => {
            //     alert('callback');
            //   });
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

        //only show job postings that arent ours
        filteredResults = results.filter(jobs => jobs.posterId !== this.state.user.id);

        return (
            <div>
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <div className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </div>
                        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a className="dropdown-item" href="/postJob">Post a Job</a>
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>

                <div className="container">
                    <h4 className="mt-3"> Welcome, {this.state.user.firstname}</h4>
                    <div className="row">
                        {/* category section of page */}
                        <div className="col-md-3">
                            <h4 className="mt-3">Categories</h4>

                            <ButtonGroup vertical> 
                                <Button 
                                    variant="white"
                                    className="btn d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("All")}>
                                    <FontAwesomeIcon icon={faToolbox} fixedWidth />
                                    All Jobs
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn d-block mt-1 fas fa-tree fa-2x text-left"
                                    onClick={()=>this.loadJobsByCategory("Landscaping")}>
                                    <FontAwesomeIcon icon={faTree} fixedWidth />
                                    Landscaping
                                </Button>

                                <Button
                                    variant="white"
                                    className="btn d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("House Work")}
                                    > 
                                    <FontAwesomeIcon icon={faHouseDamage} fixedWidth /> House Work
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("Car Cleaning")}
                                    >
                                    <FontAwesomeIcon icon={faCar} fixedWidth />
                                    Car Cleaning
                                </Button>
                                <Button
                                    variant="white"
                                    className="btn d-block text-left"
                                    onClick={()=>this.loadJobsByCategory("Miscellaneous")}
                                    >
                                    <FontAwesomeIcon icon={faTools} fixedWidth />
                                    Miscellaneous
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
                                <Button className="btn formBtn mt-2 mr-2 btn-secondary text-white" onClick={ () => this.nearbyButton()}>Nearby</Button >
                                <Button  className="btn formBtn mt-2 btn-secondary text-white" onClick={ () => this.nationwideButton()}>Nationwide</Button >
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
                                <FormBtn onClick={()=>this.sendMessageToEmployer(this.state.jobInfoForMessage.posterId, this.state.jobInfoForMessage.title, this.state.jobInfoForMessage.posterName)} data-dismiss="modal" aria-label="Close">SEND
                                </FormBtn>
                                </MessageModal>
                            </div>)}
                        </div>
                    </div>
                </div>
            </div> 
        )
    }
}

export default userDashboard;