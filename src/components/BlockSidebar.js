import React from "react";

const BlockSidebar = ({ isSidebarExpanded, isSidebarHidden, toggleSidebar }) => {
  console.log("isSidebarHidden:", isSidebarHidden); // Debug: Log the isSidebarHidden state

  return (
    <>
      <div
        className={`left-sidebar ${isSidebarExpanded ? "expanded" : "collapsed"} ${
          isSidebarHidden ? "hidden" : ""
        }`}
      >
        <div id="blocks-container"></div>
      </div>
      {/* Render the toggle button conditionally */}
      {!isSidebarHidden && (
        <button
          className="toggle-sidebar-button"
          onClick={toggleSidebar}
          style={{ left: isSidebarExpanded ? "250px" : "0" }} // Move the button with the sidebar
        >
          {isSidebarExpanded ? "<" : ">"}
        </button>
      )}
    </>
  );
};

export default BlockSidebar;