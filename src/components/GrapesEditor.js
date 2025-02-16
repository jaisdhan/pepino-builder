"use client";

import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      // Left Sidebar for Blocks
      const leftSidebar = document.createElement("div");
      leftSidebar.id = "left-sidebar";
      leftSidebar.style = `
        position: fixed;
        left: 0;
        top: 0;
        width: 250px;
        height: 100vh;
        background: #f5f5f5;
        padding: 10px;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        z-index: 1000;
      `;
      document.body.appendChild(leftSidebar);

      // Right Sidebar for Component Properties
      const rightSidebar = document.createElement("div");
      rightSidebar.id = "right-sidebar";
      rightSidebar.style = `
        position: fixed;
        right: 0;
        top: 0;
        width: 300px;
        height: 100vh;
        background: #fff;
        border-left: 1px solid #ddd;
        padding: 10px;
        box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
        overflow-y: auto;
        z-index: 1000;
      `;
      document.body.appendChild(rightSidebar);

      // GrapesJS Initialization
      const editor = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        width: "calc(100% - 550px)", // Account for sidebars
        fromElement: true,
        storageManager: false,
        plugins: [grapesjsPresetWebpage, grapesjsStyleBg, grapesjsCustomCode],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
          grapesjsStyleBg: {},
          grapesjsCustomCode: {},
        },
        blockManager: {
          appendTo: leftSidebar,
        },
        panels: {
          defaults: [],
        },
        styleManager: {
          appendTo: rightSidebar,
        },
      });

      // Custom Blocks
      editor.BlockManager.add("text", {
        label: "Text",
        content: "<p>Insert your text here</p>",
        category: "Basic",
      });

      editor.BlockManager.add("image", {
        label: "Image",
        content: "<img src='https://via.placeholder.com/150' alt='Placeholder' />",
        category: "Basic",
      });

      editor.BlockManager.add("spacer", {
        label: "Spacer",
        content: "<div style='height:30px;'></div>",
        category: "Basic",
      });

      editor.BlockManager.add("divider", {
        label: "Divider",
        content: "<hr style='border: 1px solid #ddd;'>",
        category: "Basic",
      });

      editor.BlockManager.add("columns", {
        label: "Columns",
        content: `<div class="row">
                    <div class="column" style="width: 50%; padding: 10px; border: 1px solid #ddd;">Column 1</div>
                    <div class="column" style="width: 50%; padding: 10px; border: 1px solid #ddd;">Column 2</div>
                  </div>`,
        category: "Layout",
      });

      // Debugging
      console.log("Editor initialized:", editor);
      console.log("Blocks added:", editor.BlockManager.getAll());

      // Save reference
      editorRef.current = editor;
    }
  }, []);

  return <div id="gjs" style={{ marginLeft: "250px", marginRight: "300px" }}></div>;
};

export default GrapesEditor;
