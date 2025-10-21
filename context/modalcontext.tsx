/** @format */
"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  ReactNode,
  useCallback,
} from "react";

export type ModalId = "wallet" | "support" | "comingsoon" | null;

type ModalContextType = {
  openId: ModalId;
  open: (id: Exclude<ModalId, null>) => void;
  close: () => void;
  isOpen: (id: Exclude<ModalId, null>) => boolean;
};

const ModalContext = createContext<ModalContextType | null>(null);

export default function ModalContextProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [openId, setOpenId] = useState<ModalId>(null);

  const open = useCallback((id: Exclude<ModalId, null>) => setOpenId(id), []);
  const close = useCallback(() => setOpenId(null), []);
  const isOpen = useCallback(
    (id: Exclude<ModalId, null>) => openId === id,
    [openId]
  );

  const value = useMemo<ModalContextType>(
    () => ({ openId, open, close, isOpen }),
    [openId, open, close, isOpen]
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx)
    throw new Error("useModal must be used within ModalContextProvider");
  return ctx;
};
