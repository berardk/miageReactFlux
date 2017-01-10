import React from "react";
import * as PostActions from "../actions/PostActions";

export default class Post extends React.Component {
  constructor(props) {
    super();
      this.state={onEdition:false};
      
  }
    
    editPost(){
        console.log(this.props);
        this.setState({onEdition:true});
        console.log(this.state);
    }
    
    submitEditedPost(){
        var message = document.getElementById("message").value;
        if(message){
            PostActions.editPost(this.props.id,message);
        }
                this.setState({onEdition:false});

        
    }
	
	addLike(id,nblike) {
	  PostActions.addLike(id,nblike);
  }
  
  deletePost(id) {
	  PostActions.deletePost(id);
  }
    
  render() {
    const { id,author,text,image,nblike } = this.props;
	
	var img = "";
	if(image) {
		img = 'img/'+image;
	}
	
	if(this.state.onEdition){return(
		<div>        <p class="author">{author}</p>
			<textarea id="message" type="text" class="form-control" placeholder="Entrez votre message ici">{text}</textarea>
			<button onClick={this.submitEditedPost.bind(this)}>Modifier!</button></div>
	);
    }else{
    return (
      <div class ="panel-body post-content">
        <button class="pull-right" onClick={this.editPost.bind(this)}><span class="glyphicon glyphicon-pencil"></span></button>
		<button class="pull-right btn btn-danger btn-xs" onClick={this.deletePost.bind(this,id)}> X </button>
        <p class="author">{author}</p>
        <p class="post-content-text">{text}</p>
		<img src={img} />
		<button className="submitButton" type="submit" class="btn btn-success btn-xs" onClick={this.addLike.bind(this,id,nblike)}>LIKE</button> {nblike} like
      </div>
    );
    }
  }
}
