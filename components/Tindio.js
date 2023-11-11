"use client";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";

const TidioChat = () => {
  useEffect(() => {
    const tidioScript = document.createElement("script");
    tidioScript.src = "//api.charlesmwaniki.com/cs/tidio";
    tidioScript.async = true;
    document.body.appendChild(tidioScript);

    return () => {
      document.body.removeChild(tidioScript);
    };
  }, []);

  return (
    <Helmet>
      <script
        src="//api.charlesmwaniki.com/cs/tidio"
        async
      ></script>
    </Helmet>
  );
};

export default TidioChat;
