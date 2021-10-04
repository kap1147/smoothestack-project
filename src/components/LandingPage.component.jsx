import React from "react";
// Mui stuff
import { Button, Grid, makeStyles, Typography } from "@material-ui/core";
import CameraEnhanceOutlinedIcon from '@mui/icons-material/CameraEnhanceOutlined';

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  img: {
    height: "30px",
    marginRight: "5px"
  },
  row: {
    flex: 1,
    backgroundImage: "url('https://images.wallpaperscraft.com/image/single/paint_watercolor_spots_124278_2560x1440.jpg')",
    backgroundRepeat: "no-repeat, repeat",
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  footer: {
    background: "#fff",
    height: "max-content",
    marginTop: "25px"
  },
  btnRow: {},
  btnLogin: {
    color: theme.palette.grey[600],
    fontWeight: 600,
    border: "2px solid",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
    "&:hover": {
      background: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
      color: "#fff"
    }
  },
  btnRegister: {
    background: "linear-gradient(180deg, #d53369 0%, #daae51 100%)",
    color: "#fff",
    fontWeight: 600,
    border: "2px solid",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(180deg, #d53369 0%, #daae51 100%)",
    "&:hover": {
      background: "#fff",
      color: theme.palette.grey[600]
    }
  }
}));

const LandingPage = ({ history }) => {
  let classes = useStyles();

  let handleLoginCLick = (e) => {
    e.preventDefault();
    history.push("/signin");
  };

  let handleRegisterCLick = (e) => {
    e.preventDefault();
    history.push("/signup");
  };

  return (
    <Grid item container direction="column" className={classes.root} xs={12}>
      <Grid
        item
        container
        justifyContent="center"
        alignItems="center"
        className={classes.row}
      >
        <CameraEnhanceOutlinedIcon fontSize="large"/>
        <Typography variant="h4">Photo</Typography>
      </Grid>
      <Grid
        className={classes.footer}
        item
        container
        justifyContent="center"
        alignItems="center"
      >
        <Grid
          item
          container
          justifyContent="space-between"
          xs={12}
          style={{ backgroundColor: "#eeeeee" }}
        >
          <Grid item xs={5} className={classes.btnRow}>
            <Button
              fullWidth
              onClick={handleLoginCLick}
              className={classes.btnLogin}
            >
              sign in
            </Button>
          </Grid>
          <Grid item xs={5} className={classes.btnRow}>
            <Button
              fullWidth
              onClick={handleRegisterCLick}
              className={classes.btnRegister}
            >
              register
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LandingPage;