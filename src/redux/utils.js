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

export const avatarList = [
  "https://64.media.tumblr.com/5702e0d42227e289b8ce9f1377a7d7d7/tumblr_pbiibzZUyT1rq9ihbo1_1280.jpg",
  "https://wallpapercave.com/wp/wp7171957.jpg",
  "https://shotkit.com/wp-content/uploads/2021/06/cool-profile-pic-matheus-ferrero.jpeg",
  "https://www.debrabenton.com/wp-content/uploads/2019/07/taking-a-picture-1269456_1280.jpg",
  "https://www.wallpapertip.com/wmimgs/30-308464_cool-profile-pictures-1080p.jpg",
  "https://miro.medium.com/max/785/0*Ggt-XwliwAO6QURi.jpg",
  "https://expertphotography.b-cdn.net/wp-content/uploads/2020/08/profile-photos-4.jpg",
  "https://images.summitmedia-digital.com/cosmo/images/2020/08/26/julia-barretto-profile-picture-idea-1598430021.jpg",
  "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg",
];

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
