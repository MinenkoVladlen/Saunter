import { Star } from "@mui/icons-material";
import { Grid2, Typography } from "@mui/material";
import { Route } from "../../../types";

const TitleRoute: React.FC<{ route: Route }> = ({ route }) => {
  return (
    <Grid2 container alignItems="center">
      {route.isFavorite && <Star />}
      <Typography variant="h6">{route.title}</Typography>
    </Grid2>
  );
};

export default TitleRoute;
