/** @format */
"use client"
import Image from "next/image";
import Link from "next/link";
import logo from "../../../public/logo.png"; 
import CustomButton from "@/ui/custom/button";
import { useModal } from "@/context/modalcontext";

const year = new Date().getFullYear();

export default function Footer() {

    const { handleOpenModal } = useModal()
  
  return (
    <>
     

      <footer className="bg-kindred-primary text-neutral-900">
        <div className="mx-auto max-w-7xl px-6">
          <hr className="border-t border-neutral-300/70" />

          <div className="flex flex-col items-center gap-6 py-6 md:flex-row justify-center">
           

            <nav aria-label="Footer">
              <ul className="flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-sm text-neutral-700">
                <li>
                  <Link href="/privacy" className="hover:underline">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link href="/terms" className="hover:underline">
                    Terms of Service
                  </Link>
                </li>
                <li className="text-neutral-500">©{year}, Kindred People</li>
              </ul>
            </nav>

            {/* Right: social icons */}
            <div className="flex items-center gap-5">
              <Link
                aria-label="X (Twitter)"
                href="https://x.com"
                target="_blank"
                className="hover:opacity-80"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-neutral-900"
                >
                  <path d="M18.244 3H21l-6.53 7.46L22 21h-5.657l-4.41-5.36L6.7 21H3l6.99-7.99L2 3h5.742l4.026 4.91L18.244 3Zm-1.98 16.2h1.89L7.84 4.68H5.83l10.434 14.52Z" />
                </svg>
              </Link>
              <Link
                aria-label="Instagram"
                href="https://instagram.com"
                target="_blank"
                className="hover:opacity-80"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-neutral-900"
                >
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 3.5A5.5 5.5 0 1 1 6.5 13 5.5 5.5 0 0 1 12 7.5Zm0 2A3.5 3.5 0 1 0 15.5 13 3.5 3.5 0 0 0 12 9.5ZM18 6.2a1 1 0 1 1-1 1 1 1 0 0 1 1-1Z" />
                </svg>
              </Link>
              <Link
                aria-label="Facebook"
                href="https://facebook.com"
                target="_blank"
                className="hover:opacity-80"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="text-neutral-900"
                >
                  <path d="M13.5 21v-7h2.36l.35-2.72H13.5V9.06c0-.79.22-1.33 1.36-1.33h1.45V5.23A18.7 18.7 0 0 0 14.1 5c-2.1 0-3.55 1.28-3.55 3.62v2.66H8v2.72h2.55V21h2.95Z" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
