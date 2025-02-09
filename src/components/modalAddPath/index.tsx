import { Box, Modal } from "@mui/material";
import TitleModal from "./components/TitleModal";
import Form from "./components/Form";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface ModalAddPathProps {
  isOpenModal: boolean;
  setIsOpenModal: (isOpenModal: boolean) => void;
}

const ModalAddPath: React.FC<ModalAddPathProps> = (props) => {
  const { isOpenModal, setIsOpenModal } = props;
  const handleClose = () => setIsOpenModal(false);

  return (
    <Modal
      open={isOpenModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <TitleModal handleClose={handleClose} />
        <Form handleClose={handleClose} />
      </Box>
    </Modal>
  );
};

export default ModalAddPath;
