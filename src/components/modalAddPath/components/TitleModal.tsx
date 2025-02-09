import { Close } from "@mui/icons-material";
import { Grid2, IconButton, Typography } from "@mui/material";

interface TitleModalProps {
  handleClose: () => void;
}

const TitleModal: React.FC<TitleModalProps> = ({ handleClose }) => {
  return (
    <Grid2
      container
      sx={{ justifyContent: "space-between", alignItems: "center", mb: 2 }}
    >
      <Typography variant="h5">Add new path</Typography>
      <IconButton onClick={handleClose}>
        <Close />
      </IconButton>
    </Grid2>
  );
};

export default TitleModal;
