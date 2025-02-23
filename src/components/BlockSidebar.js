import React from "react";

const BlockSidebar = ({ isSidebarExpanded, toggleSidebar }) => (
  <div
    className={`left-sidebar ${isSidebarExpanded ? "expanded" : "collapsed"}`}
  >
    <div id="blocks-container"></div>
    <button className="toggle-sidebar-button" onClick={toggleSidebar}>
      {isSidebarExpanded ? "<" : ">"}
    </button>
  </div>
);

export default BlockSidebar;