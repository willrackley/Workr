import React, { Component } from "react";
import { Input, TextArea, CategoryDropdown, OfferInput, InputState, UploadBtn } from "../components/Form";
import NavItemLogout from '../components/NavItemLogout';
import Nav from "../components/Nav";
import API from "../utils/API";
import Firebase from "../utils/Firebase-config";
import $ from 'jquery';
import uuid from "uuid";
import Footer from "../components/Footer"

let uploadTextColor = ""

class Profile extends Component {

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
            offer: this.state.offer.trim(),
            title: this.state.title.trim(),
            description: this.state.description.trim(),
            city: this.state.city.trim().toLowerCase(),
            state: this.state.state.trim().toLowerCase(),
            category: this.state.category
        } 

    API.saveJob(newJob)
        .then(res => {
            this.props.history.push('/myJobs')
            this.setState({offer: ""});
            this.setState({title: ""});
            this.setState({description: ""});
            this.setState({city: ""});
            this.setState({state: ""});
        })
        .catch(err => console.log(err)); 
    };


    selectImgFile = event => {
        this.setState({selectedFile: event.target.files[0]})
        this.changeColor();
    }

    //storing in firebase
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
                    uploadTextColor = "border border-success"
                    this.setState({ imageUrl: res });
                })
            })
    }
    
    changeColor=()=>{
        $('.upload').css({'background-color':' #28a6af', "border":"3px solid green", "font-size":"22px"});
    }
   
    render() {
           
        return (
            <div>
                <Nav page="/dashboard">
                    <div className="nav-item dropdown">
                        <button className="btn nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        {this.state.user.firstname}
                        </button>
                        <div className="dropdown-menu text-dark" aria-labelledby="navbarDropdown">
                            <a className="nav-link dashboardText pl-4" href="/dashboard">Dashboard</a>
                            <a className="dropdown-item" href="/MyJobs">My Jobs</a>
                            <a className="dropdown-item" href="/messages">My Messages</a>
                            <a className="dropdown-item" href="/profile">Edit Profile</a>
                            <NavItemLogout/>
                        </div>
                    </div>
                </Nav>
                <div className="container text-center mb-5">
                    <h1 className="text-dark text- center mt-5 mb-5">Post a New Job</h1>
                    
                    <div className="row">
                        <div className="col-md-4">
                        </div>
                        <div className="col-md-4">
                            <h3 className="text-muted">Upload an image</h3>
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

                            <button className="btn cardSubmitButton"
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
                            </button>
                            
                        </div>
                        <div className="col-md-4">
                        </div>
                    </div>
                    
            </div>
            <Footer style={{top: 100}}/>
           </div>
        )
    }

}

export default Profile;