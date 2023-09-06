interface ModalFooterProps {
  onClose: () => void;
  onSave?: () => void;
  saveTitle?: string;
}

export default function ModalFooter({
  onClose,
  onSave,
  saveTitle = "Save",
}: ModalFooterProps) {
  return (
    <div className="ip-modal-footer">
      <button className="ip-btn ip-btn--secondary" onClick={onClose}>
        Close
      </button>

      {onSave && (
        <button className="ip-btn ip-btn--primary" onClick={onSave}>
          {saveTitle}
        </button>
      )}
    </div>
  );
}
