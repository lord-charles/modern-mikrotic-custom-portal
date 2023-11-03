"use client";
import * as React from "react";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import StarIcon from "@mui/icons-material/StarBorder";
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";
import NestedModal from "../modal";

const tiers = [
  {
    title: "Basic",
    price: "520",
    bandwidth: "75Gb",
    description: ["Devices: 2", "Data: 75GB", "Speed: Shared"],
    buttonText: "Order Now",
    buttonVariant: "outlined",
    time: "30 days",
  },
  {
    title: "Pro",
    subheader: "Most popular",
    bandwidth: "90Gb",
    price: "800",
    description: ["Devices: 2", "Data: 90GB", " Speed: Shared"],
    buttonText: "Order Now",
    buttonVariant: "",
    time: "45 days",
  },
  {
    title: "Enterprice",
    bandwidth: "180Gb",
    price: "1200",
    description: ["Devices: 2", "Data: 180GB", "Speed: Shared"],
    buttonText: "Order Now",
    buttonVariant: "outlined",
    time: "60 days",
  },
];

const MemberPricing = () => {
  const [open, setOpen] = useState(false);
  const [bandwidth, setBandwidth] = useState(0);
  const [price, setPrice] = useState(0);
  const [speed, setSpeed] = useState(1);
  const [validity, setValidity] = useState(0);

  const data = { bandwidth, price, speed, validity };

  const wifipackage = ({ bandwidth, price, speed, validity }) => {
    setBandwidth(bandwidth);
    setPrice(price);
    setSpeed(speed);
    setValidity(validity);
    setOpen(true);
  };

  return (
    <div>
      <NestedModal setOpen={setOpen} open={open} data={data} />

      <Container maxWidth="md" component="main">
        <Grid
          container
          spacing={5}
          alignItems="flex-end"
          className="lg:w-[750px] md:w-[750px] xxxs:w-[380px]"
        >
          {tiers.map((tier) => (
            <Grid
              item
              key={tier.title}
              xs={12}
              sm={tier.title === "Enterprise" ? 12 : 6}
              md={4}
            >
              <div className="border custom-border2 bg-transparent rounded-md">
                <CardHeader
                  title={tier.title}
                  subheader={tier.subheader}
                  titleTypographyProps={{ align: "center" }}
                  action={
                    tier.title === "Pro" ? (
                      <StarIcon className="text-green-500" />
                    ) : null
                  }
                  subheaderTypographyProps={{
                    align: "center",
                  }}
                  sx={{
                    backgroundColor: (theme) =>
                      theme.palette.mode === ""
                        ? theme.palette.grey[200]
                        : theme.palette.grey[700],
                  }}
                />
                <CardContent>
                  <div className="flex flex-col items-center">
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "baseline",
                        mb: 2,
                      }}
                    >
                      <div className="flex flex-col items-center">
                        <h2 className="text-bluish text-[25px] font-semibold">
                          Ksh{tier.price}
                        </h2>
                        <h2 className="text-bluish">{tier.time}</h2>
                      </div>
                    </Box>
                    <ul>
                      {tier.description.map((line) => (
                        <div
                          key={line}
                          className="text-bluish  justify-between flex"
                        >
                          <div className="space-x-1  flex items-center">
                            <Image
                              src="/icon-bullet-pointer.svg"
                              width={20}
                              height={20}
                              alt="image"
                              className="w-[12px]"
                            />
                            <h4>{line}</h4>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </CardContent>
                <CardActions>
                  <Button
                    fullWidth
                    variant={tier.buttonVariant}
                    className="text-green-500 custom-border2"
                    color="success"
                    onClick={() => {
                      wifipackage({
                        price: tier.price,
                        bandwidth: tier.bandwidth,
                        speed: null,
                        validity: tier.time,
                      });
                    }}
                  >
                    {tier.buttonText}
                  </Button>
                </CardActions>
              </div>
            </Grid>
          ))}
        </Grid>
      </Container>
    </div>
  );
};
export default MemberPricing;
