import React, { useState } from "react";
// Npm
import { useHistory } from "react-router-dom";
// Mui stuff
import { Grid, makeStyles } from "@material-ui/core";

let useStyles = makeStyles(() => ({
  root: {
    position: "relative"
  },
  img: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  overlay: {
    height: "calc(100% - 3px)",
    cursor: "pointer",
    width: "100%",
    marginBottom: "5px",
    backgroundColor: "#0009",
    position: "absolute",
    zIndex: 9,
    opacity: 0,
    "&:hover": {
      opacity: 1,
      transition: "opacity 1000ms ease-in-out"
    }
  }
}));

const PostCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  let classes = useStyles();
  let history = useHistory();

  let handleClick = (e) => {
    history.push(`/post/${item.id}`);
  };

  return (
    <Grid
      item
      className={classes.root}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      xs={12}
    >
      {isHovered && <Grid className={classes.overlay} />}
      <img className={classes.img} src={item.image} alt={"item.author"} />
    </Grid>
  );
};

export default PostCard;