import React from "react";

import Post from "../components/Post";
import * as PostActions from "../actions/PostActions";
import PostStore from "../stores/PostStore";
import Comment from "../components/Comment";
import * as CommentActions from "../actions/CommentActions";
import CommentStore from "../stores/CommentStore";


export default class Featured extends React.Component {
  constructor() {
    super();
    this.getPosts = this.getPosts.bind(this);
    this.state = {
    		comments: CommentStore.getAll(),
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
  
  createPost() {
	  var message = document.getElementById("message").value;
	  var auteur = document.getElementById("auteur").value;
	  if(message != "" && auteur != ""){
		  PostActions.createPost(auteur,message);
		  document.getElementById("message").value = "";
	  }
  }
  
  render() {
    const { comments,posts } = this.state;

    const PostComponents = posts.map((post) => {
        return <Post key={post.id} {...post}/>;
    });
    
    const CommentComponents = comments.map((comment) => {
        return <Comment key={comment.id} {...comment}/>;
    });

    return (
      <div>
        <div class="panel panel-default panel-posts">
        	{PostComponents}
        	{CommentComponents}
        </div>
        <input id="auteur" type="text" class="form-control" placeholder="Auteur"/>
        <textarea id="message" type="text" class="form-control" placeholder="Entrez votre message ici"/>
        <button class="btn btn-default" onClick={this.createPost.bind(this)}>Poster</button>
      </div>
    );
  }
}
