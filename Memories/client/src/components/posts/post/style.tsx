import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
  media: {
    paddingTop: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backgroundBlendMode: "darken",
    height: "100%", // Maintain aspect ratio based on paddingTop
    width: "100%", // Ensure it takes full width
  },
  border: {
    border: "solid",
  },
  fullHeightCard: {
    height: "100%",
  },
  card: {
    display: "inline-block",
    flexDirection: "column",
    justifyContent: "space-between",
    borderRadius: "15px",
    //height: "100%",
    position: "relative",
  },
  overlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    color: "white",
  },
  overlay2: {
    position: "absolute",
    top: "5px",
    right: "5px",
    color: "white",
  },
  grid: {
    display: "flex",
  },
  details: {
    display: "flex",
    justifyContent: "space-between",
    margin: "20px",
  },
  title: {
    padding: "0 16px",
    textAlign: "left",
  },
  cardActions: {
    padding: "0 16px 8px 16px",
    display: "flex",
    justifyContent: "space-between",
  },
});
