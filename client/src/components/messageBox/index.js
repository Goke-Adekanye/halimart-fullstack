import React from "react";
import "./styles/messageBox.css";

export default function MessageBox(props) {
  return (
    <div className={`alert alert-${props.variant || "info"}`}>
      {props.error}
      {props.link}
    </div>
  );
}
