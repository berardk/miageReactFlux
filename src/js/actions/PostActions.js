import dispatcher from "../dispatcher";

export function createPost(author, text) {
  dispatcher.dispatch({
    type: "CREATE_POST",
    author,
    text,
  });
}

export function editPost(id, text) {
  dispatcher.dispatch({
    type: "EDIT_POST",
    id,
    text,
  });
}

export function deletePost(id) {
  dispatcher.dispatch({
    type: "DELETE_POST",
    id,
  });
}
