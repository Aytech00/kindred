/** @format */

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/shared/ui/dialog";
import { ConnectPanel } from "./walletpannel";

type DialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function WalletConnectDialog({
  open,
  onOpenChange,
}: DialogProps) {
  const handleSuccess = () => {
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl" showCloseButton={false}>
        <DialogHeader className="mb-5">
          <DialogTitle>Connect your Cardano wallet</DialogTitle>
          {/* <DialogDescription>
            Select a CIP-30 compatible wallet to continue.
          </DialogDescription> */}
        </DialogHeader>

        <ConnectPanel onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
}
