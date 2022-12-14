import React, { Fragment } from "react";

const NotFound = () => {
  return (
    <Fragment>
      <section className="container">
        <h1 className="X-larg text-primary">
          <i className="fas fa-exclamation-triangle" /> Page Not Found
        </h1>
        <p className="large">Sorry, This page does not exist.</p>
      </section>
    </Fragment>
  );
};

export default NotFound;
