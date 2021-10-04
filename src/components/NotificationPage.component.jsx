// Components
import Footer from "./Footer.component.jsx";
// Mui stuff
import { Grid, makeStyles, Typography } from "@material-ui/core";

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
    }
  },
  subtitle: {
    padding: "10px 0",
    fontWeight: 600
  },
  text: {
    color: theme.palette.grey[600]
  }
}));

const NotificationPage = ({ history }) => {
  let classes = useStyles();

  return (
    <Grid container direction="column" className={classes.root}>
      {/* body */}
      <Grid
        item
        container
        direction="column"
        wrap="nowrap"
        className={classes.body}
      >
        <Typography variant="h3" className={classes.text}>
          Notifications
        </Typography>
      </Grid>
      {/* footer */}
      <Footer history={history} />
    </Grid>
  );
};

export default NotificationPage;