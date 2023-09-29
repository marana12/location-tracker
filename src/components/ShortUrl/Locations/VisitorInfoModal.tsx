import ModalConntent from "../../Utils/Modal/ModalContent/ModalContent";
import ModalHeader from "../../Utils/Modal/ModalContent/ModalHeader";
import ModalBody from "../../Utils/Modal/ModalContent/ModalBody";
import ModalMap from "./ModalMap/ModalMap";
import Modal from "../../Utils/Modal/Modal";
import { VisitorLocation } from "../../../models/visitorInfo";

interface VisitorInfoModalProps {
  showModal: boolean;
  visitorLocation: VisitorLocation | undefined;
  handleShowModal: () => void;
}
function VisitorInfoModal({
  showModal,
  handleShowModal,
  visitorLocation,
}: VisitorInfoModalProps) {
  return (
    <Modal show={showModal} onClose={handleShowModal}>
      <ModalConntent>
        <ModalHeader title={"Extended"} onClose={handleShowModal} />
        <ModalBody>
          {showModal && <ModalMap location={visitorLocation} />}
        </ModalBody>
      </ModalConntent>
    </Modal>
  );
}

export default VisitorInfoModal;
