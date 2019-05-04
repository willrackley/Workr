import React, { Component } from "react";
import { Input, FormBtn, UploadBtn  } from "../components/Form";
import { Redirect } from 'react-router-dom';
import Nav from "../components/Nav";
import API from "../utils/API";
import 'react-notifications/lib/notifications.css';
import NavItemLogout from '../components/NavItemLogout';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import Firebase from "../utils/Firebase-config";
import uuid from "uuid";


class Profile extends Component {
    state = {
        user: {},
        selectedFile: "http://www.racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png",
        imageUrl: "",
        loading: null,
        imageUploaded: false
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            console.log(this.state.user)
        })
    }

    selectImgFile = event => {
        this.setState({ selectedFile: URL.createObjectURL(event.target.files[0]) });
        this.setState({ imageUploaded: true });
    }

    uploadImgFile = () => {
        this.setState({ loading: true })
        let storageRef = Firebase.storage.ref(`images/${this.state.selectedFile.name}${uuid.v4()}`);
        let addingImg = storageRef.put(this.state.selectedFile);
        addingImg.on('state_changed',
            function progress(snapshot) {
            },
            function error(err) { 
            },() => {
                storageRef.getDownloadURL()
                .then(res => {
                    this.setState({ loading: false })
                    this.setState({ imageUrl: res })
                    this.setState({ selectedFile: res })
                    console.log(this.state.imageUrl) 
                })
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

            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-6 mt-5">
                    <div class="imageCropper">
                        {this.state.imageUploaded ? (<img className="profilePic" src={this.state.selectedFile} alt="profile image" />) : (<span>{this.state.user.profileImage === "null" ? (<img className="profilePic" src={this.state.selectedFile} alt="profile image" />) : (<img className="profilePic" src={this.state.user.profileImage} alt="profile image" />)}</span>)}
                        
                        
                    </div>
                    <Input 
                    className={`form-control w-50 profileInput`}
                    type="file"
                    onChange={this.selectImgFile}
                    accept="image/png, image/jpeg, image/jpg"
                    />
                    <button
                    className="btn profileUploadBtn d-block text-white"
                    disabled={!this.state.selectedFile}
                    onClick={this.uploadImgFile}>
                    {this.state.loading ? (<div className="spinner-border text-info" role="status" id='upload'>
                    <span className="sr-only">Loading...</span>
                    </div>): ("upload")}
                    </button>
                    
                </div>
                <div className="col-md-3">
                </div>

            </div>
        
        </div>   
         )
    }

}

export default Profile;