import { Grid2, useMediaQuery } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Route } from "../../types";
import SearchBar from "../SearchBar";
import RouteList from "./components/RouteList";
import Loader from "../Loader";

interface ContainerListRouteProps {
  setSelectedRouteId: (id: string) => void;
  selectedRouteId: string | null;
}

const ContanerListRoute: React.FC<ContainerListRouteProps> = ({
  setSelectedRouteId,
  selectedRouteId,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const { routes, loading, error } = useSelector((state: any) => state.routes);
  const isLargeScreen = useMediaQuery("(min-width: 960px)");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

  const filteredRoutes = routes?.filter(
    (route: Route) =>
      route.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      route.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRouteClick = (route: Route) => {
    if (route.id) {
      setSelectedRouteId(route.id);
    }
  };

  if (loading) return <Loader width={5} />;
  if (error) return <Grid2 size={5}>Error: {error}</Grid2>;

  return (
    <Grid2 size={isLargeScreen ? 5 : 12} sx={{ justifyContent: "center", overflowX: "scroll" }}>
      <SearchBar onSearch={handleSearch} />
      <RouteList
        routes={filteredRoutes}
        onRouteClick={handleRouteClick}
        selectedRouteId={selectedRouteId}
      />
    </Grid2>
  );
};

export default ContanerListRoute;
