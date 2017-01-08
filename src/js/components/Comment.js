import React from "react";

export default class Comment extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { idPost, author, text } = this.props;

    return (
      <div class ="panel-body post-comment">
        <p class="comment-author">{author}</p>
        <p class="post-comment-text">{text}</p>
      </div>
    );
  }
}
