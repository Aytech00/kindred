/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";
import { ConnectPanel } from "./walletpannel";
import { useEffect } from "react";
import { useWalletContext } from "@/context/walletcontext";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WalletConnectDialog({
  open,
  onOpenChange,
}: DialogProps) {


  const { connected } = useWalletContext()
  
 useEffect(() => {
   if (connected && open) {
     onOpenChange(false);
   }
 }, [connected, open, onOpenChange]);

 // Don't render this wallet connect dialog at all when user is connected
 if (connected) {
   return null;
 }

  const handleSuccess = () => onOpenChange(false);

 
  return (
    <Dialog open={open}  onOpenChange={onOpenChange}>
      <DialogContent
        className="
          w-[300px]
          fixed left-10 sm:right-12 sm:left-auto
          rounded-t-none rounded-b-4xl
         top-1/3
          sm:top-1/2 sm:-translate-y-[340px] translate-x-0
     
          h-[360px] sm:h-[350px]
          p-0 overflow-hidden
          flex flex-col
        "
      >
        <DialogHeader className="px-4 py-3 shrink-0">
          <DialogTitle>Connect wallet</DialogTitle>
        </DialogHeader>

        <div className="min-h-0 flex-1 overflow-y-auto px-4 pb-4">
          <ConnectPanel onSuccess={handleSuccess} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
