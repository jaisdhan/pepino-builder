import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";
import Image from "next/image";
import "../styles/builder.css"; 

const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 flex items-center bg-primary z-50">
    <div className="flex items-center pl-4">
      <Image
        src="/images/logo/logo.svg"
        alt="Pepino Brand Logo"
        width={180}
        height={90}
        className="object-contain"
      />
    </div>
  </header>
);

const BlockSidebar = () => (
  <div
    id="left-sidebar"
    className="fixed left-0 top-0 h-screen bg-black p-2 shadow-lg overflow-y-auto z-40 text-primary"
  ></div>
);

const PropertySidebar = () => (
  <div
    id="right-sidebar"
    className="fixed right-0 top-0 w-[300px] h-screen bg-white border-l border-gray-200 p-2 shadow-lg overflow-y-auto z-40"
    
  ></div>
);

const Body = () => (
  <div
    id="gjs"
    className="mt-16"
    style={{ marginLeft: "250px", marginRight: "300px" }}
  ></div>
);

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const leftSidebar = document.getElementById("left-sidebar");
      const rightSidebar = document.getElementById("right-sidebar");

      const editor = grapesjs.init({
        container: "#gjs",
        height: "calc(100vh - 64px)",
        width: "calc(100% - 550px)",
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

      // Añadir bloques personalizados
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

      console.log("Editor initialized:", editor);
      console.log("Blocks added:", editor.BlockManager.getAll());

      editorRef.current = editor;
    }
  }, []);

  return (
    <div>
      <Header />
      <BlockSidebar />
      <PropertySidebar />
      <Body />
    </div>
  );
};

export default GrapesEditor;