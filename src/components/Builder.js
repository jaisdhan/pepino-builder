import React, { useEffect, useRef } from "react";
import grapesjs from "grapesjs";
import "grapesjs/dist/css/grapes.min.css";
import grapesjsPresetWebpage from "grapesjs-preset-webpage";
import grapesjsStyleBg from "grapesjs-style-bg";
import grapesjsCustomCode from "grapesjs-custom-code";
import Image from "next/image";
import "../styles/builder.css"; // Import your custom CSS file

const handleLogout = () => {
  window.location.href = "/login";
};

const Header = () => (
  <header className="fixed top-0 left-0 right-0 h-16 flex items-center justify-between bg-primary z-50 px-4">
    <div className="flex items-center">
      <Image
        src="/images/logo/logo.svg"
        alt="Pepino Brand Logo"
        width={180}
        height={90}
        className="object-contain"
      />
    </div>
    <button
      onClick={handleLogout}
      className="bg-black text-white px-4 py-2 rounded-md hover:bg-opacity-80 transition-all"
    >
      Logout
    </button>
  </header>
);

const BlockSidebar = () => (
  <div
    id="left-sidebar"
    className="left-sidebar"
  >
    {/* Sidebar Header */}
    <div className="sidebar-header">
      <h3>Blocks</h3>
    </div>

    {/* Sidebar Content */}
    <div id="blocks-container" className="sidebar-content">
      {/* GrapesJS Block Manager will append blocks here */}
    </div>
  </div>
);

const Body = () => (
  <div
    id="gjs"
    className="mt-16"
    style={{ marginLeft: "250px" }}
  ></div>
);

const GrapesEditor = () => {
  const editorRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) {
      const leftSidebar = document.getElementById("blocks-container"); // Append blocks to the container

      const editor = grapesjs.init({
        container: "#gjs",
        height: "calc(100vh - 64px)",
        width: "calc(100% - 250px)",
        fromElement: true,
        storageManager: false,
        plugins: [grapesjsPresetWebpage, grapesjsStyleBg, grapesjsCustomCode],
        pluginsOpts: {
          grapesjsPresetWebpage: {},
          grapesjsStyleBg: {},
          grapesjsCustomCode: {},
        },
        blockManager: {
          appendTo: leftSidebar, // Append blocks to the #blocks-container
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

      // Add a custom image block
      editor.BlockManager.add("image", {
        label: "Image",
        category: "Basic",
        content: {
          type: "image",
          attributes: { class: "img-block" },
        },
      });

      // Add functionality to upload images
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = "image/*";
      fileInput.style.display = "none";
      document.body.appendChild(fileInput);

      fileInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (file) {
          const reader = new FileReader();
          reader.onload = (e) => {
            const imageBase64 = e.target.result;
            editor.AssetManager.add({ src: imageBase64 });
            const selected = editor.getSelected();
            if (selected) {
              selected.set("src", imageBase64);
            }
          };
          reader.readAsDataURL(file);
        }
      });

      // Add a trait to the image component for uploading
      editor.DomComponents.addType("image", {
        isComponent: (el) => el.tagName === "IMG",
        model: {
          defaults: {
            traits: [
              {
                type: "text",
                label: "URL",
                name: "src",
              },
              {
                type: "button",
                text: "Upload Image",
                full: true,
                command: "upload-image",
              },
            ],
          },
        },
      });

      // Command to open the file input when "Upload Image" is clicked
      editor.Commands.add("upload-image", {
        run: () => fileInput.click(),
      });

      editorRef.current = editor;
    }
  }, []);

  return (
    <div>
      <Header />
      <BlockSidebar />
      <Body />
    </div>
  );
};

export default GrapesEditor;