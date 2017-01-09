import React from "react";

export default class Comment extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { idPost, author, text } = this.props;

    return (
      <p><span class="comment-author" >{author}</span> : <span class="post-comment-text">{text}</span></p>
    );
  }
}
