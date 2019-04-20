import React from "react";
import { FormBtn } from "../Form";
import "./style.css";

export default function Card(props) {
   
  return (
    <div className="card-columns py-3">
        {props.results.map(result => (
                <div className="card mb-3" key={result._id}>
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-6">
                                <p>{result.posterName}</p>
                            </div>
                            <div className="col-md-6">
                                <p className="text-right"> ${result.offer}</p>
                            </div>
                        </div>
                        <h3>{result.title}</h3>
                    </div>
                    <div className="card-body">
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



