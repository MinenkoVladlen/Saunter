import { useDispatch, useSelector } from "react-redux";
import { Route } from "../types";
import { Grid2, useMediaQuery } from "@mui/material";
import { removeRoute } from "../store/routesThunk";
import { AppDispatch } from "../store";
import RouteDetail from "./RouteDetail";

interface ContainerRouteDetailProps {
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
}

const ContainerRouteDetail: React.FC<ContainerRouteDetailProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const routes = useSelector((state: any) => state.routes.routes);
  const { selectedRouteId, setSelectedRouteId } = props;
  const isLargeScreen = useMediaQuery("(min-width: 960px)");

  const selectedRoute = routes.find(
    (route: Route) => route.id === selectedRouteId
  );

  const handleDelete = () => {
    if (selectedRouteId) {
      dispatch(removeRoute(selectedRouteId));
      setSelectedRouteId(null);
    }
  };

  return (
    <Grid2
      size={isLargeScreen ? 5 : 12}
      sx={{
        justifyContent: "center",
        maxHeight: "80vh",
        overflowY: "scroll",
      }}
    >
      <RouteDetail route={selectedRoute} onDelete={handleDelete} />
    </Grid2>
  );
};

export default ContainerRouteDetail;
