'use client'

import { useEffect } from 'react'

import AOS from 'aos'
import 'aos/dist/aos.css'

import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import IntercomSettings from "../../components/Tindio";
import ScrollToTop from "../../components/scroll-to-top/index";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  return (
    <>
      <main className="grow">
        <IntercomSettings user="charles" />
        <ScrollToTop />

        <PageIllustration />

        {children}
      </main>

      <Footer />
    </>
  );
}
