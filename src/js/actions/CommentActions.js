import dispatcher from "../dispatcher";

export function addComment(idPost, author, text) {
  dispatcher.dispatch({
    type: "CREATE_COMMENT",
    idPost,
    author,
    text,
  });
}

export function deleteComment(id) {
  dispatcher.dispatch({
    type: "DELETE_COMMENT",
    id,
  });
}