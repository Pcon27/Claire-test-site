"use client";

import React from "react";
import Card from "../flexBox/Card";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const Modal = ({ open, onClose, children }: ModalProps) => {
  if (!open) return null;

  return (
    <div
      // Only close when the backdrop itself is clicked, not the modal content
      onClick={(e) => e.target === e.currentTarget && onClose()}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.85)",
        // 2rem gutter between the modal and the viewport edges
        padding: "2rem",
        boxSizing: "border-box",
      }}
    >
      <div
        // Column that's capped at the padded viewport size; the close button
        // stays in flow above the card so it never gets pushed off-screen
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 8,
          maxWidth: "100%",
          maxHeight: "100%",
          minHeight: 0,
        }}
      >
        {/* Close button sits just above the modal's top-right corner */}
        <Card
          onClick={onClose}
          style={{
            alignSelf: "flex-end",
            flexShrink: 0,
            width: 40,
            height: 40,
          }}
          hoverBlur
        >
          ×
        </Card>
        <Card
          size={60}
          backgroundColor={2}
          style={{
            // Scroll inside the modal when content is taller/wider than the space
            maxWidth: "100%",
            maxHeight: "100%",
            minHeight: 0,
            overflow: "auto",
            boxSizing: "border-box",
          }}
        >
          {children}
        </Card>
      </div>
    </div>
  );
};

export default Modal;
