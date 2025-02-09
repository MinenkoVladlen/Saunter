import { Route } from "../types";
import { Button, Grid2, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store";
import { toggleFavorite } from "../store/routesThunk";
import Map from "./Map";
import NoData from "./NoData";

interface RouteDetailProps {
  route: Route | null;
  onDelete: () => void;
}

const RouteDetail: React.FC<RouteDetailProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { route, onDelete } = props;

  if (!route) {
    return <NoData />;
  }

  const onAddToFavorites = () => { 
    if (route.id) {
      dispatch(toggleFavorite({ id: route.id, isFavorite: !route.isFavorite }));
    }
  };

  return (
    <Grid2>
      <Grid2 container sx={{ justifyContent: "space-between" }}>
        <Typography variant="h6">{route.title}</Typography>
        <Typography variant="h6">
          {(route.distance / 1000).toFixed(2)} km
        </Typography>
      </Grid2>
      <Grid2>
        <Typography variant="body1">{route.fullDescription}</Typography>
        <Map
          markers={route.markers}
          onMapClick={() => {}}
          onMarkerClick={() => {}}
        />
      </Grid2>
      <Grid2
        container
        sx={{ flexDirection: "column", alignItems: "flex-end", mt: 1 }}
      >
        <Button onClick={onAddToFavorites}>
          {route.isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </Button>
        <Button onClick={onDelete} color="error">
          Delete
        </Button>
      </Grid2>
    </Grid2>
  );
};

export default RouteDetail;
