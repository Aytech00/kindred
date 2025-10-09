/** @format */
"use client";
import { createContext, useContext, useState } from "react";

const modalContext = createContext<any>(null);

export default function ModalContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isSupportModalOpen, setSupportModalOpen] = useState(false);

  const handleOpenModal = () => {

    setModalOpen(true);
  };
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleOpenSupportModal = () => {

    setSupportModalOpen(true);
  };
  const handleCloseSupportModal = () => {
    setSupportModalOpen(false);
  };

  return (
    <modalContext.Provider
      value={{
        handleOpenModal,
        handleCloseModal,
        isModalOpen,
        isSupportModalOpen,
        handleCloseSupportModal,
handleOpenSupportModal      }}
    >
      {children}
    </modalContext.Provider>
  );
}

export const useModal = () => {
  const contxt = useContext(modalContext);

  if (!contxt) {
    throw new Error("useModalContext must be used within the modal context");
  }

  return contxt;
};
