import React from "react";
// Npm
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
// Mui stuff
import { Button, Grid, makeStyles } from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%",
  },
  row: {
    marginBottom: "15px",
    background: "#fff",
  },
  postImage: {
    content: "cover",
  },
  img: {
    width: "100%",
    height: "auto",
    objectFit: "contain",
    "&:hover": {
      cursor: "pointer",
    },
  },
  icon: {
    width: "15px",
  },
  btnGrey: {
    color: theme.palette.grey[500],
    border: "1px solid #eeeeee",
    fontWeight: 600,
    "&:hover": {
      color: "#000",
    },
  },
  btn: {
    color: theme.palette.grey[600],
    fontWeight: 600,
    border: "1px solid ",
    borderWidth: "2px",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(180deg, #00C9FF 0%, #92FE9D 100%)",
  },
  btnComment: {
    marginLeft: "10px",
  },
  btnMore: {
    marginRight: "10px",
  },
}));

// create two columns and populate
const PostReel = ({ posts }) => {
  const { comments } = useSelector((state) => state.database);
  let history = useHistory();
  let classes = useStyles();

  // handlers
  let handleAction = (e, id) => {
    e.preventDefault();
    history.push(`/post/${id}`);
  };

  return (
    <Grid
      item
      container
      direction="column"
      wrap="nowrap"
      justifyContent="center"
      style={{ background: "#eeeeee" }}
    >
      {posts.map((post, i) => (
        <Grid item className={classes.row} key={i}>
          <img
            onClick={(e) => handleAction(e, post.id)}
            className={classes.img}
            src={post.image}
            alt={post.title}
          />
          <Grid
            container
            alignItems="center"
            wrap="nowrap"
            style={{ padding: "10px 0 10px 10px" }}
          >
            <Grid item container alignItems="center">
              <Button
                className={classes.btnGrey}
                startIcon={
                  <img
                    className={classes.icon}
                    src="https://openmoji.org/data/color/svg/2764.svg"
                    alt="favorite"
                  />
                }
              >
                {post.likes}
              </Button>
              <Button
                startIcon={
                  <img
                    className={classes.icon}
                    src="https://openmoji.org/data/color/svg/1F5E8.svg"
                    alt="comments"
                  />
                }
                className={`${classes.btnGrey} ${classes.btnComment}`}
              >
                {comments.filter((item) => item.postId === post.id).length}{" "}
                comments
              </Button>
            </Grid>
            <Button className={`${classes.btnGrey} ${classes.btnMore}`}>
              ....
            </Button>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default PostReel;
