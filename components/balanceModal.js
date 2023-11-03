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

const steps = ["Verify Voucher", "SMS Cost(0.5)", "Receive Balance"];

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

export default function NestedModalBalance({ open, setOpen }) {
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
  const paymentData = {
    phone_number: `254${phoneNumber}`,
    amount: "1",
    api_ref: voucher,
  };

  const checkPaymentStatus = async (invoiceId) => {
    try {
      const res = await axios.post(`${base_url}payment/status`, {
        invoice_id: invoiceId,
      });
      console.log(res.data.invoice.state);
      setStatus(res.data.invoice.state);

      switch (res.data.invoice.state) {
        case "PROCESSING":
        case "PENDING":
          setTimeout(() => {
            checkPaymentStatus(invoiceId);
          }, 20000);
          break;
        case "RETRY":
          return toast.error(`${res.data.invoice.failed_reason}`);
        case "COMPLETE":
          return (
            setstep(2),
            runFireworks(),
            toast.success(
              "Transaction completed. Voucher will be sent via SMS within 10min. Thank you."
            )
          );
        default:
          return toast.error("Something went wrong, please try again");
      }
    } catch (error) {
      // Handle any errors that occur during the request
      console.log(error);
    }
  };

  const payNow = async () => {
    if (phoneNumber.length < 9 || phoneNumber.length > 9) {
      return toast.error("invalid phone number!");
    }
    try {
      const api = axios.create({
        baseURL: base_url,
      });

      const res = api.post(`/payment`, paymentData).then((response) => {
        // console.log(response);
        if (response.data?.paymentData.invoice?.state === "PENDING") {
          checkPaymentStatus(response.data.paymentData.invoice.invoice_id);
        }
      });

      toast.promise(res, {
        loading: "Initializing stk push",
        success: "success, please enter mpesa pin",
        error: "Error occurred. Please try again",
      });
    } catch (err) {
      console.log(err);
    }
  };

  const verifyVoucher = async () => {
    if (voucher.length < 4) {
      return toast.error("invalid voucher");
    }
    try {
      const api = axios.create({
        baseURL: base_url,
      });

      const res = api
        .post(`payment/validate-voucher`, {
          voucher: voucher,
        })
        .then((response) => {
          if (response.data.success) {
            setstep(1);
            setSwap(true);
            return response.data;
          } else {
            reject();
          }
        });

      toast.promise(res, {
        loading: "Validating your voucher. Please wait...",
        success:
          "Voucher validation successful. You may proceed to the next step.",
        error:
          "An error occurred during validation. Please double-check your voucher and try again.",
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
            {/* <div className="flex space-x-1 items-center">
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
            </div> */}
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

                <div className="mt-2">
                  <IconButton
                    className="text-[15px] p-0 rounded-md"
                    onClick={() => verifyVoucher()}
                  >
                    <div className="text-green-500 bg-green-500 hover:bg-green-500 w-fit px-2 py-1.5 rounded-md">
                      <h2 className="text-white font-bold text-[17px]">
                        Verify
                      </h2>
                    </div>
                  </IconButton>
                </div>

                <div className="flex items-center  relative top-[13px] space-x-1">
                  <h2 className="font-bold text-[13px] text-black">NB:</h2>
                  <h2 className="text-red-500 text-[12px]">
                    Wait for transaction completion on this page.
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
                    Wait for transaction completion on this page.
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
