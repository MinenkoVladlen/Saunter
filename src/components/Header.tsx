import { Directions } from "@mui/icons-material";
import { Button, Grid2, Typography } from "@mui/material";

interface HeaderProps {
  setIsOpenModal: (isOpenModal: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ setIsOpenModal }) => {
  const handleOpenModal = () => setIsOpenModal(true);
  return (
    <Grid2 container sx={{ justifyContent: "space-between", p: 3 }}>
      <Grid2 container sx={{ alignItems: "center" }}>
        <Directions fontSize="large" />
        <Typography variant="h4">Saunter</Typography>
      </Grid2>
      <Button variant="contained" onClick={handleOpenModal}>
        Add path
      </Button>
    </Grid2>
  );
};

export default Header;
