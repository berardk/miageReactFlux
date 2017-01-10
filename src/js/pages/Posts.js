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
    console.log('handle uploading-', this.state.file);
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

  reloadPosts() {
    PostActions.reloadPosts();
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
        <div class="panel panel-default essai">
        	{PostComponents}
        </div>
        <input id="auteur" type="text" class="form-control" placeholder="Auteur"/>
        <textarea id="message" type="text" class="form-control" placeholder="Entrez votre message ici"/>
		<div className="previewComponent">
			<form onSubmit={(e)=>this._handleSubmit(e)}>
			  <input className="fileInput" id="buttonInputFile" type="file" onChange={(e)=>this._handleImageChange(e)} />
			  <button className="submitButton" type="submit" onClick={(e)=>this._handleSubmit(e)}>Joindre l'image</button>
			</form>
		</div>
		<br />
        <button onClick={this.createPost.bind(this)}>Ajouter!</button>
      </div>
    );
  }
}
