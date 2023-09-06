interface ModalConntentProps {
  children: React.ReactNode;
}
export default function ModalConntent({ children }: ModalConntentProps) {
  return (
    <div className="ip-modal-content" onClick={(e) => e.stopPropagation()}>
      {children}
    </div>
  );
}
