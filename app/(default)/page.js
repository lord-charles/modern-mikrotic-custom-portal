"use client";

import Hero from "@/components/hero";
import Features from "@/components/features";
import Newsletter from "@/components/newsletter";
import Zigzag from "@/components/zigzag";
import Testimonials from "@/components/testimonials";
import Packages from "@/components/packages/packages";
import { Toaster } from "react-hot-toast";
import AlertDialogSlide from "../../components/popDialog";
import { useEffect, useState } from "react";
import { runFireworks } from "@/components/Success";

export default function Home() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    runFireworks();
    setTimeout(() => setOpen(true), 2000);
  }, []);
  return (
    <>
      <Toaster />
      <AlertDialogSlide open={open} setOpen={setOpen} />
      <Hero />
      <Packages />
      <Testimonials />
      <Newsletter />
    </>
  );
}
