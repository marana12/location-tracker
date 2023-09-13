import ModalConntent from "../../Utils/Modal/ModalContent/ModalContent";
import ModalHeader from "../../Utils/Modal/ModalContent/ModalHeader";
import ModalBody from "../../Utils/Modal/ModalContent/ModalBody";
import ModalMap from "./ModalMap/ModalMap";
import Modal from "../../Utils/Modal/Modal";
interface LocationModalProps {
  showModal: boolean;
  handleShowModal: () => void;
  latNum: number;
  lonNum: number;
}
function LocationModal({
  showModal,
  handleShowModal,
  latNum,
  lonNum,
}: LocationModalProps) {
  return (
    <Modal show={showModal} onClose={handleShowModal}>
      <ModalConntent>
        <ModalHeader title={"Extended"} onClose={handleShowModal} />
        <ModalBody>
          {showModal && <ModalMap latNum={latNum} lonNum={lonNum} />}
        </ModalBody>
      </ModalConntent>
    </Modal>
  );
}

export default LocationModal;
