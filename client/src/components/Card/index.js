import React from "react";
import { FormBtn } from "../Form";
import "./style.css";

export default function Card(props) {
   
  return (
    <div>
        {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
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
                         <FormBtn onClick={() =>props.contactEmployer(result.posterEmail)} >
                             Contact EMPLOYr
                         </FormBtn>
                    </div>
                </div>
            </li>
        ))}
    </div>
  );
}



