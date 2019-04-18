import React from "react";
import { FormBtn } from "../Form";


export default function MyJobsCard(props) {
   
  return (
    <div>
        {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
                    <div className="card-header">
                        <div className="row">
                            <div className="col-md-12 mb-2">
                                <FormBtn onClick={() => props.deleteJob(result._id)}>
                                    X
                                </FormBtn>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4">
                                <p>{result.posterName}</p>
                            </div>
                            <div className="col-md-4 text-center">
                                <p>{result.status}</p>
                            </div>
                            <div className="col-md-4">
                                <p className="text-right"> ${result.offer}</p>
                            </div>
                        </div>
                        <h3>{result.title}</h3>
                    </div>
                    <div className="card-body">
                        <p>{result.description}</p>
                    </div>
                    <div className="card-footer text-muted text-center">
                
                    </div>
                </div>
            </li>
        ))}
    </div>
  );
}



