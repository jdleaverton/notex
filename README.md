# Notex - A PDF Reader with Commenting System

Notex is a standalone PDF reader application for Windows, Mac, and Web platforms. It is built using a JavaScript framework and allows users to import PDFs, add comments tied to specific text or diagrams, and have the comments scroll alongside the PDF content.

## Features

- **PDF Importing and Rendering**: Import PDFs and render them within the application using PDF.js. Basic PDF navigation features like zoom, pan, and page scrolling are also available.
- **Commenting System**: An intuitive commenting UI allowing users to add, edit, and delete comments. Comments are tied to specific text or diagrams within the PDF and scroll in sync with the PDF document.
- **Comment and Text Highlighting**: Highlight associated comments when the cursor hovers over a text block in the PDF and vice versa.
- **Comment Formatting and Positioning**: Use Optical Character Recognition (OCR) with Tesseract.js to identify the farthest right piece of text, setting the document margin. Comment positioning and formatting rules are implemented as specified in the initial brief.
- **GPT Integration**: Integrate GPT (e.g., OpenAI's GPT-3) to provide smart suggestions, summarizations, or other NLP features within the commenting system.
- **Exporting Comments**: Export comments into the PDF so they are saved and can be viewed in other PDF readers. This is done using jsPDF or pdf-lib to manipulate PDF files and save comments.
- **Responsive Design**: The application is responsive and usable across different screen sizes and platforms (Windows, Mac, Web).

## Technical Stack

- **Frontend**: React.js for building the UI, with PDF.js for PDF rendering.
- **OCR**: Tesseract.js for Optical Character Recognition.
- **GPT Integration**: OpenAI's GPT-3 for providing smart suggestions within the commenting system.
- **PDF Manipulation**: jsPDF or pdf-lib for exporting comments into the PDF.
- **Testing**: Jest for testing the application.
- **Version Control**: Git for version control.
- **CI/CD**: Travis CI for continuous integration and deployment.

## Project Structure

```
.
├── README.md
├── .gitignore
├── package.json
├── src
│   ├── index.js
│   ├── App.js
│   ├── components
│   │   ├── PDFViewer.js
│   │   ├── CommentSystem.js
│   │   ├── TextHighlighter.js
│   │   └── CommentExporter.js
│   ├── utils
│   │   ├── OCR.js
│   │   ├── GPTIntegration.js
│   │   └── PDFManipulation.js
│   └── styles
│       └── App.css
├── tests
│   └── App.test.js
└── .travis.yml
```

## Installation

Clone the repository:

```
git clone https://github.com/jdleaverton/Notex.git
```

Install dependencies:

```
npm install
```

Start the application:

```
npm start
```

## Testing

Run tests with Jest:

```
npm test
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
