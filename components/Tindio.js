"use client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const TidioChat = () => {
  useEffect(() => {
    const tidioScript = document.createElement("script");
    tidioScript.src = "//code.tidio.co/txkewoad3m6ljztgupk3qynve1zmunpr.js";
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return (
    <Helmet>
      <script
        src="//code.tidio.co/txkewoad3m6ljztgupk3qynve1zmunpr.js"
        async
      ></script>
    </Helmet>
  );
};

export default TidioChat;
