import React, { Component } from "react";
import { Input, FormBtn, TextArea, CategoryDropdown, OfferInput, InputState, UploadBtn } from "../components/Form";
import NavItemLogout from '../components/NavItemLogout';
import Nav from "../components/Nav";
//import Popup from "reactjs-popup";
import API from "../utils/API";
import Firebase from "../utils/Firebase-config";
import {NotificationContainer, NotificationManager} from 'react-notifications';
// import { threadId } from "worker_threads";
import $ from 'jquery';
let uploadTextColor = ""

class PostingJob extends Component {

    state = {
        title: "",
        description: "",
        city: "",
        state: "",
        category: "",
        offer: "",
        user: {},
        selectedFile: null,
        imageUrl: "",
        loading: null
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    handleFormSubmit = event => {
       
        const newJob = {
            posterId: this.state.user.id,
            posterName: this.state.user.firstname,
            posterEmail: this.state.user.email,
            jobImage: this.state.imageUrl,
            offer: this.state.offer,
            title: this.state.title,
            description: this.state.description,
            city: this.state.city.toLowerCase(),
            state: this.state.state.toLowerCase(),
            category: this.state.category
        } 

    API.saveJob(newJob)
        .then(res => {
            console.log(res.data);
            this.createNotification('success');
            this.setState({offer: ""});
            this.setState({title: ""});
            this.setState({description: ""});
            this.setState({city: ""});
            this.setState({state: ""});
        })
        .catch(err => console.log(err)); 
    };

    formRedirect = () => {
        this.props.history.push('/dashboard')
    }

    selectImgFile = event => {
        this.setState({selectedFile: event.target.files[0]})
        //console.log(event.target.files[0])
        console.log("A picture has been added");
        this.changeColor();
    }

    uploadImgFile = () => {
        this.setState({ loading: true })
        let storageRef = Firebase.storage.ref(`images/${this.state.selectedFile.name}`);
        let addingImg = storageRef.put(this.state.selectedFile);
        addingImg.on('state_changed',
            function progress(snapshot) {
            },
            function error(err) { 
            },() => {
                storageRef.getDownloadURL()
                .then(res => {
                    this.setState({ loading: false })
                    uploadTextColor = "border border-success"
                    this.setState({ imageUrl: res })
                    console.log(this.state.imageUrl) 
                })
            })
    }
    
    changeColor=()=>{
        $('.upload').css({'background-color':' #28a6af', "border":"3px solid green", "font-size":"22px"});
        console.log("button border should turn red");
    }
        
   

    createNotification = (type) => {
        switch (type) {
          case 'info':
            NotificationManager.info('Info message');
            break;
          case 'success':
              NotificationManager.success('', 'Job Posted');
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
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>
                <div className="container text-center mb-5">
                <NotificationContainer/>
                    <h1 className="text-dark text- center mt-5 mb-5">Post a New Job</h1>
                    
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <h3>Upload an image</h3>
                            <Input 
                            className={`form-control ${uploadTextColor}`}
                            
                            type="file"
                            onChange={this.selectImgFile}
                            accept="image/png, image/jpeg, image/jpg"
                            />

                            <UploadBtn 
                            disabled={!this.state.selectedFile}
                            onClick={this.uploadImgFile}>
                            {this.state.loading ? (<div className="spinner-border text-info" role="status" id='upload'>
                            <span className="sr-only">Loading...</span>
                            </div>): ("upload")}
                            
                            </UploadBtn>

                            <Input
                            value={this.state.title}
                            onChange={this.handleInputChange}
                            name="title"
                            placeholder="title"
                            />

                            <TextArea
                                value={this.state.description}
                                onChange={this.handleInputChange}
                                name="description"
                                placeholder="description"
                            />

                            <Input
                                value={this.state.city}
                                onChange={this.handleInputChange}
                                name="city"
                                placeholder="city"
                            />

                            <InputState
                            value={this.state.state}
                            onChange={this.handleInputChange}
                            name="state"
                            />
                            
                            <OfferInput
                                value={this.state.offer}
                                onChange={this.handleInputChange}
                                name="offer"
                                placeholder="20.00"
                                type="number"
                            />

                            <CategoryDropdown
                                value={this.state.category}
                                onChange={this.handleInputChange}
                                name="category"
                            />

                            <FormBtn
                            disabled={
                                !(this.state.imageUrl) ||
                                !(this.state.title) ||
                                !(this.state.description) ||
                                !(this.state.city) ||
                                !(this.state.state) ||
                                !(this.state.category) 
                            }
                            onClick={this.handleFormSubmit}>
                            Submit
                            </FormBtn>
                            
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    
            </div>
           </div>
        )
    }

}

export default PostingJob;