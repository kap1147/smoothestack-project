import React, { useEffect } from "react";
import allActions from "./redux/actions";
// NPM
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components
import SearchPage from "./components/SearchPage.component.jsx";
import HomePage from "./components/HomePage.component.jsx";
import LandingPage from "./components/LandingPage.component.jsx";
import NotificationPage from "./components/NotificationPage.component.jsx";
import PostDetailPage from "./components/PostDetailPage.component.jsx";
import ProfilePage from "./components/ProfilePage.component.jsx";
import SigninPage from "./components/SigninPage.compnent.jsx";
import SignupPage from "./components/SignupPage.component.jsx";
// Style
import "./index.css";

export default function App() {
  let { comments, posts, users } = useSelector((state) => state.database);
  let dispatch = useDispatch();

  // get comments from api
  useEffect(() => {
    if (!comments.length) {
      dispatch(allActions.databaseActions.fetchComments());
    }
  }, [dispatch, comments]);
  // get posts from api
  useEffect(() => {
    if (posts && !posts.length) {
      dispatch(allActions.databaseActions.fetchPosts());
    }
  }, [dispatch, posts]);
  // get users from api
  useEffect(() => {
    if (users && !users.length) {
      dispatch(allActions.databaseActions.fetchUsers());
    }
  }, [dispatch, users]);

  console.log("users: ", users);

  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomePage} />
        <Route exact path="/landing" component={LandingPage} />
        <Route exact path="/notifications" component={NotificationPage} />
        <Route exact path="/post/:postId" component={PostDetailPage} />
        <Route exact path="/profile" component={ProfilePage} />
        <Route exact path="/search" component={SearchPage} />
        <Route exact path="/signin" component={SigninPage} />
        <Route exact path="/signup" component={SignupPage} />
      </Switch>
    </Router>
  );
}