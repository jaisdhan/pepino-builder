import React, { useEffect, useRef, useState } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";
import Header from "./Header";
import BlockSidebar from "./BlockSidebar";
import Body from "./Body";

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