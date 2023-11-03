'use client'
import React from "react";
import { useState } from "react";
import {
  Container,
  Wrapper,
  Title,
  Desc,
  CardContainer,
  ToggleButtonGroup,
  ToggleButton,
  Divider,
} from "./ProjectsStyle";
import { projects } from "../../utils/data";
import { Fade } from "react-awesome-reveal";
import HourlyPricing from './hourly'
import DailyPricing from "./Daily1";
import WeeklyPricing from "./weekly";
import MonthlyPricing from "./monthly";
import MemberPricing from "./member";

const Packages = ({ openModal, setOpenModal }) => {
  const [toggle, setToggle] = useState("Daily");
  return (
    <div id="projects">
      <Fade
        direction={"up"}
        delay={400}
        cascade
        damping={1e-1}
        triggerOnce={true}
      >
        <Container className="overflow-x-hidden">
          <Wrapper>
            <Title className="text-bluish">Packages</Title>

            <Desc className=" text-bluish">
              Unlocking Connectivity, One Package at a Time.
            </Desc>
            <ToggleButtonGroup className=" text-green-500">
              {toggle === "Hourly" ? (
                <ToggleButton
                  active
                  value="web app"
                  onClick={() => setToggle("Hourly")}
                  className="text-purple-600 font-bold"
                >
                  Hourly
                </ToggleButton>
              ) : (
                <ToggleButton
                  value="Hourly"
                  onClick={() => setToggle("Hourly")}
                >
                  Hourly
                </ToggleButton>
              )}
              <Divider className="bg-green-500" />
              {toggle === "Daily" ? (
                <ToggleButton
                  active
                  value="Daily"
                  onClick={() => setToggle("Daily")}
                  className="text-purple-600 font-bold"
                >
                  Daily
                </ToggleButton>
              ) : (
                <ToggleButton value="Daily" onClick={() => setToggle("Daily")}>
                  Daily
                </ToggleButton>
              )}
              <Divider className="bg-green-500" />
              {toggle === "Weekly" ? (
                <ToggleButton
                  active
                  value="Weekly"
                  onClick={() => setToggle("Weekly")}
                  className="text-purple-600 font-bold"
                >
                  Weekly
                </ToggleButton>
              ) : (
                <ToggleButton
                  value="Weekly"
                  onClick={() => setToggle("Weekly")}
                >
                  Weekly
                </ToggleButton>
              )}
              <Divider className="bg-green-500" />
              {toggle === "Monthly" ? (
                <ToggleButton
                  active
                  value="Monthly"
                  onClick={() => setToggle("Monthly")}
                  className="text-purple-600 font-bold"
                >
                  Monthly
                </ToggleButton>
              ) : (
                <ToggleButton
                  value="Monthly"
                  onClick={() => setToggle("Monthly")}
                >
                  Monthly
                </ToggleButton>
              )}
              <Divider className="bg-green-500" />

              {toggle === "Member" ? (
                <ToggleButton
                  active
                  value="Member"
                  onClick={() => setToggle("Member")}
                  className="text-purple-600 font-bold"
                >
                  Member
                </ToggleButton>
              ) : (
                <ToggleButton
                  value="Member"
                  onClick={() => setToggle("Member")}
                >
                  Member
                </ToggleButton>
              )}
            </ToggleButtonGroup>
            <CardContainer>
              {toggle === "Hourly" && (
                <>
                  <HourlyPricing />
                </>
              )}
              {toggle === "Daily" && (
                <>
                  <DailyPricing />
                </>
              )}
              {toggle === "Weekly" && (
                <>
                  <WeeklyPricing />
                </>
              )}
              {toggle === "Monthly" && (
                <>
                  <MonthlyPricing />
                </>
              )}
              {toggle === "Member" && (
                <>
                  <MemberPricing />
                </>
              )}
            </CardContainer>
          </Wrapper>
        </Container>
      </Fade>
    </div>
  );
};

export default Packages;
