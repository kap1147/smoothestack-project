import React from "react";
// Components
import DiscoverCard from "./DiscoverCard.component.jsx";
// Mui stuff
import { Grid, makeStyles, Typography } from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "350px",
    overflowY: "hidden",
    overflowX: "auto",
    scrollSnapType: "x mandatory",
    MsOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  }
}));

const DiscoverSlider = ({ data }) => {
  let classes = useStyles();

  return data ? (
    <Grid container wrap="nowrap" className={classes.root}>
      {data.map((obj, i) => (
        <DiscoverCard item={obj} key={i} />
      ))}
    </Grid>
  ) : (
    <Typography>Nothing found...</Typography>
  );
};

export default DiscoverSlider;