import React from "react";
import "./style.css";

function Footer(props) {
  return (
    
    <footer className="mt-5" {...props} >
        <div className="container text-center p-3">
            <small> &copy; 2018-2019 Georgia Tech Full-Stack Web Development Bootcamp Project 3</small>
        </div>
    
    </footer>
    
  );
}

export default Footer;