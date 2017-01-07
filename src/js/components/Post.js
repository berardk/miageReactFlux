import React from "react";

export default class Post extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    const { text } = this.props;

    return (
      <div>
        <span>{text}</span>
      </div>
    );
  }
}
