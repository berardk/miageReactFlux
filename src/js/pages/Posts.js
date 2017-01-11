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
      posts: PostStore.getAll(),
	  file: '',
      imagePreviewUrl: ''
    };
	this._handleImageChange = this._handleImageChange.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
  }

  componentWillMount() {
    PostStore.on("change", this.getPosts);
  }

  componentWillUnmount() {
    PostStore.removeListener("change", this.getPosts);
  }
   
  _handleSubmit(e) {
    e.preventDefault();
  }
	
  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }  
  
  getPosts() {
    this.setState({
      posts: PostStore.getAll(),
    });
  }
  
  createPost() {
      var filename = this.state.file.name;
	  var message = document.getElementById("message").value;
	  var auteur = document.getElementById("auteur").value;
	  if(message != "" && auteur != ""){
		  PostActions.createPost(auteur,message,filename,0);
		  document.getElementById("message").value = "";
	  }
	  this.state.file = "";
	  this.state.imagePreviewUrl = "Aucun fichier choisi";
  }
  
  render() {
    const { posts } = this.state;

    const PostComponents = posts.map((post) => {
        return <Post key={post.id} {...post}/>;
    });
    


    return (
      <div>
        <input id="auteur" type="text" class="form-control" placeholder="Auteur"/>
        <textarea id="message" type="text" class="form-control" placeholder="Entrez votre message ici"/>
        <button class="btn btn-default btn-poster" onClick={this.createPost.bind(this)}>Poster</button>
        <div class="block-image">
			<form onSubmit={(e)=>this._handleSubmit(e)}>
			<label class="btn btn-default btn-primary">
				Parcourir...
			  <input className="fileInput" id="buttonInputFile" type="file" onChange={(e)=>this._handleImageChange(e)} /></label>
			  <button className="btn btn-default btn-primary submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Joindre l'image</button>
			</form>
		</div>
		<br/>
		<div class="panel panel-default panel-posts">
    		{PostComponents}
    	</div>
      </div>
    );
  }
}
