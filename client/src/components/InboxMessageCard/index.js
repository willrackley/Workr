import React from "react";
import { FormBtn } from "../Form";
import Moment from "react-moment";
import "./style.css"

export default function InboxMessageCard(props) {
   
    return (
        <div>
           
            {props.results.map(result => (
                <li className="list-group-item mb-3 pt-4 rounded" key={result._id}>
                    <div className="card mb-3" >
                        <div className="card-header">
                            <div className="row">
                                <div className="col-12 text-right">
                                    <button className="deleteBtn btn" onClick={()=>props.deleteMessage(result._id)}>
                                    <i class="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <p>From: <span className="font-weight-bold">{result.senderName}</span></p>
                                    <p className="font-weight-bold text-capitalize">Job: {result.jobTitle}</p>
                                    <p><Moment format="MM/DD/YYYY">{result.date}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-left">
                            <p>{result.messageBody}</p>
                            {result.inResponseMessage !== null ? (<div className="mt-2 text-muted font-italic font-weight-bold">In Response To: <p>{result.inResponseMessage}</p></div>):("")}

                            {result.inResponseMessage === null && result.messageBody === `${result.senderName} has offered you the Job!` ? (<div><button className="btn " onClick={()=>props.acceptJob(result)}>Accept</button> <button className="btn" onClick={()=>props.declineOffer(result)}>No, I'm ok</button></div>): ("")}
                        </div>
                        <div className="card-footer text-muted text-center">
                            <button className=" btn cardSubmitButton" data-toggle="modal" data-target="#replyModal" onClick={()=>props.getMessageData(result)}><i class="fas fa-reply text-white"></i> Reply</button>
                            
                        </div>
                    </div>
                </li>
            ))}
        </div>
    )
}