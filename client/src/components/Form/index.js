import React from "react";
import "./style.css";


export function Input(props) {
  return (
    <div className="form-group">
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
