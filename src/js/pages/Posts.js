import React from "react";

import Post from "../components/Post";
import * as PostActions from "../actions/PostActions";
import PostStore from "../stores/PostStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getPosts = this.getPosts.bind(this);
    this.state = {
      posts: PostStore.getAll(),
    };
  }

  componentWillMount() {
    PostStore.on("change", this.getPosts);
  }

  componentWillUnmount() {
    PostStore.removeListener("change", this.getPosts);
  }

  getPosts() {
    this.setState({
      posts: PostStore.getAll(),
    });
  }

  reloadPosts() {
    PostActions.reloadPosts();
  }
  
  createPost() {
	  var message = document.getElementById("message").value;
	  var auteur = document.getElementById("auteur").value;
	  if(message != "" && auteur != ""){
		  PostActions.createPost(auteur,message);
		  document.getElementById("message").value = "";
	  }
  }

  render() {
    const { posts } = this.state;

    const PostComponents = posts.map((post) => {
        return <Post key={post.id} {...post}/>;
    });

    return (
      <div>
        <button onClick={this.reloadPosts.bind(this)}>Reload!</button>
        <ul>{PostComponents}</ul>
        <input id="auteur" type="text"/>
        <input id="message" type="text"/>
        <button onClick={this.createPost.bind(this)}>Ajouter!</button>
      </div>
    );
  }
}
