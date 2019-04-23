import React from "react";
import { FormBtn } from "../Form";
import "./style.css"

export default function MyJobsCard(props) {
   
  return (
    <div>
        {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                        <img src={result.jobImage} className="card-img-top p-3 mt-4" alt={result.title}></img>
                        </div>
                        <div className="col-md-8">
                        <div className="card-header">
                        <div className="row text-right mb-2">
                            <div className="col-md-4 text-center">
                                <p>{result.status}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-right"> ${result.offer}</p>
                            </div>
                            <div className="col-md-4">
                                <FormBtn onClick={() => props.deleteJob(result._id)}>
                                    X
                                </FormBtn>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                            
                            </div>
                            
                        </div>
                        <h3 className="text-center">{result.title}</h3>
                    </div>
                    <div className="card-body text-center">
                        <p>{result.description}</p>
                    </div>
                    <div className="card-footer text-muted text-center">
                
                    </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        ))}
    </div>
  );
}



