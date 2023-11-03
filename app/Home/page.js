import Hero from "@/components/hero";
import Newsletter from "@/components/newsletter";
import Packages from "@/components/packages/packages";
import Testimonials from "@/components/testimonials";
import React from "react";
import { Toaster } from "react-hot-toast";

const Login = () => {
  return (
    <div>
      <Toaster />

      <Hero />
      <Packages />
      <Testimonials />
      <Newsletter />
    </div>
  );
};

export default Login;
