/** @format */
"use client";
import Link from "next/link";
import CustomButton from "@/ui/custom/button";
import Image from "next/image";
import { useState } from "react";
import logo from "../../../public/logo.png";
import { useModal } from "@/context/modalcontext";
import { CircleQuestionMark } from "lucide-react";
import { Facebook, Instagram } from "lucide-react";

const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { handleOpenModal, handleOpenSupportModal } = useModal();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="w-full py-3 text-black bg-kindred-primary relative">
      <nav className="mx-auto px-4 sm:px-6git  lg:px-20 flex justify-between items-center">
        <Image src={logo} alt="logo" width={90} height={30} />

        <div className="hidden lg:block">
          <div className="flex justify-center items-center gap-6">
            <button
              onClick={handleOpenSupportModal}
              className="mx-auto cursor-pointer"
            >
              <div className="flex justify-center">
                <CircleQuestionMark className="" />
              </div>
              <p className="text-[14px] font-light">Support</p>
            </button>
            <div className="">
              <CustomButton onClick={handleOpenModal}>
                Connect Wallet
              </CustomButton>
            </div>
          </div>
        </div>

        <button
          onClick={toggleMenu}
          className="lg:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 z-50 relative"
          aria-label="Toggle menu"
        >
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
              isMenuOpen ? "rotate-45 translate-y-2" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
              isMenuOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-6 h-0.5 bg-black transition-all duration-300 ease-in-out ${
              isMenuOpen ? "-rotate-45 -translate-y-2" : ""
            }`}
          />
        </button>
      </nav>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
        onClick={closeMenu}
      />

      <div
        className={`fixed top-0 left-0 right-0 w-full bg-white z-50 lg:hidden transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{ height: "100vh", maxHeight: "100dvh" }}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-6 border-b border-gray-200">
            <Image src={logo} alt="logo" width={60} height={60} />
            <button
              onClick={closeMenu}
              className="text-gray-600 hover:text-gray-900 transition-colors duration-200"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center px-8 space-y-8">
            <Link
              href="#"
              onClick={closeMenu}
              className="text-lg font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              href="#"
              onClick={closeMenu}
              className="text-lg font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200"
            >
              Terms Of Use
            </Link>
            <button
              onClick={() => {
                handleOpenSupportModal();
                closeMenu();
              }}
              className="text-lg font-normal text-gray-900 hover:text-gray-600 transition-colors duration-200"
            >
              Support
            </button>

            <div className="w-full max-w-xs pt-4">
              <CustomButton
                onClick={() => {
                  handleOpenModal();
                  closeMenu();
                }}
                className="w-full"
              >
                Connect Wallet
              </CustomButton>
            </div>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="#"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="#"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </Link>
              <Link
                href="#"
                className="text-gray-900 hover:text-gray-600 transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
