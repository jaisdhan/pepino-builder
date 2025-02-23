import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDesktop,
  faTabletScreenButton,
  faMobileScreenButton,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

const handleLogout = () => {
  window.location.href = "/login";
};

const Header = ({ editor, isSidebarExpanded, toggleSidebar }) => {
  const [isPreviewMode, setIsPreviewMode] = useState(false);

  useEffect(() => {
    if (editor) {
      // Sync the preview mode state with the editor's visibility
      const updateVisibility = () => {
        const isVisible = editor.getModel().get("visible");
        setIsPreviewMode(!isVisible); // Invert because "visible" means UI is visible
      };

      // Listen for changes in the editor's visibility
      editor.on("editor:update", updateVisibility);

      // Cleanup the event listener
      return () => {
        editor.off("editor:update", updateVisibility);
      };
    }
  }, [editor]);

  const togglePreviewMode = () => {
    if (editor) {
      const isVisible = editor.getModel().get("visible");
      editor.getModel().set("visible", !isVisible); // Toggle visibility
      setIsPreviewMode(!isVisible); // Update the state

      // Collapse/expand the sidebar
      toggleSidebar();
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

      {editor && ( // Only render buttons if editor is available
        <div className="center-buttons">
          <button
            className="header-button"
            onClick={() => editor.setDevice("Desktop")}
          >
            <FontAwesomeIcon icon={faDesktop} />
          </button>
          <button
            className="header-button"
            onClick={() => editor.setDevice("Tablet")}
          >
            <FontAwesomeIcon icon={faTabletScreenButton} />
          </button>
          <button
            className="header-button"
            onClick={() => editor.setDevice("Mobile portrait")}
          >
            <FontAwesomeIcon icon={faMobileScreenButton} />
          </button>
          <button className="header-button" onClick={togglePreviewMode}>
            <FontAwesomeIcon icon={isPreviewMode ? faEyeSlash : faEye} />
          </button>
        </div>
      )}

      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
    </header>
  );
};

export default Header;