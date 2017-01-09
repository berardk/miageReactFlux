import React from "react";
import CommentStore from "../stores/CommentStore";
import Comment from "../components/Comment";

export default class Post extends React.Component {
  constructor(props) {
    super();
    this.state = {
    		comments: CommentStore.getById(props.id),
    };
  }

  render() {
    const { author,text } = this.props;
    const { comments } = this.state;
    
    const CommentComponents = comments.map((comment) => {
        return <Comment key={comment.id} {...comment}/>;
    });

    return (
      <div class ="panel-body post-content">
        <p class="author">{author}</p>
        <p class="post-content-text">{text}</p>
        <div>
        	<input id="comment" type="text" class="form-control input-comment" placeholder="Entrez un commentaire ici..."/>
        	<button class="btn btn-default btn-commenter">Commenter</button>
        </div>
        <div>{CommentComponents}</div>
      </div>
    );
  }
}
