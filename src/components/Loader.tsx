import { Grid2, LinearProgress } from "@mui/material";

const Loader: React.FC<{ width: number }> = ({ width }) => {
  return (
    <Grid2 size={width}>
      <LinearProgress />
    </Grid2>
  );
};

export default Loader;
