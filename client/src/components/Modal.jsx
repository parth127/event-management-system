"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/Dialog";

export default function Modal({ isOpen, onClose, title, children }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
}
