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
export default function WalletConnectDialog({ open, onOpenChange }: DialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <DialogHeader>
          <DialogTitle>Connect your Cardano wallet</DialogTitle>
          <DialogDescription>
            Select a CIP-30 compatible wallet to continue.
          </DialogDescription>
        </DialogHeader>

        <ConnectPanel />
      </DialogContent>
    </Dialog>
  );
}
