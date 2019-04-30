import React from "react";
import "./style.css";


export function Input(props) {
  return (
    <div className="form-group">
      <label className="text-muted">{props.children}</label>
      <input className="form-control text-center" {...props} />
    </div>
  );
}

export function OfferInput(props) {
  return (
    <div className="form-group">
      <label className="text-muted">Cash Offer</label>
      <input className="form-control text-center" {...props} />
    </div>
  );
}
export function FormBtn(props) {
  return (
    <button {...props} className="btn formBtn mt-2 btn-secondary text-white">
      {props.children}
    </button>
  );
}

export function CategoryDropdown(props) {
  return (
    <div className="form-group">
      <label htmlFor="exampleFormControlSelect1" className="text-muted">Category</label>
      <select className="form-control" {...props}>
        <option  value="" disabled>Select a Category</option>
        <option>Landscaping</option>
        <option>House Work</option>
        <option>Car Cleaning</option>
        <option>Miscellaneous</option>
      </select>
    </div>
  );
}

export function RadioBtn(props) {
    return (
      <div className="form-check form-check-inline ml-1">
          <input className="form-check-input" type="radio" {...props}/>
          <label className="form-check-label">
          {props.children}
          </label>
      </div>
    );
}

export function TextArea(props){
  return(
    <div className="form-group">
    
    <textarea className="form-control text-center" rows="4" {...props}/>
  </div>
  );
}