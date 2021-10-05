import React, { useEffect, useState } from "react";
// Npm
import { useSelector } from "react-redux";
// Components
import Footer from "./Footer.component.jsx";
import PostReel from "./PostReel.component.jsx";
// Mui stuff
import { Grid, makeStyles, Typography } from "@material-ui/core";

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
  subtitle: {
    padding: "10px 0",
    fontWeight: 600,
  },
  text: {
    color: theme.palette.grey[600],
  },
  row: {
    backgroundColor: "#fff",
    "& > *": {
      padding: "0 12px",
    },
  },
}));

const SearchPage = ({ history }) => {
  let [value, setValue] = useState("");
  let [query, setQuery] = useState("All");
  let [results, setResults] = useState([]);
  const { posts } = useSelector((state) => state.database);
  let classes = useStyles();

  // handlers
  let handleSubmit = (e) => {
    e.preventDefault();
    setQuery(value);
    setValue("");
  };

  useEffect(() => {
    if (posts.length && query.length) {
      if (query.toLowerCase() === "all") {
        setResults([...posts]);
      } else {
        setResults([
          ...posts.filter((post) =>
            String(post.title.toLowerCase()).includes(query.toLowerCase())
          ),
        ]);
      }
    }
  }, [query, posts]);

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
        <Grid item container className={classes.row}>
          <Grid item container xs={12}>
            <Typography variant="h3" className={classes.text}>
              Search
            </Typography>
          </Grid>
          <Grid item container style={{ paddingTop: "24px" }}>
            <Grid component="form" onSubmit={handleSubmit} item container>
              <input
                value={value}
                placeholder="Search all photos..."
                type="search"
                required
                style={{ padding: "12px", width: "100%" }}
                onChange={(e) => setValue(e.target.value)}
              />
            </Grid>
          </Grid>
          <Grid
            item
            container
            justifyContent="space-between"
            style={{ paddingTop: "24px" }}
          >
            <Typography variant="subtitle2">
              ALL RESULTS ({results.length})
            </Typography>
            <Typography variant="subtitle2">
              <strong>{query}</strong>
            </Typography>
          </Grid>
          <Grid item container style={{ paddingTop: "24px" }}>
            <PostReel posts={results} />
          </Grid>
        </Grid>
      </Grid>
      {/* footer */}
      <Footer history={history} />
    </Grid>
  );
};

export default SearchPage;
