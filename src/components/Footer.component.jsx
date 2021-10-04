import React from "react";
import allActions from "../redux/actions";
// Npm
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
// Mui stuff
import { Button, Grid, IconButton, makeStyles } from "@material-ui/core";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import SearchIcon from "@mui/icons-material/Search";

let useStyles = makeStyles(() => ({
  root: {
    height: "75px",
    background: "#fff"
  },
  img: {
    height: "30px",
    marginRight: "5px"
  },
  btn_add: {
    background: "linear-gradient(360deg, #d53369 0%, #daae51 100%)",
    borderRadius: "25px",
    height: "65%",
    "&:hover": {
      background: "linear-gradient(180deg, #d53369 0%, #daae51 100%)"
    }
  }
}));

const Footer = () => {
  let classes = useStyles();
  let dispatch = useDispatch();
  let history = useHistory();

  //handles
  let handleLinkClick = (e, link) => {
    e.preventDefault();
    history.push(link);
  };

  let handleLogout = (e) => {
    e.preventDefault();
    dispatch(allActions.userActions.logoutUser());
  };

  return (
    <Grid>
      <hr />
      <Grid
        item
        container
        justifyContent="space-between"
        alignItems="center"
        wrap="nowrap"
        className={classes.root}
      >
        <IconButton onClick={(e) => handleLinkClick(e, "/")}>
          <HomeOutlinedIcon className={classes.img} fontSize="large" />
        </IconButton>
        <IconButton onClick={(e) => handleLinkClick(e, "/search")}>
          <SearchIcon className={classes.img} fontSize="large" />
        </IconButton>

        <Button className={classes.btn_add}>
          <img
            className={classes.img}
            src="https://openmoji.org/data/black/svg/E264.svg"
            alt="add"
          />
        </Button>

        <IconButton onClick={(e) => handleLinkClick(e, "/profile")}>
          <PersonOutlineIcon className={classes.img} fontSize="large" />
        </IconButton>
        <IconButton onClick={handleLogout}>
          <LogoutIcon className={classes.img} fontSize="large" />
        </IconButton>
      </Grid>
    </Grid>
  );
};

export default Footer;