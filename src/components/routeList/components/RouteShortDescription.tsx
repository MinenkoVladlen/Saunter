import { Grid2, Typography } from "@mui/material";

const style = {
  display: "-webkit-box",
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
};

const RouteShortDescription: React.FC<{ description: string }> = ({
  description,
}) => {
  return (
    <Grid2 sx={{style}} >
      <Typography variant="body2">{description}</Typography>
    </Grid2>
  );
};

export default RouteShortDescription;
