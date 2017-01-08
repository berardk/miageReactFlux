import dispatcher from "../dispatcher";

export function addComment(idPost, author, text) {
  dispatcher.dispatch({
    type: "ADD_COMMENT",
    author,
    text,
  });
}

export function deletePost(id) {
  dispatcher.dispatch({
    type: "DELETE_COMMENT",
    id,
  });
}