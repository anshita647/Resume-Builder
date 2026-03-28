import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const Title = ({ title, description }) => {
  return (
    <div className="text-center mt-5">
      <h2 className="fw-semibold display-6 display-sm-5 text-dark">
        {title}
      </h2>

      <p className="mx-auto mt-3 text-muted" style={{ maxWidth: "42rem" }}>
        {description}
      </p>
    </div>
  );
};

export default Title;
