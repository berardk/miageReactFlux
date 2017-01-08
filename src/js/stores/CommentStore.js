import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PostStore extends EventEmitter {
  constructor() {
    super()
    this.comments = [
      {
        id: 111111111,
        idPost: 113464613,
        author: "Eminem",
        text: "Commentaire 1 du premier post"
      },
      {
        id: 222222222,
    	idPost: 235684679,
        author: "Chuck Norris",
        text: "Ceci est le message du deuxième post"
      },
    ];
  }

  addComment(idPost, author, text) {

    this.comments.push({
      idPost,
      author,
      text,
    });

    this.emit("change");
  }

  getAll() {
    return this.comments;
  }

  handleActions(action) {
    switch(action.type) {
      case "ADD_COMMENT": {
        this.addComment(action.idPost, action.author, action.text);
        break;
      }
      case "RECEIVE_COMMENTS": {
        this.comments = action.comments;
        this.emit("change");
        break;
      }
    }
  }

}

const commentStore = new CommentStore;
dispatcher.register(commentStore.handleActions.bind(commentStore));

export default commentStore;
