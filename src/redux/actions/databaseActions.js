import {
  LOADING_DB,
  SET_COMMENTS,
  SET_POSTS,
  SET_USERS,
  TOGGLE_LIKE_COMMENT
} from "../types";

// helper functions
const addImages = (dispatch, posts) => {
  fetch(`https://picsum.photos/v2/list?&limit=${posts.length}`)
    .then((response) => response.json())
    .then((data) => {
      posts.forEach((post, i) => {
        post.image = data[i].download_url;
      });
      posts = addLikes(posts);
      dispatch({ type: SET_POSTS, payload: posts });
    });
};

const addLikes = (arr) => {
  arr.forEach((item) => (item.likes = 3 * Math.floor(Math.random() * item.id)));
  return arr;
};

// Actions
const fetchComments = () => (dispatch) => {
  dispatch({ type: LOADING_DB, payload: true });
  fetch("https://jsonplaceholder.typicode.com/comments")
    .then((response) => response.json())
    .then((data) => {
      data.forEach((comment) => (comment.likes = []));
      dispatch({ type: SET_COMMENTS, payload: data });
    });
  dispatch({ type: LOADING_DB, payload: false });
};

const fetchPosts = () => (dispatch) => {
  dispatch({ type: LOADING_DB, payload: true });
  fetch("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.json())
    .then((data) => {
      addImages(dispatch, data);
    });
  dispatch({ type: LOADING_DB, payload: false });
};

const fetchUsers = () => (dispatch) => {
  dispatch({ type: LOADING_DB, payload: true });
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      let testUser = {
        id: 3,
        avatar:
          "https://m.media-amazon.com/images/M/MV5BMTQ2MDQ2MDIxNF5BMl5BanBnXkFtZTgwNzA1ODc3MjE@._V1_.jpg",
        name: "Virgil Hawkins",
        username: "virgil",
        email: "virgil@smoothestack.com",
        address: data[0].address,
        phone: "864.434.1122",
        website: "smoothestack.com",
        company: data[0].company
      };
      data[2] = testUser;
      dispatch({ type: SET_USERS, payload: data });
    });
  dispatch({ type: LOADING_DB, payload: false });
};

const toggleLikeComment = (id, userId) => (dispatch) => {
  dispatch({ type: TOGGLE_LIKE_COMMENT, payload: { id, userId } });
};

export default { fetchComments, fetchPosts, fetchUsers, toggleLikeComment };