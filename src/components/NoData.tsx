import { Directions } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";

const NoData: React.FC = () => {
  return (
    <Grid2
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      <Directions fontSize="large" />
      <Typography variant="body1">Select path</Typography>
    </Grid2>
  );
};

export default NoData;
