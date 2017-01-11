import React from "react";
import CommentStore from "../stores/CommentStore";
import Comment from "../components/Comment";
import * as CommentActions from "../actions/CommentActions";
import * as PostActions from "../actions/PostActions";

export default class Post extends React.Component {
  constructor(props) {
    super();
    this.refreshComment = this.refreshComment.bind(this);
    this.state = {
    		onEdition:false,
    		comments: CommentStore.getById(props.id),
    };
  }
    
    editPost(){
        this.setState({onEdition:true});
    }
    
    submitEditedPost(){
        var message = document.getElementById("message").value;
        if(message){
            PostActions.editPost(this.props.id,message);
        }
                this.setState({onEdition:false});
    }
    
  componentWillMount() {
	    CommentStore.on("change", this.refreshComment);


        
    }
    
refreshComment() {
	var idP = this.props.id;
	this.setState({
		comments: CommentStore.getById(idP),
	});
}

  addComment(){
	  var idP = this.props.id;
	  var comment = document.getElementById("comment_" + idP).value;
	  var auteur = "Bob";
	  if(comment != ""){
		  CommentActions.addComment(idP, auteur, comment);
		  document.getElementById("comment_" + idP).value = "";
	  }
  }
  
  render() {
    const { id,author,text } = this.props;
    const { comments } = this.state;
    const CommentComponents = comments.map((comment) => {
        return <Comment key={comment.id} {...comment}/>;
    });

    if(this.state.onEdition){return(
    <div>        <p class="author">{author}</p>
        <textarea id="message" type="text" class="form-control" placeholder="Entrez votre message ici" defaultValue={text}></textarea>
        <button onClick={this.submitEditedPost.bind(this)}>Modifier!</button></div>
);
    }else{
    return (
      <div class ="panel-body post-content">
        <button class="pull-right" onClick={this.editPost.bind(this)}><span class="glyphicon glyphicon-pencil"></span></button>
        <p class="author">{author}</p>
        <p class="post-content-text">{text}</p>
        <hr/>
        <div class ="panel-body post-comment">{CommentComponents}</div>
        <div>
        	<input id={'comment_' + id} type="text" class="form-control input-comment" placeholder="Entrez un commentaire ici..."/>
        	<button onClick={this.addComment.bind(this)} class="btn btn-default btn-commenter">Commenter</button>
        </div>
      </div>
    );
    }
  }
}
