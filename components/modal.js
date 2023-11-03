import * as React from "react";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { base_url } from "@/utils/baseUrl";
import config from "@/utils/axiosconfig";
import axios from "axios";
import { toast } from "react-hot-toast";
import { runFireworks } from "./Success";
import CopyToClipboard from "react-copy-to-clipboard";

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

const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NDNkNzcyODhiZDhmMmE2ZmE4ZmE4NDAiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE2ODgyMDY0OTYsImV4cCI6MTg2MTAwNjQ5Nn0.c3dXRZtBYG3_HtcTqsXrjPQwT3Q1U1iXkgoweYQZpFE";

export default function NestedModal({ open, setOpen, data }) {
  const handleClose = () => {
    setOpen(false);
  };
  const [phoneNumber, setPhoneNumber] = useState("");
  const [status, setStatus] = useState("N/A");
  const [isCopied, setIsCopied] = useState(false);
  const textToCopy = "0740315545";

  const handleCopy = () => {
    setIsCopied(true);
    // Optionally, you can perform some action after copying, e.g., show a notification
    // or change the button text.
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };
  // const regex = /^(0[19]\d{8})$/;

  // if (regex.test(inputNumber)) {
  //   setPhoneNumber(inputNumber);
  // }
  const paymentData = {
    phone_number: `254${phoneNumber}`,
    amount: data.price,
  };

  const smsData = {
    mobile: `0${phoneNumber}`,
    speed: data.speed,
    validity: data.validity,
    bandwidth: data.bandwidth,
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
        headers: config(token).headers,
      });

      const res = api.post(`/payment`, paymentData).then((response) => {
        // console.log(response);
        if (response.data?.paymentData.invoice?.state === "PENDING") {
          checkPaymentStatus(response.data.paymentData.invoice.invoice_id);
          return response.data;
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

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>
          <div className="flex justify-between items-center">
            <h2
              id="parent-modal-title"
              className="text-black font-serif font-bold text-[20px]"
            >
              Package Details
            </h2>
            <div className="flex space-x-1 items-center">
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

          <div className="flex space-x-1">
            <p id="parent-modal-description" className="text-black">
              Purchase {data.bandwidth} valid for {data.validity} at Ksh
              {data.price}
            </p>
          </div>
          <div className="mt-1">
            <h2 className="text-black text-[13px]">
              Please enter valid safaricom number
            </h2>
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

            <div className="mt-2">
              <IconButton
                className="text-[15px] p-0 rounded-md"
                onClick={() => payNow()}
              >
                <div className="text-green-500 bg-green-500 hover:bg-green-500 w-fit px-2 py-1.5 rounded-md">
                  <h2 className="text-white font-bold text-[17px]">Pay now</h2>
                </div>
              </IconButton>
            </div>
            {/* manual */}
            {/* <div>
              <div>
                <ul className="text-black">
                  <li>Mpesa</li>
                  <li>Send money</li>
                  <li>Amount: Ksh {data.price}</li>
                </ul>
              </div>
              <div className="flex items-center space-x-1">
                <h2 className="text-black">Account: {textToCopy}</h2>
                <CopyToClipboard text={textToCopy} onCopy={handleCopy}>
                  <button
                    className="text-green-500 border rounded-md p-1"
                    onClick={() => toast.success("copied")}
                  >
                    Copy
                  </button>
                </CopyToClipboard>
              </div>
            </div> */}
            <div className="flex items-center  relative top-[13px] space-x-1">
              <h2 className="font-bold text-[13px] text-black">NB:</h2>
              <h2 className="text-red-500 text-[12px]">
                Wait for transaction completion on this page.
              </h2>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
}
