/** @format */
"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/shared/ui/dialog";

import CustomButton from "../../../shared/ui/custom/button";

type ComingsoonDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};
export default function ComingSoonDialog({ open, onOpenChange }: ComingsoonDialogProps ) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">
            Hey Kindred!
          </DialogTitle>
          <DialogDescription className="text-center text-base pt-4">
            Coming Soon...
          </DialogDescription>
        </DialogHeader>

        <div className="flex justify-center py-6">
          <div className="w-20 h-20 rounded-full  bg-gray-200 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-gray-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>

        <div className="flex justify-center">
          <CustomButton className="w-full sm:w-auto">
            Got it!
          </CustomButton>
        </div>
      </DialogContent>
    </Dialog>
  );
}
