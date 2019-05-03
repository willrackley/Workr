import React from "react";
import "./style.css"

export default function Jumbotron({ children }) {
  return (
    <div className="jumbotron mb-5">
      {children}
    </div>
  );
};
