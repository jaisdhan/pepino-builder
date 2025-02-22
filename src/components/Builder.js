import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";
import Image from "next/image";
import "../styles/builder.css"; // Import your CSS file

// Import Font Awesome
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faTabletScreenButton,
  faMobileScreenButton,
} from "@fortawesome/free-solid-svg-icons";

const handleLogout = () => {
  window.location.href = "/login";
};

// Header component with device buttons
const Header = ({ editor }) => {
  const handleDeviceChange = (device) => {
    if (editor) {
      editor.setDevice(device); // Use setDevice instead of runCommand
    }
  };

  return (
    <header>
      <div className="logo-container">
        <Image
          src="/images/logo/logo.svg"
          alt="Pepino Brand Logo"
          width={180}
          height={90}
          className="logo"
        />
      </div>

      <div className="center-buttons">
        <button
          className="header-button"
          onClick={() => handleDeviceChange("Desktop")}
        >
          <FontAwesomeIcon icon={faDesktop} /> {/* Desktop icon */}
        </button>
        <button
          className="header-button"
          onClick={() => handleDeviceChange("Tablet")}
        >
          <FontAwesomeIcon icon={faTabletScreenButton} />
        </button>
        <button
          className="header-button"
          onClick={() => handleDeviceChange("Mobile portrait")}
        >
          <FontAwesomeIcon icon={faMobileScreenButton} />
        </button>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

// Sidebar component
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

// Main editor area
const Body = ({ isSidebarExpanded }) => (
  <div
    id="gjs"
    className="main-content"
    style={{ marginLeft: isSidebarExpanded ? "250px" : "0" }}
  ></div>
);

// Main GrapesEditor component
const GrapesEditor = () => {
  const editorRef = useRef(null);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(true);
  const [editor, setEditor] = useState(null); // State to hold the editor instance

  const toggleSidebar = () => {
    setIsSidebarExpanded((prev) => !prev);
  };

  useEffect(() => {
    if (!editorRef.current) {
      const editorInstance = grapesjs.init({
        container: "#gjs",
        height: "calc(100vh - 64px)",
        width: isSidebarExpanded ? "calc(100% - 250px)" : "100%",
        fromElement: true,
        storageManager: false,
        plugins: [grapesjsPresetWebpage, grapesjsStyleBg, grapesjsCustomCode],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
          grapesjsStyleBg: {},
          grapesjsCustomCode: {},
        },
        blockManager: {
          appendTo: "#blocks-container",
        },
        panels: {
          defaults: [],
        },
        assetManager: {
          embedAsBase64: true,
          upload: false,
          autoAdd: true,
        },
      });

      // Remove the devices panel after initialization
      editorInstance.on("load", () => {
        const devicesPanel = editorInstance.Panels.getPanel("devices-c");
        if (devicesPanel) {
          editorInstance.Panels.removePanel("devices-c");
        }
      });

      editorRef.current = editorInstance;
      setEditor(editorInstance); // Set the editor state
    }
  }, [isSidebarExpanded]);

  return (
    <div>
      <Header editor={editor} /> {/* Pass the editor state */}
      <BlockSidebar
        isSidebarExpanded={isSidebarExpanded}
        toggleSidebar={toggleSidebar}
      />
      <Body isSidebarExpanded={isSidebarExpanded} />
    </div>
  );
};

export default GrapesEditor;
