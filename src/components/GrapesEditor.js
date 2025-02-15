"use client"; // Ensures this runs only in the browser

import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      editorRef.current = grapesjs.init({
        container: "#gjs",
        height: "100vh",
        width: "100%",
        storageManager: false,
        plugins: [grapesjsPresetWebpage],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
        },
      });
    }
  }, []);

  return <div id="gjs"></div>;
};

export default GrapesEditor;
