import React, { Component } from 'react';
import PropTypes from 'prop-types';

class TextHighlighter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      highlightedText: null,
    };
  }

  handleTextHover = (text) => {
    this.setState({ highlightedText: text });
  };

  render() {
    const { pdf, comments } = this.props;
    const { highlightedText } = this.state;

    return (
      <div>
        {pdf && pdf.textContents.map((text) => (
          <p
            key={text}
            onMouseEnter={() => this.handleTextHover(text)}
            onMouseLeave={() => this.handleTextHover(null)}
            style={highlightedText === text ? { backgroundColor: 'yellow' } : {}}
          >
            {text}
          </p>
        ))}
        {comments.map((comment) => (
          <p
            key={comment.text}
            style={highlightedText === comment.text ? { backgroundColor: 'lightblue' } : {}}
          >
            {comment.text}
          </p>
        ))}
      </div>
    );
  }
}

TextHighlighter.propTypes = {
  pdf: PropTypes.instanceOf(File).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default TextHighlighter;
