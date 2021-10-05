import React from "react";
// Mui stuff
import { Avatar, Grid, makeStyles, Typography } from "@material-ui/core";
import { useHistory } from "react-router";

const DiscoverCard = ({ item }) => {
  let useStyles = makeStyles((theme) => ({
    root: {
      minWidth: "100%",
      scrollSnapAlign: "start",
    },
    row_img: {
      background: `url(${item.img})`,
      backgroundRepeat: "no-repeat, repeat",
      backgroundPosition: "center",
      backgroundSize: "cover",
      height: "300px",
      width: "100%",
      "&:hover": {
        cursor: "pointer",
      },
    },
    subtitle: {
      color: theme.palette.grey[600],
    },
  }));
  let classes = useStyles();
  let history = useHistory();

  // handlers
  let handleClick = (e) => {
    e.preventDefault();
    history.push(`/post/${item.postId}`);
  };

  return (
    <Grid item xs={12} className={classes.root}>
      {/* image row */}
      <Grid onClick={handleClick} className={classes.row_img} />
      {/* content row */}
      <Grid
        container
        alignItems="center"
        style={{ margin: "10px 0", paddingLeft: "10px" }}
      >
        <Avatar src={item.avatar} alt={item.name} />
        <Grid style={{ paddingLeft: "5px" }}>
          <Typography variant="subtitle2" style={{ fontWeight: 600 }}>
            {item.name}
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            @{item.username}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DiscoverCard;
