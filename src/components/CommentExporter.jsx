import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PDFDocument } from 'pdf-lib';

class CommentExporter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      exporting: false,
    };
  }

  handleExportComments = async () => {
    const { pdf, comments } = this.props;
    this.setState({ exporting: true });

    try {
      const pdfDoc = await PDFDocument.load(pdf);
      const pages = pdfDoc.getPages();

      comments.forEach((comment) => {
        const page = pages[comment.page];
        const { x, y } = comment.position;
        page.drawText(comment.text, { x, y });
      });

      const pdfBytes = await pdfDoc.save();
      const blob = new Blob([pdfBytes], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      const link = document.createElement('a');
      link.href = url;
      link.download = 'exported_comments.pdf';
      link.click();

      this.setState({ exporting: false });
    } catch (error) {
      console.error('Failed to export comments:', error);
      this.setState({ exporting: false });
    }
  };

  render() {
    const { exporting } = this.state;

    return (
      <div>
        <button type="button" onClick={this.handleExportComments} disabled={exporting}>
          {exporting ? 'Exporting...' : 'Export Comments'}
        </button>
      </div>
    );
  }
}

CommentExporter.propTypes = {
  pdf: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    page: PropTypes.number.isRequired,
    position: PropTypes.shape({
      x: PropTypes.number.isRequired,
      y: PropTypes.number.isRequired,
    }).isRequired,
    text: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentExporter;
