import React from "react";
import { FormBtn } from "../Form";
import API from "../../utils/API";
import "./style.css";
import Popup from "reactjs-popup";
let grabbedRating = 0

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = { user: 0 }
        this.getStarRating = (data) => {
          
          API.findOneUser(data.posterId)
          .then(res => {
            grabbedRating = res.data[0].rating
            this.setState({ user: grabbedRating})
            return grabbedRating;
          })
          
        }
      }

     
      
      
      render(){
        
    return (
 
    <div className="card-columns py-3">
        {this.props.results.map(result => (
          
                <div className="card mb-3 rounded" key={result._id}>
                <div className="card-header bg-white">
                  <button className="titleBtn btn rounded-circle">
                  {result.posterName}
                  </button>
                </div>
                <img src={result.jobImage} className="card-img-top img-fluid" alt={result.title}></img>
                    <div className="card-body text-center">
                        <div className="row">
                            <div className="col-md-6 mb-2">
                              
                            
                            </div>
                            <div className="col-md-6">
                                <p className="text-right"  id="offer"> ${result.offer}</p>
                            </div>
                        </div>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>  
                        <p>{result.city}, {result.state}</p> 
                        <FormBtn id="messageEmployr"
                        onClick={()=>this.props.getDataForMessage(result)}
                        data-toggle="modal" data-target="#myModal">>Message EMPLOYr</FormBtn>
                    </div>
                        
                </div>
           
        ))}
    </div>
  
  );
}}

export default Card;



