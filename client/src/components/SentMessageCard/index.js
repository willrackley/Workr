import React from "react";
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
                                    <button className="deleteBtn btn" onClick={()=>props.deleteMessage(result._id)}>
                                    <i class="far fa-trash-alt"></i>
                                    </button>
                                </div>
                            </div>
                            <div className="row no-gutters">
                                <div className="col-12">
                                    <p>From: <span className="font-weight-bold">{result.senderName}</span></p>
                                    <p>To: <span className="font-weight-bold">{result.recieverName}</span></p>
                                    <p><Moment format="MM/DD/YYYY">{result.date}</Moment></p>
                                </div>
                            </div>
                        </div>
                        <div className="card-body text-left">
                            <p>{result.messageBody}</p>
                        </div>
                </div>
            </li>
        ))}

        </div>
    )

}