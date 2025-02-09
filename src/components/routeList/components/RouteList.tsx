import React from "react";
import { List } from "@mui/material";
import { Route } from "../../../types";
import RouteItem from "./RouteItem";

interface RouteListProps {
  routes: Route[];
  onRouteClick: (route: Route) => void;
  selectedRouteId: string | null;
}

const RouteList: React.FC<RouteListProps> = ({
  routes,
  onRouteClick,
  selectedRouteId,
}) => {
  return (
    <List sx={{ maxHeight: "80vh", overflowY: "scroll" }}>
      {routes.map((route) => (
        <RouteItem
          key={route.id}
          route={route}
          onClick={onRouteClick}
          isSelected={selectedRouteId === route.id}
        />
      ))}
    </List>
  );
};

export default RouteList;
