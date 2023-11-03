"use client";

// ** MUI Imports
import React from "react";
import { Zoom, styled } from "@mui/material";
import useScrollTrigger from "@mui/material/useScrollTrigger";
import Fab from "@mui/material/Fab";
import ArrowUp from "mdi-material-ui/ArrowUp";

const ScrollToTopStyled = styled("div")(({ theme }) => ({
  zIndex: 11,
  position: "fixed",
  left: theme.spacing(2),
  bottom: theme.spacing(3.5),
}));

const ScrollToTop = () => {
  // ** init trigger
  const trigger = useScrollTrigger({
    threshold: 400,
    disableHysteresis: true,
  });

  const handleClick = () => {
    const anchor = document.querySelector("body");
    if (anchor) {
      anchor.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <Zoom in={trigger} onClick={handleClick}>
        <ScrollToTopStyled>
          <Fab
            color="success"
            size="small"
            aria-label="scroll back to top"
            className="bg-purple-500"
          >
            <ArrowUp />
          </Fab>
        </ScrollToTopStyled>
      </Zoom>
    </>
  );
};

export default ScrollToTop;
