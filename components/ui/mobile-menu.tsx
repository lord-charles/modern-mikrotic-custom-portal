'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import toast from "react-hot-toast";
import NestedModalBalance from "../balanceModal";
import NestedModalBalance2 from "../fixVoucherModal";

export default function MobileMenu() {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false);

  const trigger = useRef<HTMLButtonElement>(null);
  const mobileNav = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [open2, setOpen2] = useState(false);

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target as Node) ||
        trigger.current.contains(target as Node)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <div className="md:hidden">
      <NestedModalBalance open={open} setOpen={setOpen} />
      <NestedModalBalance2 open={open2} setOpen={setOpen2} />

      {/* Hamburger button */}
      <button
        ref={trigger}
        className={`hamburger ${mobileNavOpen && "active"}`}
        aria-controls="mobile-nav"
        aria-expanded={mobileNavOpen}
        onClick={() => setMobileNavOpen(!mobileNavOpen)}
      >
        <span className="sr-only">Menu</span>
        <svg
          className="w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="4" width="24" height="2" rx="1" />
          <rect y="11" width="24" height="2" rx="1" />
          <rect y="18" width="24" height="2" rx="1" />
        </svg>
      </button>
      {/*Mobile navigation */}
      <nav
        id="mobile-nav"
        ref={mobileNav}
        className="absolute top-full z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out"
        style={
          mobileNavOpen
            ? { maxHeight: mobileNav.current?.scrollHeight, opacity: 1 }
            : { maxHeight: 0, opacity: 0.8 }
        }
      >
        <ul className="bg-gray-800 px-4 py-2 flex flex-col items-center">
          <li>
            <Link href="/" className="btn-sm text-white ml-3">
              Home
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="btn-sm text-white ml-3"
              onClick={() => {
                setOpen(!open), setMobileNavOpen(!mobileNavOpen);
              }}
            >
              Balance
            </Link>
          </li>
          <li>
            <div
              className="btn-sm text-white ml-3 cursor-pointer"
              onClick={() => {
                setOpen2(!open);
              }}
            >
              Fix Voucher
            </div>
          </li>
          <li>
            <Link
              href="/"
              className="btn-sm text-white ml-3"
              onClick={() => toast.success("Coming soon")}
            >
              News
            </Link>
          </li>

          <li>
            <Link
              href="https://www.charlesmwaniki.com/"
              className="btn-sm text-white"
            >
              About
            </Link>
          </li>
          <li>
            <Link
              href="/"
              className="btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3"
              onClick={() =>
                toast.success("Chat admin via chatbot in  or call 0740315545")
              }
            >
              Contact
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
