import React, { Component } from 'react';
import PDFViewer from './components/PDFViewer';
import CommentSystem from './components/CommentSystem';
import TextHighlighter from './components/TextHighlighter';
import CommentExporter from './components/CommentExporter';
import GPTIntegration from './utils/GPTIntegration';
import * as PDFManipulation from './utils/PDFManipulation';
import * as OCR from './utils/OCR';
import './styles/App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pdf: null,
      comments: [],
    };
  }

  handlePDFImport = (pdf) => {
    this.setState({ pdf });
  };

  handleCommentAdd = (comment) => {
    this.setState((prevState) => ({
      comments: [...prevState.comments, comment],
    }));
  };

  handleCommentEdit = (commentId, updatedComment) => {
    this.setState((prevState) => {
      const updatedComments = prevState.comments.map((comment) => {
        if (comment.id === commentId) {
          return updatedComment;
        }
        return comment;
      });
      return { comments: updatedComments };
    });
  };

  handleCommentDelete = (commentId) => {
    this.setState((prevState) => ({
      comments: prevState.comments.filter((comment) => comment.id !== commentId),
    }));
  };

  render() {
    const { pdf, comments } = this.state;

    return React.createElement(
      'div',
      { className: 'App' },
      React.createElement(
        PDFViewer,
        { pdf, onPDFImport: this.handlePDFImport, comments },
      ),
      React.createElement(CommentSystem, {
        onCommentAdd: this.handleCommentAdd,
        onCommentEdit: this.handleCommentEdit,
        onCommentDelete: this.handleCommentDelete,
        comments,
      }),
      React.createElement(TextHighlighter, { pdf, comments }),
      React.createElement(CommentExporter, { pdf, comments }),
      React.createElement(OCR),
      React.createElement(GPTIntegration),
      React.createElement(PDFManipulation),
    );
  }
}
export default App;
