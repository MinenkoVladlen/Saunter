import { Divider, Grid2, useMediaQuery } from "@mui/material";
import { useState } from "react";
import ContanerListRoute from "./routeList/ContanerListRoute";
import ContainerRouteDetail from "./ContainerRouteDetail";

const RoutesLayout: React.FC = () => {
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);
  const isLargeScreen = useMediaQuery("(min-width: 960px)");

  return (
    <Grid2
      container
      size={12}
      spacing={2}
      sx={{ marginTop: 2, minHeight: "80vh" }}
    >
      {isLargeScreen ?<>
        <ContanerListRoute
        setSelectedRouteId={setSelectedRouteId}
        selectedRouteId={selectedRouteId}
      />
      <Grid2 size={1} container justifyContent={"center"}>
        <Divider orientation="vertical" flexItem sx={{ height: "100%" }} />
      </Grid2>
      <ContainerRouteDetail
        setSelectedRouteId={setSelectedRouteId}
        selectedRouteId={selectedRouteId}
      />
      </>  : <>
      <ContainerRouteDetail
      setSelectedRouteId={setSelectedRouteId}
      selectedRouteId={selectedRouteId}
    />
     <ContanerListRoute
        setSelectedRouteId={setSelectedRouteId}
        selectedRouteId={selectedRouteId}
      />
      </> }
    </Grid2>
  );
};

export default RoutesLayout;
