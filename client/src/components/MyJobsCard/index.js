import React from "react";
import { FormBtn } from "../Form";
import "./style.css"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Moment from "react-moment";

export default function MyJobsCard(props) {
   
  return (
    <div className="">
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
                            {result.status === "completed" ? (<div><p><span className="font-weight-bold statusCompleted text-capitalize">{result.status}</span> <Moment format="MM/DD/YYYY">{result.date}</Moment></p></div>): (<p className="font-weight-bold statusIncomplete text-capitalize">{result.status}</p>)}
                                
                            </div>
                            <div className="col-md-4">
                                <p className="text-center offer"> ${result.offer}</p>
                            </div>
                            <div className="col-md-4">
                                <button className="btn deleteBtn" onClick={() => {
                                    confirmAlert({
                                    title: 'You are about to delete this job.',
                                    message: 'Are you sure you want to do this?',
                                    buttons: [
                                        {
                                        label: 'Yes',
                                        onClick: () => props.deleteJob(result._id)
                                        },
                                        {
                                        label: 'No',
                                        onClick: () => {}
                                        }
                                    ]
                                    });
                                }}>
                                    <i class="far fa-trash-alt"></i>
                                </button>
                            </div>
                        </div>
                        
                        <h3 className="text-center text-capitalize">{result.title}</h3>
                    </div>
                    <div className="card-body text-center">
                        <p>{result.description}</p>
                    </div>
                    <div className="card-footer text-muted text-center">
                                {result.status === "incomplete" ? (<button className="btn cardSubmitButton" onClick={() => {
                                    confirmAlert({
                                    title: 'You are marking this job as complete!',
                                    message: 'Are you sure you want to do this?',
                                    buttons: [
                                        {
                                        label: 'Yes',
                                        onClick: () => props.completeJob(result._id)
                                        },
                                        {
                                        label: 'No',
                                        onClick: () => {}
                                        }
                                    ]
                                    })}}>
                            Complete Job
                        </button>) : (<div><button className="btn cardSubmitButton" onClick={() => {
                                    confirmAlert({
                                    title: 'You are marking this job as incomplete!',
                                    message: 'Are you sure you want to do this?',
                                    buttons: [
                                        {
                                        label: 'Yes',
                                        onClick: () => props.reopenJob(result._id)
                                        },
                                        {
                                        label: 'No',
                                        onClick: () => {}
                                        }
                                    ]
                                    })}}>
                            Reopen Job
                        </button>{result.seekerRated ? ("") : (<div> <FormBtn data-toggle="modal" data-target="#myJobsModal" className="ml-2">Rate your WORKr</FormBtn></div>)}</div>)}            
                    </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        ))}
    </div>
  );
}



