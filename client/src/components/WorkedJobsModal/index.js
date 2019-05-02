import React from "react";
//import { TextArea } from "../Form";
import StarRatings from 'react-star-ratings';
import API from "../../utils/API";

class WorkedJobsModal extends React.Component {
    constructor(props) {
        super(props)
        this.state = { rating: 0}
        this.changeRating = ( newRating, name ) => {
            this.setState({rating: newRating });
        }  
        this.myRating = (data) =>{
            console.log(data)
            const userRating = {rating: this.state.rating}
            API.updateRating(data.posterId, userRating)
            .then(res => {
                console.log(res.data)
            })
            .catch(err => console.log(err))

            API.updateWorkrJobRatingBool(data._id)
            .then(res => {
                this.props.loadMyJobs()
            })
            .catch(err => console.log(err))
        }
    }

    render(){
    return (
        <div>
        {this.props.mappedModal.map(newModal => (
        <div key={newModal._id} className="modal fade" id="workedJobsModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title text-center" id="exampleModalLabel">How was {newModal.posterName}?</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                <StarRatings
                rating={this.state.rating}
                starRatedColor="#28a6af"
                changeRating={this.changeRating}
                numberOfStars={5}
                name='rating'
                />
                </div>
                <div className="modal-footer">
                <button data-dismiss="modal" onClick={() => this.myRating(newModal)}>Submit</button>
                {this.props.children}
                    
                </div>
                </div>
            </div>
        </div>
    ))}
     </div>);
    }
}

export default WorkedJobsModal;