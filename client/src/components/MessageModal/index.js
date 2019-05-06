import React from "react";
import { TextArea } from "../Form";


export default function MessageModal(props) {
    return (
        <div>
        {props.mappedModal.map(newModal => (
        <div key={newModal._id} className="modal fade" id={`myModal${newModal._id}`} tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title d-block" id="exampleModalLabel">To: {newModal.posterName}</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <TextArea 
                        value={props.value}
                        onChange={props.onChange}
                        name={props.name}
                        type="text" 
                        />
                    </div>
                    <div className="modal-footer">
                    {props.children}
                        
                    </div>
                </div>
            </div>
        </div>
    ))}
     </div>
    )
   
}