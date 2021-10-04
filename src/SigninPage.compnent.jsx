import React, { useEffect, useState } from "react";
import allActions from "./redux/actions";
// Npm
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  CircularProgress,
  colors,
  Button,
  IconButton,
  Grid,
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
    border: "1px solid ",
    borderWidth: "2px",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
    "&:hover": {
      color: theme.palette.grey[400],
      background: "#fff"
    }
  },
  btnProgress: {
    color: colors.green[500],
    position: "absolute",
    top: "50%",
    left: "50%",
    marginTop: -12,
    marginLeft: -12
  },
  btnWrapper: {
    position: "relative"
  },
  terms: {
    padding: 0,
    margin: 0,
    color: "linear-gradient(90deg, #d53369 0%, #daae51 100%)"
  },
  text: {
    color: theme.palette.grey[400]
  }
}));

const SigninPage = ({ history }) => {
  let { errors, isLoading } = useSelector((state) => state.ui);
  let { users } = useSelector((state) => state.database);
  let { isAuthenticated } = useSelector((state) => state.user);
  const [values, setValues] = useState({ email: "", password: "" });
  let classes = useStyles();
  let dispatch = useDispatch();

  let handleChange = (e) => {
    e.preventDefault();
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    dispatch(allActions.uiActions.loading(true));
    dispatch(allActions.userActions.loginUser(values.email, users));
  };

  useEffect(() => {
    dispatch(allActions.uiActions.clearErrors());
  }, [dispatch]);

  useEffect(() => {
    if (isAuthenticated) history.push("/");
  }, [history, isAuthenticated]);

  return (
    <Grid container justifyContent="center" className={classes.root}>
      <Grid item container direction="column" className={classes.body}>
        <Grid item>
          <IconButton onClick={() => history.push("/")}>
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
          <Grid item>
            <Typography className={classes.text} variant="h3">
              Sign In
            </Typography>
          </Grid>
          <form className={classes.form} onSubmit={handleSubmit}>
            <input
              value={values.email}
              name="email"
              type="email"
              placeholder="email"
              className={classes.input}
              onChange={handleChange}
              required
            />
            {errors.email.length ? (
              <Typography style={{ marginTop: "6px", color: "#ff0000" }}>
                {errors.email.map((error) => error)}
              </Typography>
            ) : null}
            <input
              value={values.password}
              name="password"
              type="password"
              placeholder="password"
              className={classes.input}
              onChange={handleChange}
              required
            />
            {errors.password.length ? (
              <Typography style={{ marginTop: "6px", color: "#ff0000" }}>
                {errors.password.map((error) => error)}
              </Typography>
            ) : (
              <Grid />
            )}
            <Typography
              variant="subtitle2"
              className={classes.terms}
              align="right"
            >
              <Link to="/reset_password">Forgot password?</Link>
            </Typography>
            <Grid item container className={classes.btnWrapper}>
              <Button
                disabled={isLoading}
                type="submit"
                fullWidth
                className={classes.btn}
              >
                Sign in
              </Button>
              {isLoading && (
                <CircularProgress size={24} className={classes.btnProgress} />
              )}
            </Grid>
          </form>
          <Typography
            variant="subtitle2"
            align="right"
            className={classes.text}
            style={{ marginTop: "12px" }}
          >
            Not a member? Sign up <Link to="signup">here</Link>.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SigninPage;