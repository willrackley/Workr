import React from "react";
import "./style.css";

function Nav({children}) {
  return (
    
    <nav className="navbar navbar-expand-lg navbar-dark">
      <div className="container">
        <a className="navbar-brand" href="/">
          WORKr
        </a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse m-0" id="navbarSupportedContent">
            <div className="navbar-nav ml-auto">
              {children}
            </div>
        </div>
      </div>
    </nav>
    
  );
}

export default Nav;