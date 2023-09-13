import { useCallback, useEffect, useState } from "react";
import "../../../styles/common/modal/modal.scss";

interface ModalProps {
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ show, onClose, children }: ModalProps) {
  const [isShow, setIsShow] = useState(show);

  const closeOnEscapeKeyDown = (e: KeyboardEvent) => {
    if ((e.charCode || e.keyCode) === 27) {
      onClose();
    }
  };

  useEffect(() => {
    setIsShow(show);
  }, [show]);

  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }

    document.body.addEventListener("keydown", closeOnEscapeKeyDown);

    return () => {
      document.body.style.overflow = "auto";

      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [show]);

  return (
    <div className={`ip-modal ${isShow ? "show" : ""}`} onClick={onClose}>
      {children}
    </div>
  );
}
