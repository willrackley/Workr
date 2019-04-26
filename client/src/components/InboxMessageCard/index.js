import React from "react";
import { FormBtn } from "../Form";
import "./style.css"

export default function InboxMessageCard(props) {
   
    return (
        <div>
            {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                        {/* <img src={result.jobImage} className="card-img-top p-3 mt-4" alt={result.jobTitle}></img> */}
                        </div>
                        <div className="col-md-8">
                        <div className="card-header">
                        <div className="row text-right mb-2">
                            <div className="col-md-8">
                                <p>{result.senderName}</p>
                            </div>
                            
                            <div className="col-md-4">
                                <FormBtn>
                                    X
                                </FormBtn>
                            </div>
                        </div>
                        </div>
                    <div className="card-body text-center">
                        <p>{result.messageBody}</p>
                    </div>
                    <div className="card-footer text-muted text-center">
                
                    </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        ))}

        </div>
    )

}