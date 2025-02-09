import { useState, useCallback, useEffect } from "react";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { validateForm } from "../../../utils/validateForm";
import { createRoute } from "../../../store/routesThunk";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store";
import { Route } from "../../../types";
import Map from "../../Map";
import MapIcon from "@mui/icons-material/Map";

const initialFormState = {
  title: "",
  shortDescription: "",
  fullDescription: "",
  isFavorite: false,
  markers: [],
  distance: 0,
  errors: {
    titleError: "",
    shortDescriptionError: "",
    fullDescriptionError: "",
    markersError: "",
  },
};

const ModalForm: React.FC<{ handleClose: () => void }> = ({ handleClose }) => {
  const [formState, setFormState] = useState(initialFormState);
  const [markers, setMarkers] = useState<google.maps.LatLngLiteral[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  const { title, shortDescription, fullDescription, errors } = formState;

  const onMapClick = useCallback((event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const latLng = event.latLng;
      setMarkers((prev) => [
        ...prev,
        { lat: latLng.lat(), lng: latLng.lng() },
      ]);
    }
  }, []);

  const onMarkerClick = useCallback((index: number) => {
    setMarkers((prev) => prev.filter((_, i) => i !== index));
  }, []);

  useEffect(() => {
    if (markers.length < 2) return;

    const service = new google.maps.DirectionsService();
    const waypoints = markers
      .slice(1, -1)
      .map((point) => ({ location: point, stopover: true }));

    service.route(
      {
        origin: markers[0],
        destination: markers[markers.length - 1],
        waypoints,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK && result) {
          const distance = result.routes[0].legs.reduce(
            (sum, leg) => sum + leg.distance!.value,
            0
          );
          setFormState((prev: any) => ({ ...prev, distance, markers }));
        }
      }
    );
  }, [markers]);

  const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({
      ...formState,
      title: e.target.value,
      errors: { ...errors, titleError: "" },
    });
  };

  const handleChangeShortDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      shortDescription: e.target.value,
      errors: { ...errors, shortDescriptionError: "" },
    });
  };

  const handleChangeFullDescription = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormState({
      ...formState,
      fullDescription: e.target.value,
      errors: { ...errors, fullDescriptionError: "" },
    });
  };

  const handleClickAdd = async () => {
    const { isValid, newFormState } = validateForm(formState, markers);
    setFormState(newFormState);

    if (isValid) {
      const route: Route = {
        title,
        shortDescription,
        fullDescription,
        distance: formState.distance,
        isFavorite: false,
        markers
      };
      dispatch(createRoute(route));
      setFormState(initialFormState);
      setMarkers([]);
      handleClose();
    }
  };

  return (
    <Grid2 container size={12} spacing={2}>
      <Grid2 container size={6} sx={{ justifyContent: "center" }}>
        <TextField
          label="Title"
          fullWidth
          value={title}
          onChange={handleChangeTitle}
          helperText={errors.titleError}
          error={!!errors.titleError}
        />
        <TextField
          label="Short description"
          fullWidth
          value={shortDescription}
          onChange={handleChangeShortDescription}
          helperText={errors.shortDescriptionError}
          error={!!errors.shortDescriptionError}
        />
        <TextField
          label="Full description"
          fullWidth
          multiline
          value={fullDescription}
          onChange={handleChangeFullDescription}
          rows={3}
          helperText={errors.fullDescriptionError}
          error={!!errors.fullDescriptionError}
        />
        <Grid2 size={12} sx={{ justifyContent: "center" }} container>
          <MapIcon />
          <Typography variant="body1">
            Length{" "}
            {formState.distance ? (formState.distance / 1000).toFixed(2) : 0}km
          </Typography>
        </Grid2>
        <Grid2 size={12} container sx={{ justifyContent: "center" }}>
          {errors.markersError && (
            <Typography color="error">{errors.markersError}</Typography>
          )}
        </Grid2>
        <Grid2>
          <Button variant="contained" onClick={handleClickAdd}>
            Add path
          </Button>
        </Grid2>
      </Grid2>
      <Grid2 size={6}>
        <Map
          markers={markers}
          onMapClick={onMapClick}
          onMarkerClick={onMarkerClick}
        />
      </Grid2>
    </Grid2>
  );
};

export default ModalForm;
