import React from "react";
import { FormBtn } from "../Form";
import "./style.css";

export default function Card(props) {
   
  return (
    <div className="card-columns py-3">
        {props.results.map(result => (
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
                    </div>
                        
                    <div className="card-footer text-muted text-center">
                         <FormBtn id="contactBtn" onClick={() =>props.contactEmployer(result.posterEmail)} >
                             Contact EMPLOYr
                         </FormBtn>
                    </div>
                </div>
           
        ))}
    </div>
  );
}



