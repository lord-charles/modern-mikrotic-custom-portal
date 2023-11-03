import React, { useEffect } from "react";

const IntercomSettings = ({ user }) => {
  useEffect(() => {
    if (typeof window.Intercom === "function") {
      // If Intercom is loaded, update the settings
      window.Intercom("reattach_activator");
      window.Intercom("update", {
        app_id: "xjtrsxnz",
        name: user.name, // Full name
        email: user.email, // Email address
        created_at: Math.floor(new Date(user.createdAt).getTime() / 1000), // Convert signup date to Unix timestamp
      });
    } else {
      // If Intercom is not loaded, dynamically load the Intercom widget script
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.async = true;
      script.src = "https://widget.intercom.io/widget/xjtrsxnz";
      document.head.appendChild(script);

      script.onload = () => {
        // After the script is loaded, initialize Intercom with updated settings
        window.Intercom("reattach_activator");
        window.Intercom("update", {
          app_id: "xjtrsxnz",
          name: user.name, // Full name
          email: user.email, // Email address
          created_at: Math.floor(new Date(user.createdAt).getTime() / 1000), // Convert signup date to Unix timestamp
        });
      };
    }
  }, [user]);

  return null; // This component doesn't render any visible content
};

export default IntercomSettings;
