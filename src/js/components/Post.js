import React from "react";
import * as PostActions from "../actions/PostActions";

export default class Post extends React.Component {
  constructor(props) {
    super();
      this.state={onEdition:false};
      
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
    
  render() {
    const { author,text } = this.props;
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
      </div>
    );
    }
  }
}
