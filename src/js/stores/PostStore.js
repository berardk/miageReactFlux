import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PostStore extends EventEmitter {
  constructor() {
    super()
    this.posts = [
      {
        id: 113464613,
        text: "Go Shopping",
        complete: false
      },
      {
        id: 235684679,
        text: "Pay Water Bill",
        complete: false
      },
    ];
  }

  createPost(text) {
    const id = Date.now();

    this.posts.push({
      id,
      text,
      complete: false,
    });

    this.emit("change");
  }

  getAll() {
    return this.posts;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POST": {
        this.createPost(action.text);
        break;
      }
      case "RECEIVE_POSTS": {
        this.posts = action.posts;
        this.emit("change");
        break;
      }
    }
  }

}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));

export default postStore;
