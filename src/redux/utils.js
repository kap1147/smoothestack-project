export const addComment = (comments, newComment) => {
  newComment.id = comments.length + 1;
  return [...comments, newComment];
};

export const addError = (errors, payload) => {
  for (const [key] of Object.entries(errors)) {
    if (key === payload.type) {
      errors[key].push(payload.desc);
    }
  }
  return errors;
};

export const removeError = (errors, payload) => {
  for (const [key] of Object.entries(errors)) {
    if (key === payload.type) {
      errors[key] = errors[key].filter((error) => error === payload.desc);
    }
  }
  return errors;
};

export const toggleCommentLike = (comments, payload) => {
  comments.forEach((comment) => {
    if (comment.id === payload.id) {
      if (comment.likes.includes(payload.userId)) {
        comment.likes = comment.likes.filter((like) => like !== payload.userId);
      } else {
        comment.likes.push(payload.userId);
      }
    }
  });
  return comments;
};