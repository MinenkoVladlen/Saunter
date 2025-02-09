import React from "react";
import { Route } from "../../../types";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Directions } from "@mui/icons-material";
import TitleRoute from "./TitleRoute";
import RouteShortDescription from "./RouteShortDescription";

interface RouteItemProps {
  route: Route;
  onClick: (route: Route) => void;
  isSelected: boolean;
}

const RouteItem: React.FC<RouteItemProps> = ({
  route,
  onClick,
  isSelected,
}) => {
  const handleClick = () => {
    onClick(route);
  };

  return (
    <ListItemButton onClick={handleClick} selected={isSelected}>
      <ListItemIcon>
        <Directions />
      </ListItemIcon>
      <ListItemText
      disableTypography
        primary={ <TitleRoute route={route} /> }
        secondary={ <RouteShortDescription description={route.shortDescription} />}
      />
    </ListItemButton>
  );
};

export default RouteItem;
