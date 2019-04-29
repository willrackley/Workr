import React from "react";
import "./style.css";

function Nav(props) {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href={props.page}>
          WORKr
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse m-0" id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
              {props.children}
            </div>
        </div>
      </div>
    </nav>
    
  );
}

export default Nav;