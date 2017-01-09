import React from "react";
import CommentStore from "../stores/CommentStore";
import Comment from "../components/Comment";
import * as CommentActions from "../actions/CommentActions";

export default class Post extends React.Component {
  constructor(props) {
    super();
    this.refreshComment = this.refreshComment.bind(this);
    this.state = {
    		comments: CommentStore.getById(props.id),
    };
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

    return (
      <div class ="panel-body post-content">
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
