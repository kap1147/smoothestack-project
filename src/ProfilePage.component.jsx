import React, { useEffect, useState } from "react";
// Npm
import { useSelector } from "react-redux";
// Components
import Footer from "./Footer.component.jsx";
import ProfilePostReel from "./ProfilePostReel.component.jsx";
// Mui stuff
import {
  Avatar,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography
} from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  body: {
    background: theme.palette.grey[200],
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    MsOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    }
  },
  avatar: {
    marginTop: "15px",
    width: theme.spacing(15),
    height: theme.spacing(15)
  },
  text: {
    color: theme.palette.grey[600]
  },
  text_name: {
    paddingTop: "15px"
  },
  sub: {
    fontWeight: 600
  },
  row: {
    marginBottom: "25px",
    background: "#fff"
  },
  img: {
    height: "15px",
    width: "15px"
  }
}));

const ProfilePage = ({ history }) => {
  const [myPost, setMyPost] = useState([]);
  const { posts } = useSelector((state) => state.database);
  const { user } = useSelector((state) => state.user);
  let classes = useStyles();

  useEffect(() => {
    if (posts.length && !myPost.length && user) {
      let objs = posts.filter((item) => item.userId === user.id);
      setMyPost(objs);
    }
  }, [myPost, posts, user]);

  return (
    <Grid container direction="column" className={classes.root}>
      {/* body */}
      <Grid item className={classes.body}>
        <Grid item className={classes.row}>
          <Grid container justifyContent="center">
            <Avatar
              src="https://m.media-amazon.com/images/M/MV5BMTQ2MDQ2MDIxNF5BMl5BanBnXkFtZTgwNzA1ODc3MjE@._V1_.jpg"
              alt="john doe"
              className={classes.avatar}
            />
          </Grid>
          <Grid container justifyContent="center">
            <Typography className={classes.text_name} variant="h6">
              Virgil Hawkins
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Typography className={classes.text} variant="subtitle2">
              he / him
            </Typography>
          </Grid>
          <Grid container justifyContent="center">
            <Grid
              item
              container
              justifyContent="space-between"
              alignContent="center"
              wrap="nowrap"
              style={{ marginTop: "15px" }}
              xs={12}
            >
              {/* column 1 */}
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={4}
              >
                <Typography
                  className={`${classes.sub} gradient-text`}
                  variant="subtitle1"
                  align="center"
                >
                  18w
                </Typography>
                <Typography
                  className={classes.text}
                  variant="caption"
                  align="center"
                >
                  loyalty
                </Typography>
              </Grid>
              {/* column 2 */}
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={4}
              >
                <Typography
                  className={`${classes.sub} gradient-text`}
                  variant="subtitle1"
                  align="center"
                >
                  23rd
                </Typography>
                <Typography
                  className={classes.text}
                  variant="caption"
                  align="center"
                >
                  rank
                </Typography>
              </Grid>
              {/* column 3 */}
              <Grid
                item
                container
                direction="column"
                alignItems="center"
                xs={4}
              >
                <Typography
                  className={`${classes.sub} gradient-text`}
                  variant="subtitle1"
                  align="center"
                >
                  {user &&
                    posts.filter((item) => item.userId === user.id).length}
                </Typography>
                <Typography
                  className={classes.text}
                  variant="caption"
                  align="center"
                >
                  post
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "15px" }}>
            <Grid item xs={10}>
              <Typography variant="subtitle2" align="center">
                superhero and software engineer
              </Typography>
              <Typography variant="subtitle2" align="center">
                family + friends{" "}
                <img
                  src="https://openmoji.org/data/color/svg/1F498.svg"
                  alt="heart"
                  style={{ width: "15px", height: "15px" }}
                />
              </Typography>
            </Grid>
          </Grid>
          <Grid container justifyContent="center" style={{ marginTop: "15px" }}>
            <IconButton>
              <img
                className={classes.img}
                src="https://www.vectorlogo.zone/logos/instagram/instagram-icon.svg"
                alt="instagram"
              />
            </IconButton>
            <IconButton>
              <img
                className={classes.img}
                src="https://cdn.worldvectorlogo.com/logos/tiktok-icon-2.svg"
                alt="tiktok"
              />
            </IconButton>
            <IconButton>
              <img
                className={classes.img}
                src="https://www.vectorlogo.zone/logos/snapchat/snapchat-tile.svg"
                alt="snapchat"
              />
            </IconButton>
            <IconButton>
              <img
                className={classes.img}
                src="https://www.vectorlogo.zone/logos/twitter/twitter-icon.svg"
                alt="twitter"
              />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item className={classes.row}>
          {posts.length ? (
            <ProfilePostReel posts={myPost} />
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

      {/* footer */}
      <Footer history={history} />
    </Grid>
  );
};

export default ProfilePage;