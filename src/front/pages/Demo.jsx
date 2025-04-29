import { useState } from "react";

export const Demo = () => {
 
  (
    <div className="text-center mt-5">
      <h1 className="display-4">Hello Rigo!!</h1>
      <p className="lead">
        <img src="https://via.placeholder.com/150" className="img-fluid rounded-circle mb-3" alt="Rigo Baby" />
      </p>
      <div className="alert alert-info">
        <span>Loading message from the backend...</span>
      </div>
    </div>
  );
};