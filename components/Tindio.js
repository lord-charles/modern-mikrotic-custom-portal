import React, { useEffect } from "react";

const IntercomSettings = ({ user }) => {
 useEffect(() => {
   // Create a new script element
   const script = document.createElement("script");

   // Set the source attribute to the URL of the external script
   script.src = "//fw-cdn.com/11042863/3783723.js";

   // Set any other attributes, such as chat='true'
   script.setAttribute("chat", "true");

   // Append the script element to the document's head
   document.head.appendChild(script);

   // Clean up: Remove the script when the component unmounts
   return () => {
     document.head.removeChild(script);
   };
 }, []);

  return null; // This component doesn't render any visible content
};

export default IntercomSettings;
