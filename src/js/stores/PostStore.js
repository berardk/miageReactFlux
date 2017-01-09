import { EventEmitter } from "events";

import dispatcher from "../dispatcher";
import createFragment from 'react-addons-create-fragment';

class PostStore extends EventEmitter {
  constructor() {
    super()
    this.posts = [
      {
        id: 113464613,
        author: "Vin Diesel",
        text: "Ceci est le message du premier post",
        comments: createFragment(
        		{
        			id: 111111111,
            		idPost: 113464613,
            		author: "Eminem2",
            		text: "Commentaire 2 du premier post"
        		}),
      },
      {
        id: 235684679,
        author: "Chuck Norris",
        text: "Ceci est le message du deuxième post"
      },
    ];
  }

  createPost(author, text) {
    const id = Date.now();

    this.posts.push({
      id,
      author,
      text,
      comments,
    });

    this.emit("change");
  }

  getAll() {
    return this.posts;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POST": {
        this.createPost(action.author, action.text);
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
