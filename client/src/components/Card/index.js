import React from "react";
import { FormBtn } from "../Form";


import "./style.css";

class Card extends React.Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
        this.openModal = this.openModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    
      }
      openModal (){
        this.setState({ open: true })
      }
      closeModal () {
        this.setState({ open: false })
      }

      
      render(){
  return (
    <div className="card-columns py-3">
        {this.props.results.map(result => (
                <div className="card mb-3" key={result._id}>
                <img src={result.jobImage} className="card-img-top img-fluid" alt={result.title}></img>
                    <div className="card-body text-center">
                        <div className="row">
                            <div className="col-md-6">
                                {/* <p>{result.posterName}</p> */}
                            </div>
                            <div className="col-md-6">
                                <p className="text-right"> ${result.offer}</p>
                            </div>
                        </div>
                        <h3>{result.title}</h3>
                        <p>{result.description}</p>
                        <p>{result.city}, {result.state}</p>
                        
                    </div>
                        
                    <div className="card-footer text-muted text-center">
                    
                    <FormBtn
                    onClick={()=>this.props.getDataForMessage(result)}
                    data-toggle="modal" data-target="#myModal">>Message EMPLOYr</FormBtn>
                     
                    </div>
                </div>
           
        ))}
    </div>
  );
}}

export default Card;



