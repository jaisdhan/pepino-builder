import React from "react";

const Body = ({ isSidebarExpanded }) => (
  <div
    id="gjs"
    className="main-content"
    style={{ marginLeft: isSidebarExpanded ? "250px" : "0" }}
  ></div>
);

export default Body;