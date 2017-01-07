import React from "react";

export default class Post extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { author,text } = this.props;

    return (
      <div class ="panel-body post-content">
        <p class="author">{author}</p>
        <p class="post-content-text">{text}</p>
      </div>
    );
  }
}
