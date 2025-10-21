/** @format */

"use client";

import { useModal } from "@/context/modalcontext";
import ComingSoonDialog from "../../../features/comingsoon/components/comingsoondialog";
import SupportDialog from "@/features/contact/components/supportdialog";
import WalletConnectDialog from "@/features/walletconnect/components/connectdialog";

export default function GlobalModals() {
  const { isOpen, close, openId } = useModal();

    console.log(openId);
    
  return (
    <>
      <ComingSoonDialog
        open={isOpen("comingsoon")}
        onOpenChange={(o) => (o ? null : close())}
      />
      <SupportDialog
        open={isOpen("support")}
        onOpenChange={(o) => (o ? null : close())}
      />

      <WalletConnectDialog
        open={isOpen("wallet")}
        onOpenChange={(o) => (o ? null : close())}
      />
    </>
  );
}
