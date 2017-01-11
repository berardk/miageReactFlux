import { EventEmitter } from "events";
var json = require("json-loader!./../../../server/SavePosts.json");

import dispatcher from "../dispatcher";
import createFragment from 'react-addons-create-fragment';

class PostStore extends EventEmitter {
  constructor() {
    super()
    /*this.posts = [
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
    ];*/

    this.posts = json.posts;
  }

  createPost(author, text) {
    const id = Date.now();
    const comments = [];

    this.posts.push({
      id,
      author,
      text,
      comments,
    });

    var data ="TypePost=addPost&id=" + id + "&author=" + author + "&text=" + text;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:3001");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);

    this.emit("change");
  }
    
editPost(id,text){
    var post;
    for(var i=0;i<this.posts.length;i++){
        if(this.posts[i].id==id){
            this.posts[i].text=text;
            this.emit("change");
        }
    }
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
        case "EDIT_POST" :{
            this.editPost(action.id,action.text);
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
