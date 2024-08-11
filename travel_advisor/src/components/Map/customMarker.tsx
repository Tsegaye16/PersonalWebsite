// CustomMarker.tsx
import React from "react";
import { Paper, Typography } from "@material-ui/core";
import LocationOnOutlinedIcon from "@material-ui/icons/LocationOnOutlined";
import { Place } from "../PlaceDetails/PlaceDetail"; // Ensure this path is correct
import useStyles from "./styles";
import { Rating } from "@mui/material";
//import mapStyles from "./mapStyles";

interface CustomMarkerProps {
  place: Place;
  isDesktop: boolean;
  lat: number;
  lng: number;
}

const CustomMarker: React.FC<CustomMarkerProps> = ({ place, isDesktop }) => {
  const classes = useStyles();

  return (
    <div className={classes.markerContainer}>
      {!isDesktop ? (
        <LocationOnOutlinedIcon color="primary" fontSize="large" />
      ) : (
        <Paper elevation={3} className={classes.paper}>
          <Typography
            variant="subtitle2"
            gutterBottom
            className={classes.mapContainer}
          >
            {place.name}
          </Typography>
          <img
            className={classes.pointer}
            src={
              place.photo && place.photo.images.large.url
                ? place.photo.images.large.url
                : "sample text"
            }
            alt={place.name}
          />
          <Rating size="small" value={Number(place.rating)} readOnly />
        </Paper>
      )}
    </div>
  );
};

export default CustomMarker;
