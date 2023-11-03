import React, { useState } from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import toast from "react-hot-toast";
import axios from "axios";
import { base_url } from "@/utils/baseUrl";
import { config } from "process";
import { IconButton, InputAdornment, TextField } from "@mui/material";

import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { runFireworks } from "./Success";

const steps = ["Enter Voucher", "Fix Now", "Voucher Fixed"];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

function ChildModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleOpen}
        className="text-purple-700 underline capitalize font-normal italic"
      >
        Why pay?
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="child-modal-title"
        aria-describedby="child-modal-description"
      >
        <Box sx={{ ...style, width: 300 }}>
          <p className="text-black text-[11px]">
            The system covers the SMS cost for sending vouchers. However,
            checking your balance is entirely your responsibility, as Safaricom
            charges the system Ksh 0.5/sms. Please note that, due to M-Pesa
            regulations, a minimum charge of Ksh 1 will eventually apply, as the
            system must receive at least that amount.
          </p>
          <div
            onClick={handleClose}
            className="text-center text-purple-700 text-bold mt-2 cursor-pointer"
          >
            Close
          </div>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export default function NestedModalBalance2({ open, setOpen }) {
  const [status, setStatus] = useState("N/A");
  const [swap, setSwap] = useState(false);
  const [voucher, setVoucher] = useState("");
  const [step, setstep] = useState(0);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const [phoneNumber, setPhoneNumber] = useState("");

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  const handleChangeVoucher = (event) => {
    setVoucher(event.target.value);
  };

  const verifyVoucher = async () => {
    if (voucher.length < 4) {
      return toast.error("invalid voucher");
    }
    setstep(1);

    try {
      const api = axios.create({
        baseURL: base_url,
      });

      const res = api
        .post(`payment/removeActiveSessions`, {
          voucher: voucher,
        })
        .then((response) => {
          console.log(response.data);
          if (response.data.success) {
            setstep(2);
            runFireworks();
            return response.data;
          } else {
            reject();
          }
        });

      toast.promise(res, {
        loading: "Removing active session...",
        success:
          "Session removed. You can retry(recommended) to check and remove another session.",
        error: `No active sessions found for voucher ${voucher}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box
          sx={{ ...style }}
          className="xxxs:w-[350px] lg:w-[400px] md:w-[400px] rounded-md"
        >
          <div className="flex justify-between items-center">
            <Stepper activeStep={step} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </div>

          <div>
            {!swap ? (
              <div className="mt-4">
                <h2 className="text-black text-[13px] py-1">
                  Please enter a valid Voucher code
                </h2>
                <TextField
                  label="Voucher"
                  placeholder="Valid Voucher code"
                  multiline
                  variant="filled"
                  color="success"
                  value={voucher}
                  onChange={handleChangeVoucher}
                  className="border-none focus:border-none ring-red-100"
                />

                <div className="mt-2 flex items-center justify-between space-x-4">
                  <IconButton
                    className="text-[15px] p-0 rounded-md"
                    onClick={() => verifyVoucher()}
                  >
                    <div className="text-green-500 bg-green-500 hover:bg-green-500 w-fit px-2 py-1.5 rounded-md">
                      <h2 className="text-white font-bold text-[17px]">
                        Fix Now
                      </h2>
                    </div>
                  </IconButton>
                  <h2 className="text-gray-400 text-[11px]">
                    Resolve until no more active sessions remain (at least 4
                    times).
                  </h2>
                </div>

                <div className="flex items-center  relative top-[13px] space-x-1">
                  <h2 className="font-bold text-[13px] text-black">NB:</h2>
                  <h2 className="text-red-500 text-[12px]">
                    Wait untill voucher is fixed on this page.
                  </h2>
                </div>
              </div>
            ) : (
              <div className="mt-4">
                <div className="flex items-center justify-between py-1">
                  <h2 className="text-black text-[13px]">
                    Valid safaricom number
                  </h2>
                  <div className="flex space-x-1 items-center text-[14px]">
                    <h2 className="text-black">Status:</h2>
                    <h2
                      className={`${
                        status === "PENDING"
                          ? "text-yellow-500"
                          : status === "COMPLETE"
                          ? "text-green-500"
                          : status === "PROCESSING"
                          ? "text-orange-500"
                          : status === "FAILED"
                          ? "text-orange-500"
                          : "text-black"
                      } font-bold`}
                    >
                      {status}
                    </h2>
                  </div>
                </div>

                <TextField
                  id="filled-textarea"
                  label="Phone Number"
                  placeholder="791033018"
                  multiline
                  variant="filled"
                  color="success"
                  value={phoneNumber}
                  onChange={handlePhoneNumberChange}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment
                        position="start"
                        className="relative top-[-7px]"
                      >
                        254
                      </InputAdornment>
                    ),
                  }}
                  className="border-none focus:border-none"
                />

                <div className="mt-2 flex justify-between">
                  <IconButton
                    className="text-[15px] p-0 rounded-md"
                    onClick={() => payNow()}
                  >
                    <div className="text-green-500 bg-green-500 hover:bg-green-500 w-fit px-2 py-1.5 rounded-md">
                      <h2 className="text-white font-bold text-[17px]">
                        Pay now
                      </h2>
                    </div>
                  </IconButton>
                  <ChildModal />
                </div>

                <div className="flex items-center  relative top-[13px] space-x-1">
                  <h2 className="font-bold text-[13px] text-black">NB:</h2>
                  <h2 className="text-red-500 text-[12px]">
                    Wait untill voucher is fixed on this page.
                  </h2>
                </div>
              </div>
            )}
          </div>
        </Box>
      </Modal>
    </div>
  );
}
