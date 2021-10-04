import { toggleCommentLike } from "../utils";

import {
  CLEAR_DB,
  LOADING_DB,
  SET_COMMENTS,
  SET_POSTS,
  SET_USERS,
  TOGGLE_LIKE_COMMENT
} from "../types";

const initialState = {
  isLoading: false,
  users: [],
  posts: [],
  comments: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLEAR_DB:
      return initialState;
    case LOADING_DB:
      return {
        ...state,
        isLoading: action.payload
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload
      };
    case SET_POSTS:
      return {
        ...state,
        posts: action.payload
      };
    case SET_USERS:
      return {
        ...state,
        users: action.payload
      };
    case TOGGLE_LIKE_COMMENT:
      return {
        ...state,
        comments: toggleCommentLike(state.comments, action.payload)
      };
    default:
      return state;
  }
}