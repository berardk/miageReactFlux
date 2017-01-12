import { EventEmitter } from "events";
var json = require("json-loader!./../../../server/SavePosts.json");

import dispatcher from "../dispatcher";
import createFragment from 'react-addons-create-fragment';

class PostStore extends EventEmitter {
  constructor() {
    super();
    this.posts = json.posts;
  }

  createPost(author, text, image, nblike) {
    const id = Date.now();
    const comments = [];
    nblike = 0;

    this.posts.unshift({
      id,
      author,
      text,
      comments,
	  image,
	  nblike
    });

    /*var data ="TypePost=addPost&id=" + id + "&author=" + author + "&text=" + text;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:3001");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);*/

    this.emit("change");
  }
  
  getOnePost(id,nblike) {
      var elt_trouve = "";
      this.posts.forEach(function(element) {
		if(element.id == id) {
			elt_trouve = element;
			element.nblike = nblike;
		}
	  });
	  return elt_trouve;
  }
  
  addLike(id,nblike) {
	
	var post = this.getOnePost(id,nblike);

    /*var data ="TypePost=addlike&id=" + id;

    var xmlhttp = new XMLHttpRequest();   // new HttpRequest instance
    xmlhttp.open("POST", "http://localhost:3001");
    xmlhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xmlhttp.send(data);*/


    this.emit("change");
  }
  
  deletePost(id) {
    var supprListe = this.posts;
	this.posts.forEach(function(element,i) {
		if(element.id == id) {
			delete supprListe[i];
		}
	});
	this.posts = supprListe;
	this.emit("change");
  }
    
editPost(id,text){
    this.posts.forEach(function(element,i) {
		if(element.id == id) {
            element.text=text;
        }
    });
	this.emit("change");
}
  getAll() {
    return this.posts;
  }

  handleActions(action) {
    switch(action.type) {
      case "CREATE_POST": {
        this.createPost(action.author, action.text, action.image, action.nblike);
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
	  case "LIKE_POST": {
        this.addLike(action.id,action.nblike);
        break;
      }
	  case "DELETE_POST": {
		this.deletePost(action.id);
		break;
	  }
    }
  }

}

const postStore = new PostStore;
dispatcher.register(postStore.handleActions.bind(postStore));

export default postStore;
