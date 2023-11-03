"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AlertDialogSlide({ open, setOpen }) {
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle className="text-center">
          {"System update complete!"}
        </DialogTitle>

        <DialogContent className="space-y-3 flex flex-col">
          <div className="flex items-center">
            <svg
              className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <DialogContentText id="alert-dialog-slide-description">
              Access the balance checking feature by opening the menu and
              selecting the 'Balance' tab.
            </DialogContentText>
          </div>

          <div className="flex items-center">
            <svg
              className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <DialogContentText id="alert-dialog-slide-description">
              Encountering login problems with a valid voucher? Navigate to the
              menu and select the 'Fix Voucher' tab for troubleshooting.
            </DialogContentText>
          </div>

          <div className="flex items-center">
            <svg
              className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <DialogContentText id="alert-dialog-slide-description">
              Enjoy a 14% cashback when you purchase the Ksh 35 Daily Pro
              package. Get your cashback as free Safaricom Etopup airtime.
            </DialogContentText>
          </div>

          <div className="flex items-center">
            <svg
              className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>
            <DialogContentText id="alert-dialog-slide-description">
              New here? Explore our free system walkthrough tutorial on the
              homepage under 'How It Works'.
            </DialogContentText>
          </div>
          <div className="flex items-center">
            <svg
              className="w-3 h-3 fill-current text-green-500 mr-2 shrink-0"
              viewBox="0 0 12 12"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
            </svg>

            <DialogContentText id="alert-dialog-slide-description">
              To check your balance, revisit this page at
              <a
                className="text-purple-700 ml-2 underline"
                href="https://wifi.classicresidence.co.ke/"
              >
                wifi.classicresidence.co.ke
              </a>
              . This service is entirely free, and you can access it without an
              active voucher. The website remains free as long as you are
              connected to any ClassicsNet Pro network.
            </DialogContentText>
          </div>
        </DialogContent>

        <DialogActions className="  flex justify-end right-3 relative">
          <Button onClick={handleClose} className="bg-emerald-200">
            I know
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
