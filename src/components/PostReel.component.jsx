import React, { useEffect, useState } from "react";
// Components
import PostCard from "./PostCard.component.jsx";
// Mui stuff
import { Button, Grid, makeStyles } from "@material-ui/core";

let useStyles = makeStyles((theme) => ({
  root: {
    height: "100%"
  },
  post_grid: {
    display: "grid",
    gridTemplateColumns: "50% 50%",
    gridTemplateRows: "auto",
    gridAutoRows: "auto",
    gap: "5px"
  },
  postImage: {
    content: "cover"
  },
  postImg: {
    width: "100%",
    height: "100%",
    objectFit: "contain"
  },
  btn: {
    color: theme.palette.grey[600],
    fontWeight: 600,
    border: "1px solid ",
    borderWidth: "2px",
    borderImageSlice: 1,
    borderImageSource: "linear-gradient(180deg, #d53369 0%, #daae51 100%)"
  }
}));

// create two columns and populate
const PostReel = ({ posts }) => {
  const [columns, setColumns] = useState([[], []]);
  const [page, setPage] = useState(1);
  let classes = useStyles();

  useEffect(() => {
    let createColumns = () => {
      posts.forEach((post, i) => {
        if (i < page * 10) {
          if (i % 2 === 0) {
            setColumns((prev) => [[...prev[0], post], prev[1]]);
          } else if (i % 2 === 1)
            setColumns((prev) => [[...prev[1], post], prev[0]]);
        }
      });
    };
    createColumns();
  }, [page, posts]);

  return (
    <Grid container justifyContent="center">
      <Grid item container justifyContent="center">
        {columns[0].length !== 0 ? (
          columns.map((column, i) => (
            <Grid
              key={i + 3.5 * 0.32}
              item
              xs={6}
              style={i % 2 ? { marginLeft: "3px" } : { flex: 1 }}
            >
              {column.map((obj, i) => (
                <PostCard key={i} item={obj} />
              ))}
            </Grid>
          ))
        ) : (
          <p>loading posts</p>
        )}
      </Grid>
      {page < 10 && (
        <Grid item container style={{ padding: "15px 0" }} xs={6}>
          <Button
            onClick={() => setPage((prev) => ++prev)}
            className={classes.btn}
            fullWidth
          >
            see more
          </Button>
        </Grid>
      )}
    </Grid>
  );
};

export default PostReel;