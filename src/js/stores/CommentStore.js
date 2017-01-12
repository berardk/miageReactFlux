import { EventEmitter } from "events";
var json = require("json-loader!./../../../server/SavePosts.json");

import dispatcher from "../dispatcher";

class CommentStore extends EventEmitter {
  constructor() {
    super()
    /*this.comments = [
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
        text: "Commentaire du deuxième post"
      },
    ];*/

    this.comments = [];
  }

  addComment(idPost, author, text) {
	const id = Date.now();
    this.comments.push({
      id,
      idPost,
      author,
      text,
    });

    var data = "TypePost=addComment&id=" + id + "&idPost="+ idPost +"&author=" + author + "&text=" + text;

        var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
        xmlhttp.open("POST", "http://localhost:3001");
        xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        xmlhttp.send(data);

    this.emit("change");
  }

  getAll() {
    return this.comments;
  }
  
  getById(id) {
	  return this.comments.filter(i => i.idPost == id);
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_COMMENT": {
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
