import React, { useEffect, useState } from "react";
// Npm
import { useSelector } from "react-redux";
// Components
import DiscoverSlider from "./DiscoverSlider.component.jsx";
import Footer from "./Footer.component.jsx";
import PostReel from "./PostReel.component.jsx";
// Mui stuff
import {
  Grid,
  CircularProgress,
  makeStyles,
  Typography,
} from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  body: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    MsOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none",
    },
  },
  row: {
    marginBottom: "25px",
    background: "#fff",
  },
  subtitle: {
    padding: "10px 0",
    fontWeight: 600,
  },
  text: {
    color: theme.palette.grey[600],
  },
  post_grid: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "auto",
    gridAutoRows: "auto",
    gap: "5px",
  },
  postImage: {
    content: "cover",
  },
  postImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain",
  },
}));

const HomePage = () => {
  const [data, setData] = useState([]);
  const { posts, users } = useSelector((state) => state.database);
  let classes = useStyles();

  useEffect(() => {
    if (!data.length && users.length && posts.length) {
      let addData = [];
      users.forEach((user, i) => {
        if (i % 2) {
          let img = posts.find((post) => post.userId === user.id);
          addData.push({ ...user, img: img.image, postId: img.id });
        }
      });
      setData(addData);
    }
  }, [data, users]);

  return (
    <Grid container direction="column" className={classes.root}>
      <Grid
        item
        container
        direction="column"
        wrap="nowrap"
        className={classes.body}
      >
        <Grid item className={classes.row} style={{ paddingLeft: "10px" }}>
          <Typography variant="h3" className={classes.text}>
            Discover
          </Typography>
          <Typography variant="subtitle2" className={classes.subtitle}>
            WHAT'S NEW TODAY
          </Typography>
        </Grid>

        <Grid item className={classes.row}>
          <DiscoverSlider data={data} />
        </Grid>

        <Grid item className={classes.row}>
          <Typography
            variant="subtitle2"
            className={classes.subtitle}
            style={{ paddingLeft: "10px" }}
          >
            BROWSE ALL
          </Typography>
          {posts.length ? (
            <PostReel posts={posts} />
          ) : (
            <Grid
              item
              container
              xs={12}
              direction="column"
              justifyContent="center"
              alignContent="center"
            >
              <CircularProgress />
              <Typography className={classes.text} variant="caption">
                loading
              </Typography>
            </Grid>
          )}
        </Grid>
      </Grid>
      <Footer />
    </Grid>
  );
};

export default HomePage;
