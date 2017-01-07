import dispatcher from "../dispatcher";

export function createPost(author, text) {
  dispatcher.dispatch({
    type: "CREATE_POST",
    author,
    text,
  });
}

export function deletePost(id) {
  dispatcher.dispatch({
    type: "DELETE_POST",
    id,
  });
}

export function reloadPosts() {
  dispatcher.dispatch({type: "FETCH_POSTS"});
  setTimeout(() => {
    dispatcher.dispatch({type: "RECEIVE_POSTS", posts: [
      {
        id: 8484848484,
        text: "Go Shopping Again",
        complete: false
      },
      {
        id: 6262627272,
        text: "Hug Wife",
        complete: true
      },
    ]});
  }, 1000);
}
