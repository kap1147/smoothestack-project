import React, { useEffect, useState } from "react";
import allActions from "../redux/actions";
// Npm
import { useDispatch, useSelector } from "react-redux";
import { Transition } from "react-transition-group";
// Components
import Footer from "./Footer.component.jsx";
// Mui stuff
import {
  Avatar,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  makeStyles,
  Typography,
  useTheme
} from "@material-ui/core";
import CloseIcon from "@mui/icons-material/Close";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  body: {
    flex: 1,
    overflowY: "auto",
    overflowX: "hidden",
    MsOverflowStyle: "none",
    scrollbarWidth: "none",
    "&::-webkit-scrollbar": {
      display: "none"
    },
    "& > *": {
      backgroundColor: "#fff",
      marginBottom: "25px"
    }
  },
  subtitle: {
    padding: "10px 0",
    fontWeight: 600
  },
  text: {
    color: theme.palette.grey[600]
  },
  overlayText: {
    color: "#fff"
  },
  icon: {
    width: "15px"
  },
  btn: {
    color: theme.palette.grey[500],
    border: "1px solid #eeeeee",
    fontWeight: 600,
    "&:hover": {
      color: "#000"
    }
  },
  btnComment: {
    color: theme.palette.primary.light,
    border: `1px solid ${theme.palette.grey[400]}`,
    fontWeight: 600,
    "&:hover": {
      color: theme.palette.primary.main
    }
  },
  image: {
    "&:hover": {
      cursor: "pointer"
    }
  },
  likeStyles: {
    background: "linear-gradient(180deg, #d53369 0%, #daae51 100%)",
    color: "#fff"
  }
}));

const PostDetailPage = ({ match }) => {
  let [isOpen, setIsOpen] = useState({ overlay: false, comments: false });
  let [post, setPost] = useState(null);
  let [postComments, setPostComments] = useState([]);
  let { comments, posts, users } = useSelector((state) => state.database);
  let { isAuthenticated, user } = useSelector((state) => state.user);
  let [author, setUser] = useState(null);
  let classes = useStyles();
  let dispatch = useDispatch();
  let theme = useTheme();

  const showComments = () => {
    return postComments.map((comment, i) => {
      let liked = Boolean(comment.likes.find(item => Number(item) === Number(user.id)))
      return (
      <Grid
        key={i}
        container
        wrap="nowrap"
        style={{
          padding: "12px",
          marginBottom: "24px",
          backgroundColor: "#fff"
        }}
      >
        <Grid>
          <Grid item container wrap="nowrap">
            <Grid item style={{ paddingTop: "36px" }}>
              <Avatar alt={comment.name}>{comment.email[0]}</Avatar>
            </Grid>
            <Grid item style={{ paddingLeft: "12px" }}>
              <Grid
                container
                justifyContent="space-between"
                alignItems="center"
              >
                <Typography variant="body1" style={{ fontWeight: 600 }}>
                  {comment.email.split("@")[0]}
                </Typography>
                <Typography variant="caption">
                  {comment.likes.length} likes
                </Typography>
              </Grid>
              <Grid style={{ padding: "12px 0" }}>
                <hr />
              </Grid>
              <Typography variant="body2">
                {comment.body.charAt(0).toUpperCase() + comment.body.slice(1)}.
              </Typography>
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="flex-end"
            style={{ paddingTop: "12px" }}
          >
            <Button className={classes.btn}>reply</Button>
            <Button
              onClick={(e) => handleCommentLike(e, comment.id)}
              className={liked ? `${classes.btn} ${classes.likeStyles}` : classes.btn}
              style={{ marginLeft: "12px",}}
            >
              like
            </Button>
          </Grid>
        </Grid>
      </Grid>
    )});
  };

  const duration = 300;

  const defaultStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
    transition: `opacity ${duration}ms ease-in-out`,
    opacity: 0
  };

  const defaultIconStyle = {};

  const defaultCommentsStyle = {};

  const transitionStyles = {
    entering: { opacity: 0, display: "flex" },
    entered: { opacity: 1 },
    exiting: { opacity: 0 },
    exited: { opacity: 0, display: "none" }
  };

  const transitionCommentsStyles = {
    entering: { opacity: 0.5, display: "flex" },
    entered: { opacity: 1 },
    exiting: { opacity: 0.5 },
    exited: { opacity: 0, display: "none" }
  };

  const transitionIconStyles = {
    entering: {
      transform: "rotate(270deg)",
      color: theme.palette.secondary.light
    },
    entered: { transform: "rotate(0)", color: theme.palette.primary.main },
    exiting: {
      transform: "rotate(270deg)",
      color: theme.palette.primary.light
    },
    exited: { transform: "rotate(180deg)", color: theme.palette.secondary.main }
  };

  // handlers
  let handleClose = (e) => {
    e.preventDefault();
    setIsOpen({ ...isOpen, overlay: false });
  };

  let handleCommentLike = (e, id) => {
    e.preventDefault();
    dispatch(allActions.databaseActions.toggleLikeComment(id, user.id));
  };

  let handleImageClick = (e) => {
    e.preventDefault();
    setIsOpen({ ...isOpen, overlay: true });
  };
  // get post data
  useEffect(() => {
    if (!post && posts.length) {
      setPost(
        posts.find((element) => element.id === Number(match.params.postId))
      );
    }
  }, [match, post, posts]);
  // get post author data
  useEffect(() => {
    if (post && users.length && !author) {
      setUser(users.find((element) => element.id === post.userId));
    }
  }, [post, author, users]);
  // get comments
  useEffect(() => {
    if (post && comments.length && !postComments.length) {
      setPostComments(comments.filter((element) => element.postId === post.id));
    }
  }, [comments, post, postComments]);

  return (
    <Grid container direction="column" className={classes.root}>
      {post && user ? (
        <Grid
          item
          container
          direction="column"
          wrap="nowrap"
          className={classes.body}
        >
          <Grid
            container
            alignItems="center"
            style={{ height: "50px", minHeight: "50px", padding: "0 12px" }}
          >
            <Typography
              variant="h6"
              className={classes.text}
              style={{ textTransform: "capitalize" }}
            >
              {post.title.slice(0, 25)}
            </Typography>
          </Grid>
          <Grid
            className={classes.image}
            onClick={handleImageClick}
            style={{
              backgroundImage: `url(${post.image})`,
              height: "300px",
              minHeight: "300px",
              backgroundPosition: "bottom center",
              backgroundSize: "cover",
              marginBottom: 0
            }}
          />
          <Grid style={{ marginBottom: 0, padding: "12px 12px 0 12px" }}>
            <Typography>{post.body}</Typography>
            <Grid style={{ paddingTop: "24px" }}>
              <hr />
            </Grid>
          </Grid>
          <Grid
            container
            justifyContent="space-between"
            style={{ padding: "12px" }}
          >
            <Button
              disabled={post.userId === user.id}
              className={classes.btn}
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
            <Button className={classes.btn}>....</Button>
          </Grid>
          <Grid
            container
            alignItems="center"
            justifyContent="space-between"
            wrap="nowrap"
            style={{ height: "50px", minHeight: "50px", padding: "0 12px" }}
          >
            <Grid container>
              <Typography>Comments</Typography>

              <Typography variant="body2" style={{ paddingLeft: "5px" }}>
                ({postComments.length})
              </Typography>
            </Grid>
            <IconButton
              onClick={() =>
                setIsOpen({ ...isOpen, comments: !isOpen.comments })
              }
              style={{ borderRadius: "25%", padding: "6px" }}
            >
              {/* toggle comments button */}
              <Transition in={!isOpen.comments} timeout={duration}>
                {(state) => (
                  <KeyboardArrowDownIcon
                    style={{
                      ...defaultIconStyle,
                      ...transitionIconStyles[state]
                    }}
                  />
                )}
              </Transition>
            </IconButton>
          </Grid>
          {/* comments */}
          <Transition in={isOpen.comments} timeout={duration}>
            {(state) => (
              <Grid
                style={{
                  backgroundColor: "#eeeeee",
                  ...defaultCommentsStyle,
                  ...transitionCommentsStyles[state]
                }}
              >
                {showComments()}
              </Grid>
            )}
          </Transition>
          <Grid
            container
            alignItems="center"
            style={{ padding: "12px", marginBottom: 0 }}
          >
            <textarea
              disabled={user.id === post.userId}
              rows="5"
              style={{ flex: 1 }}
            ></textarea>
          </Grid>
          <Grid style={{ padding: "0 12px 12px 12px" }}>
            <Button
              disabled={user.id === post.userId}
              fullWidth
              className={classes.btnComment}
            >
              add comment
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Grid
          container
          justifyContent="center"
          alignItems="center"
          style={{ flex: 1 }}
          direction="column"
        >
          <CircularProgress />
          <Typography>loading post...</Typography>
        </Grid>
      )}

      {/* footer */}
      <Footer />

      {/*Image overlay */}
      {post && author && (
        <Transition in={isOpen.overlay} timeout={duration}>
          {(state) => (
            <Grid
              style={{
                backgroundImage: `url(${post.image})`,
                ...defaultStyle,
                ...transitionStyles[state]
              }}
            >
              <Grid
                item
                container
                wrap="nowrap"
                alignContent="center"
                style={{ padding: "25px" }}
              >
                {/* Column 1 */}
                <Grid container>
                  <Avatar alt={author.name} src="" />
                  <Grid style={{ paddingLeft: "10px" }}>
                    <Typography className={classes.overlayText}>
                      {author.name}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      className={classes.overlayText}
                    >
                      @{author.username}
                    </Typography>
                  </Grid>
                </Grid>
                {/* Column 2 */}
                <Grid>
                  <IconButton onClick={handleClose}>
                    <CloseIcon fontSize="large" style={{ color: "#fff" }} />
                  </IconButton>
                </Grid>
              </Grid>
            </Grid>
          )}
        </Transition>
      )}
    </Grid>
  );
};

export default PostDetailPage;