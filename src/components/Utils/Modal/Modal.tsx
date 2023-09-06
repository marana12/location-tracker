import { useCallback, useEffect, useState } from "react";
import "../../../styles/common/modal/modal.scss";

interface ModalProps {
  show: boolean;
  children: React.ReactNode;
}

export default function Modal({ show, children }: ModalProps) {
  const [isShow, setIsShow] = useState(false);

  const closeOnEscapeKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if ((e.charCode || e.keyCode) === 27) {
        setIsShow(false);
      }
    },
    [show]
  );

  const onClose = useCallback(() => {
    setIsShow(false);
  }, [show]);

  useEffect(() => {
    document.body.style.overflow = "hidden";

    document.body.addEventListener("keydown", closeOnEscapeKeyDown);
    setIsShow(show);

    return () => {
      document.body.style.overflow = "auto";

      document.body.removeEventListener("keydown", closeOnEscapeKeyDown);
    };
  }, [closeOnEscapeKeyDown, show]);

  return (
    <div className={`ip-modal ${isShow ? "show" : ""}`} onClick={onClose}>
      {children}
    </div>
  );
}
