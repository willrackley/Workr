import React, { Component } from "react";
import { Input } from "../components/Form";
import Nav from "../components/Nav";
import API from "../utils/API";
import 'react-notifications/lib/notifications.css';
import NavItemLogout from '../components/NavItemLogout';
import Firebase from "../utils/Firebase-config";
import uuid from "uuid";
import Footer from "../components/Footer"
import $ from 'jquery';



class Profile extends Component {
    state = {
        user: {},
        selectedFile: "http://www.racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png",
        selectedRawFile: null,
        imageUrl: "",
        loading: null,
        imageUploaded: false,
        username: ""
    }

    componentDidMount() {
        $("#savedProfileMessage").hide();
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data});
        })
    }

    handleInputChange = event => {
        const { name, value } = event.target;
        this.setState({
            [name]: value
        });
    };

    selectImgFile = event => {
        this.setState({ selectedFile: URL.createObjectURL(event.target.files[0]) });
        this.setState({ selectedRawFile: event.target.files[0]})
        this.setState({ imageUploaded: true });
    }

    hideProfileMessage = () => {
        return $("#savedProfileMessage").fadeOut();
    }

    updateUser = () => {
        
        const newUserInfo = {profileImage: this.state.imageUrl, username: this.state.username};
        if(this.state.username === ""){
            newUserInfo.username = "no name";
        }
        if(this.state.imageUrl === ""){
            newUserInfo.profileImage = "no image";
        }
    
        API.updateUser(this.state.user.id, newUserInfo)
        .then(res => {
            this.setState({ username: "" })
            $("#savedProfileMessage").fadeIn();
            setTimeout(this.hideProfileMessage, 2000);
             
        })
        .catch(err => console.log("error"))
    }

    //storing image in firebase
    uploadImgFile = () => {
        this.setState({ loading: true })
        let storageRef = Firebase.storage.ref(`images/${this.state.selectedRawFile.name}${uuid.v4()}`);
        let addingImg = storageRef.put(this.state.selectedRawFile);
        addingImg.on('state_changed',
            function progress(snapshot) {
            },
            function error(err) { 
            },() => {
                storageRef.getDownloadURL()
                .then(res => {
                    this.setState({ loading: false });
                    this.setState({ imageUrl: res }); 
                })
            })
    }

    render(){
        return(
            <div>
            <Nav page="/dashboard">
                <div className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    {this.state.user.firstname}
                    </a>
                    <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                        <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                        <a className="dropdown-item" href="/MyJobs">My Jobs</a>
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
                    <h2 className="text-muted text-center mb-4">Edit Profile</h2>
                    <div className="imageCropper">
                        {this.state.imageUploaded ? (<img className="profilePic" src={this.state.selectedFile} alt="profile image" />) : (<span>{this.state.user.profileImage === "null" || this.state.user.profileImage === "no image" ? (<img className="profilePic" src={this.state.selectedFile} alt="profile image" />) : (<img className="profilePic" src={this.state.user.profileImage} alt="profile image" />)}</span>)}
 
                    </div>

                    <Input 
                    className={`form-control w-50 profileInput`}
                    type="file"
                    onChange={this.selectImgFile}
                    accept="image/png, image/jpeg, image/jpg"
                    />

                    <button
                    className={`btn profileUploadBtn d-block text-white`}
                    disabled={this.state.selectedFile === "http://www.racemph.com/wp-content/uploads/2016/09/profile-image-placeholder.png"}
                    onClick={this.uploadImgFile}>
                    {this.state.loading ? (<div className="spinner-border text-info" role="status" id='upload'>
                    <span className="sr-only">Loading...</span>
                    </div>): ("upload")}
                    </button>
                    
                    <h4 className="text-center text-muted mt-5">Edit/Change Username</h4>

                    <Input
                     className={`form-control w-50 profileInput`}
                    value={this.state.username}
                    onChange={this.handleInputChange}
                    name="username"
                    placeholder="username"
                    />

                    <button 
                    className="btn profileUploadBtn d-block text-white mt-5"
                    onClick={this.updateUser}
                    >
                    Save Changes
                    </button>
                </div>
                <div className="col-md-3">
                <h4 id="savedProfileMessage" className="text-right text-white">Info saved</h4>
                </div>

            </div>
            <Footer style={{top: 90}}/>
        </div>   
         )
    }

}

export default Profile;