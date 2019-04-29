import React from "react";
import { FormBtn } from "../Form";
import Moment from "react-moment";
import "./style.css"

export default function SentMessageCard(props) {
   
    return (
        <div>
            {props.results.map(result => (
            <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                <div className="card mb-3">
                        <div className="card-header">
                            <div className="row text-right mb-3">
                                <div className="col-12">
                                    <FormBtn onClick={()=>props.deleteMessage(result._id)}>
                                    &times;
                                    </FormBtn>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-md-9">
                                    <p>From: {result.senderName}</p>
                                    <p>To: {result.recieverName}</p>
                                </div>
                                <div className="col-md-3 text-right">
                                    <p><Moment format="MM/DD/YYYY">{result.date}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-left">
                            <p>{result.messageBody}</p>
                        </div>
                        <div className="card-footer text-muted text-center">
                    
                        </div>
                </div>
            </li>
        ))}

        </div>
    )

}