import React, { useState } from "react";
import {
  Grid,
  Typography,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from "@material-ui/core";
import useStyle from "./styles";
import PlaceDetail from "../PlaceDetails/PlaceDetail";

interface Place {
  name: string;
}

interface ListProps {
  places: Place[];
  childClicked: any;
}

const List: React.FC<ListProps> = ({ places, childClicked }) => {
  const classes = useStyle();
  const [type, setType] = useState<string>("restaurants");
  const [rating, setRating] = useState<string>("");

  return (
    <div className={classes.container}>
      <Typography variant="h4">
        Restaurants, Hotels & Attractions around you
      </Typography>
      <FormControl className={classes.formControl}>
        <InputLabel>Type</InputLabel>
        <Select
          value={type}
          onChange={(e) => setType(e.target.value as string)}
        >
          <MenuItem value="Restaurants">Restaurants</MenuItem>
          <MenuItem value="Hotels">Hotels</MenuItem>
          <MenuItem value="Attractions">Attractions</MenuItem>
        </Select>
      </FormControl>
      <FormControl className={classes.formControl}>
        <InputLabel>Rating</InputLabel>
        <Select
          value={rating}
          onChange={(e) => setRating(e.target.value as string)}
        >
          <MenuItem value={0}>All</MenuItem>
          <MenuItem value={3}>Above 3.0</MenuItem>
          <MenuItem value={4}>Above 4.0</MenuItem>
          <MenuItem value={4.5}>Above 4.5</MenuItem>
        </Select>
      </FormControl>
      <Grid container spacing={3} className={classes.list}>
        {places?.map((place: any, index) => (
          <Grid item key={index} xs={12}>
            <PlaceDetail place={place} />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};

export default List;
