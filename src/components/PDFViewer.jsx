import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import pdfjs from 'pdfjs-dist';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1,
    };
  }

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };

  goToPrevPage = () => {
    this.setState((prevState) => ({ pageNumber: prevState.pageNumber - 1 }));
  };

  goToNextPage = () => {
    this.setState((prevState) => ({ pageNumber: prevState.pageNumber + 1 }));
  };

  render() {
    const { pdf } = this.props;
    const { numPages, pageNumber } = this.state;

    return (
      <div>
        <Document
          file={pdf}
          onLoadSuccess={this.onDocumentLoadSuccess}
        >
          <Page pageNumber={pageNumber} />
        </Document>
        <div>
          <p>
            Page
            {pageNumber}
            of
            {numPages}
          </p>
          <button type="button" onClick={this.goToPrevPage} disabled={pageNumber <= 1}>Prev</button>
          <button type="button" onClick={this.goToNextPage} disabled={pageNumber >= numPages}>Next</button>
        </div>
      </div>
    );
  }
}

PDFViewer.propTypes = {
  pdf: PropTypes.instanceOf(File).isRequired,
};

export default PDFViewer;
