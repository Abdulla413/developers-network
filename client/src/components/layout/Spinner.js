import React, { Fragment } from "react";
import spinner from "./spinner.gif";
const Spinner = () => (
  <Fragment>
    <img
      src={spinner}
      style={{ widows: "200px", margin: "auto", display: "block" }}
      alt="Loading..."
    />
  </Fragment>
);

export default Spinner;
