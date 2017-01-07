import React from "react";

export default class Post extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { author,text } = this.props;

    return (
      <div>
        <p>{author}<br/>{text}</p>
      </div>
    );
  }
}
