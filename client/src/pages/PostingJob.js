import React, { Component } from "react";
import { Input, FormBtn, TextArea, CategoryDropdown, OfferInput } from "../components/Form";
import NavItemLogout from '../components/NavItemLogout';
import Nav from "../components/Nav";
import Popup from "reactjs-popup";
import API from "../utils/API";
import Firebase from "../utils/Firebase-config";
//import storage from "../utils/Firebase-config";
let uploadTextColor = ""

class PostingJob extends Component {

    state = {
        title: "",
        description: "",
        city: "",
        category: "",
        offer: "",
        user: {},
        selectedFile: null,
        imageUrl: "image",
        loading: null
    }

    componentDidMount() {
        const token = localStorage.getItem('jwt')
        API.getUser({ headers: {Authorization: `JWT ${token}` } })
        .then(res => {
            this.setState({user: res.data})
            console.log(this.state.user)
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
            city: this.state.city,
            category: this.state.category
        }
        API.saveJob(newJob)
        .then(res => {
            console.log(res.data);
            this.setState({offer: ""});
            this.setState({title: ""});
            this.setState({description: ""});
            this.setState({city: ""});
        })
        .catch(err => console.log(err)); 
    };

    formRedirect = () => {
        this.props.history.push('/dashboard')
    }

    selectImgFile = event => {
        this.setState({selectedFile: event.target.files[0]})
        //console.log(event.target.files[0])
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


    render() {
        return (
            <div>
                <Nav>
                    <a className="nav-link" href="/dashboard" >
                        Dashboard
                    </a>
                    <NavItemLogout />
                </Nav>
                <div className="container text-center mb-5">
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

                            <FormBtn 
                            disabled={!this.state.selectedFile}
                            onClick={this.uploadImgFile}>
                            {this.state.loading ? (<div className="spinner-border text-info" role="status">
                            <span className="sr-only">Loading...</span>
                            </div>): ("upload")}
                            
                            </FormBtn>

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

                            <Popup trigger={<FormBtn
                            disabled={
                                !(this.state.title) ||
                                !(this.state.description) ||
                                !(this.state.city) ||
                                !(this.state.category) 
                            }
                            >
                            Submit
                            </FormBtn>} onOpen={this.handleFormSubmit} position="top center" closeOnDocumentClick>
                            <div>
                                <div>
                                Your Job has been posted!
                                </div>
                                <FormBtn onClick={this.formRedirect}> Home </FormBtn>
                            </div>
                            </Popup>
                            
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