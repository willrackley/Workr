import React from "react";
import { FormBtn } from "../Form";
import "./style.css"
import { confirmAlert } from 'react-confirm-alert'; 
import 'react-confirm-alert/src/react-confirm-alert.css'; 
import Moment from "react-moment";

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
                            {result.status === "completed" ? (<div><p>{result.status} <Moment format="MM/DD/YYYY">{result.date}</Moment></p></div>): (<p>{result.status}</p>)}
                                
                            </div>
                            <div className="col-md-4">
                                <p className="text-right"> ${result.offer}</p>
                            </div>
                            <div className="col-md-4">
                                <FormBtn onClick={() => {
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
                                    &times;
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
                                {result.status === "incomplete" ? (<FormBtn onClick={() => {
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
                        </FormBtn>) : (<div><FormBtn onClick={() => {
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
                        </FormBtn>{result.seekerRated ? ("") : (<div> <FormBtn data-toggle="modal" data-target="#myJobsModal" className="ml-2">Rate your WORKr</FormBtn></div>)}</div>)}            
                    </div>
                        </div>
                    </div>
                    
                </div>
            </li>
        ))}
    </div>
  );
}



