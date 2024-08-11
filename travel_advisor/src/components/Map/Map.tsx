import React, { useState } from "react";
import GoogleMapReact from "google-map-react";
import CustomMarker from "./customMarker"; // Ensure the path is correct
import useStyles from "./styles";
import { Place } from "../PlaceDetails/PlaceDetail";
import { useMediaQuery } from "@material-ui/core";

interface MapProps {
  setCoordinates: React.Dispatch<React.SetStateAction<{ lat: any; lng: any }>>;
  setBounds: React.Dispatch<React.SetStateAction<any>>;
  coordinates: { lat: any; lng: any };
  places: Place[];
  setChildClicked: any;
}

const Map: React.FC<MapProps> = ({
  setCoordinates,
  setBounds,
  coordinates,
  places,
  setChildClicked,
}) => {
  const classes = useStyles();
  const isDesktop = useMediaQuery("(max-width: 600px)");

  return (
    <div className={classes.mapContainer}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "YOUR_API_KEY" }}
        defaultCenter={coordinates}
        center={coordinates}
        defaultZoom={14}
        margin={[50, 50, 50, 50]}
        options={""}
        onChange={(event: any) => {
          setCoordinates({ lat: event.center.lat, lng: event.center.lng });
          if (event.marginBounds) {
            setBounds({
              ne: event.marginBounds.ne,
              sw: event.marginBounds.sw,
            });
          }
        }}
        onChildClick={(child: any) => {
          setChildClicked(child);
        }}
      >
        {places.map((place, index) => (
          <CustomMarker
            key={index}
            place={place}
            isDesktop={isDesktop}
            lat={Number(place.latitude)}
            lng={Number(place.longitude)}
          />
        ))}
      </GoogleMapReact>
    </div>
  );
};

export default Map;
