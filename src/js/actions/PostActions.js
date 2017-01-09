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
