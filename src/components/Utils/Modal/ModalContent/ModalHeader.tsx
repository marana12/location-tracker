interface ModalHeaderProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
}

export default function ModalHeader({
  title,
  onClose,
  children,
}: ModalHeaderProps) {
  return (
    <div className="ip-modal-header">
      <h4 className="ip-modal-header-title">{title}</h4>

      <button onClick={onClose} className="ip-btn ip-header-close-btn"></button>
    </div>
  );
}
