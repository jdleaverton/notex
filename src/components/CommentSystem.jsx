import React, { Component } from 'react';
import PropTypes from 'prop-types';

class CommentSystem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
    };
  }

  handleCommentChange = (event) => {
    this.setState({ comment: event.target.value });
  };

  handleCommentSubmit = (event) => {
    event.preventDefault();
    const { comment } = this.state;
    const { onCommentAdd } = this.props;
    if (comment) {
      onCommentAdd(comment);
      this.setState({ comment: '' });
    }
  };

  handleCommentEdit = (commentId) => {
    const { comments, onCommentEdit } = this.props;
    const comment = comments.find((c) => c.id === commentId);
    if (comment) {
      const updatedComment = prompt('Edit comment', comment.text);
      if (updatedComment) {
        onCommentEdit(commentId, updatedComment);
      }
    }
  };

  handleCommentDelete = (commentId) => {
    this.setState({ showConfirmDialog: true, commentToDelete: commentId });
  };

  confirmDelete = () => {
    const { onCommentDelete } = this.props;
    const { commentToDelete } = this.state;
    onCommentDelete(commentToDelete);
    this.setState({ showConfirmDialog: false, commentToDelete: null });
  };

  cancelDelete = () => {
    this.setState({ showConfirmDialog: false, commentToDelete: null });
  };

  render() {
    const { comment, showConfirmDialog } = this.state;
    const { comments } = this.props;

    return (
      <div>
        {showConfirmDialog && (
          <div>
            <p>Are you sure you want to delete this comment?</p>
            <button type="button" onClick={this.confirmDelete}>Yes</button>
            <button type="button" onClick={this.cancelDelete}>No</button>
          </div>
        )}
        <form onSubmit={this.handleCommentSubmit}>
          <input
            type="text"
            value={comment}
            onChange={this.handleCommentChange}
            placeholder="Add a comment"
          />
          <button type="submit">Submit</button>
        </form>
        <ul>
          {comments.map((c) => (
            <li key={c.id}>
              {c.text}
              <button type="button" onClick={() => this.handleCommentEdit(c.id)}>Edit</button>
              <button type="button" onClick={() => this.handleCommentDelete(c.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

CommentSystem.propTypes = {
  onCommentAdd: PropTypes.func.isRequired,
  onCommentEdit: PropTypes.func.isRequired,
  onCommentDelete: PropTypes.func.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentSystem;
