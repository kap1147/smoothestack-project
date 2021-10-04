import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  IconButton,
  Grid,
  Fade,
  makeStyles,
  Typography
} from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {},
  body: {
    "& > *": {
      margin: "25px 0 0 0"
    }
  },
  img: {
    height: "25px",
    transform: "scaleX(-1)"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    "& > *": {
      marginTop: "25px"
    }
  },
  input: {
    padding: "15px"
  },
  btn: {
    background: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
    color: "#fff",
    fontWeight: 600,
    padding: "15px",
    border: "1px solid",
    borderWidth: "2px",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
    "&:hover": {
      background: "#fff",
      color: theme.palette.grey[500]
    }
  },
  text: {
    color: theme.palette.grey[400]
  },
  helperText: {
    margin: "5px 0 0 0 ",
    color: theme.palette.grey[400]
  }
}));

const SignupPage = ({ history }) => {
  let [success, setSuccess] = useState(false);
  let classes = useStyles();

  let handleBackClick = (e) => {
    e.preventDefault();
    history.push("/");
  };

  let handleClick = (e) => {
    e.preventDefault();
    setSuccess((prev) => !prev);
  };

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid item container direction="column" className={classes.body}>
        <Grid item>
          <IconButton onClick={handleBackClick}>
            <img
              src="https://openmoji.org/data/color/svg/E0A7.svg"
              alt="back"
              className={classes.img}
            />
          </IconButton>
        </Grid>
        <Grid
          item
          container
          direction="column"
          justifyContent="center"
          style={{ flex: 1 }}
        >
          <Typography className={classes.text} variant="h3">
            Sign Up
          </Typography>
          {success ? (
            <Fade in={success} direction="up">
              <Grid>
                <form className={classes.form} onSubmit={handleClick}>
                  <input
                    type="text"
                    placeholder="username"
                    className={classes.input}
                  />
                  <Button type="submit" className={classes.btn}>
                    sign up
                  </Button>
                </form>
                <Typography
                  variant="subtitle2"
                  className={classes.text}
                  style={{ marginTop: "5px" }}
                >
                  By signing up, you agree to Photo’s{" "}
                  <Link to="/terms">Terms of Service</Link> and{" "}
                  <Link to="/policy">Privacy Policy</Link>.
                </Typography>
              </Grid>
            </Fade>
          ) : (
            <form className={classes.form} onSubmit={handleClick}>
              <input
                type="email"
                placeholder="email"
                className={classes.input}
              />
              <Typography variant="caption" className={classes.helperText}>
                We will never share your email.
              </Typography>
              <input
                type="password"
                placeholder="password"
                className={classes.input}
              />
              <input
                type="password"
                placeholder="confirm password"
                className={classes.input}
              />
              <Button type="submit" className={classes.btn}>
                Next
              </Button>
              <Typography
                variant="subtitle2"
                className={classes.text}
                align="right"
              >
                Already a member? Sign in <Link to="/signin">here</Link>.
              </Typography>
            </form>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SignupPage;