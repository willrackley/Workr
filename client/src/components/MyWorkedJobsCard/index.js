import React from "react";
import { FormBtn } from "../Form";
import "./style.css"


export default function MyWorkedJobsCard(props) {
   
  return (
    <div>
        {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4 border-right">
                        <img src={result.jobImage} className="card-img-top p-3 mt-4" alt={result.title}></img>
                        </div>
                        <div className="col-md-8">
                        <div className="card-header">
                        <div className="row text-right mb-2">
                            <div className="col-md-4 text-center">
                                {result.status = "completed" ? (<p className="font-weight-bold statusCompleted text-capitalize">{result.status}</p>) : (<p className="font-weight-bold statusIncomplete  text-capitalize">{result.status}</p>)}
                                
                            </div>
                            <div className="col-md-4">
                                <p className="text-right offer"> ${result.offer}</p>
                            </div>
                            <div className="col-md-4">
                               
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                            
                            </div>
                            
                        </div>
                        <h3 className="text-center text-capitalize">{result.title}</h3>
                    </div>
                    <div className="card-body text-center">
                        <p>{result.description}</p>
                    </div>
                    <div className="card-footer text-muted text-center">
                        {result.status !== "incomplete" ? (<div>{result.posterRated ? ("") : (<FormBtn data-toggle="modal" data-target="#workedJobsModal" className="ml-2">Rate Your EMPLOYr</FormBtn>)}</div>): ("")}    
                    </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        ))}
    </div>
  );
}



