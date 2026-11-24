"use client";

import React, { useEffect } from "react";
import Card from "../flexBox/Card";
import Text from "../text/Text";
import modalStyles from "./modal.module.scss";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  backgroundColor?: 1 | 2 | 3 | 4 | 5;
  children?: React.ReactNode;
};

const Modal = ({
  open,
  onClose,
  title,
  backgroundColor = 4,
  children,
}: ModalProps) => {
  // Close on Escape and lock page scroll while the modal is open
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className={modalStyles.backdrop}
      // Only close when the backdrop itself is clicked, not the modal content
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={modalStyles.dialog}
      >
        <Card
          customClass={modalStyles.panel}
          backgroundColor={backgroundColor}
          borderColor={3}
          radius={0}
          size={0}
          flexDirection="column"
          alignItems="stretch"
        >
          {/* Header bar stays put while the body scrolls */}
          <Card
            customClass={modalStyles.header}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            width="fill"
            size={40}
            radius={0}
            gap={20}
          >
            <Text color={3} size={20} weight={600}>
              {title}
            </Text>
            <Card
              customClass={modalStyles.close}
              onClick={onClose}
              backgroundColor={backgroundColor}
              borderColor={3}
              dropShadow={3}
              flexDirection="row"
              alignItems="center"
              size={20}
              radius={0}
              gap={10}
            >
              <Text color={3} size={15} weight={600}>
                Close ✕
              </Text>
            </Card>
          </Card>
          <div className={modalStyles.body}>{children}</div>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
