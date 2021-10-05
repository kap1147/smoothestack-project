import React, { useEffect } from "react";
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

let data = [
  {
    img: "https://www.enjpg.com/img/2020/cool-for-boys-4.jpg",
    avatar:
      "https://static.wikia.nocookie.net/fortnite/images/f/fe/Fishstick_%28New%29_-_Outfit_-_Fortnite.png",
    name: "John Smith",
    username: "fishstick",
  },
  {
    img: "https://www.wallpapertip.com/wmimgs/0-3002_very-cool-wallpapers-cool-backgrounds-of-mermaids.jpg",
    avatar: "https://wallpapercave.com/wp/wp7171957.jpg",
    name: "Aleena Rosado",
    username: "AnimeChick",
  },
  {
    img: "https://images.squarespace-cdn.com/content/v1/5c5c3833840b161566b02a76/1573133725500-Y5PCN0V04I86HDAT8AT0/WBC_7095.jpg",
    avatar:
      "http://blog.lemnsissay.com/wp-content/uploads/2013/11/167675-south-park-chef-2.gif",
    name: "Jerome Mcelroy",
    username: "chef",
  },
  {
    img: "https://evofitness.ch/wp-content/uploads/2019/01/Crossfit-EVO-Fitness-1200x675.jpg",
    avatar:
      "https://64.media.tumblr.com/5702e0d42227e289b8ce9f1377a7d7d7/tumblr_pbiibzZUyT1rq9ihbo1_1280.jpg",
    name: "Heather Robers",
    username: "MissFit",
  },
];

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
  const { posts } = useSelector((state) => state.database);
  let classes = useStyles();

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
