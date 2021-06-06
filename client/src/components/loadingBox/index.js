import React from "react";
import "./styles/loading.css";

export default function LoadingBox() {
  return (
    <div className="loading">
      <i className="fa fa-spinner fa-spin"></i> Loading...
    </div>
  );
}
