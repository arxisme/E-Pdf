# PDF Viewer & Text Editor

A modern web application that combines PDF viewing capabilities with a feature-rich text editor. This application allows users to view PDFs and take notes simultaneously in a split-screen interface, perfect for research, study, or document analysis.

## 🌟 Features

### PDF Viewer
- 📄 Upload and view PDF documents
- 🔍 Zoom in/out functionality
- 📱 Responsive page navigation
- 📑 Page tracking and navigation controls
- 🎯 Clean and intuitive user interface

### Text Editor
- ✍️ Rich text editing capabilities
- 📝 Multiple formatting options
- 💾 Export notes to Markdown
- 🖨️ Print functionality
- 🎨 Customizable text styling

## 🛠️ Technologies Used

- **React**: Frontend framework
- **PDF.js**: Mozilla's PDF viewer library
- **React-PDF**: React wrapper for PDF.js
- **React-Quill**: Rich text editor component
- **Turndown**: HTML to Markdown converter
- **Tailwind CSS**: Utility-first CSS framework

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/arxisme/E-Pdf

# Navigate to project directory
cd E-pdf

# Install dependencies
npm install

# Start the development server
npm run dev
```

## 💻 Usage

1. **PDF Viewer:**
   - Click "Upload PDF" to load your document
   - Use zoom controls to adjust view
   - Navigate between pages using Previous/Next buttons
   - Current page and total pages are displayed

2. **Text Editor:**
   - Use the rich text toolbar for formatting
   - Export your notes to Markdown
   - Print or save your notes as PDF
   - Supports various text formatting options

## 🔧 Dependencies

```json
{
  "react-pdf": "^7.x",
  "react-quill": "^2.x",
  "turndown": "^7.x"
}
```

## 📝 Key Components

### PDFViewer
- Handles PDF file uploads
- Manages page navigation
- Controls zoom functionality
- Built using react-pdf/pdfjs

### TextEditor
- Rich text editing interface
- Markdown export capability
- Print functionality
- Built using React-Quill

## 🎨 Styling

The application uses Tailwind CSS for styling with a clean, modern interface. The layout is split into two equal sections:
- Left side: PDF Viewer
- Right side: Text Editor

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check [issues page](your-issues-url).

## 📄 License

This project is [MIT](LICENSE) licensed.

## 🙏 Acknowledgments

- [PDF.js](https://mozilla.github.io/pdf.js/) by Mozilla
- [React-Quill](https://github.com/zenoamaro/react-quill)
- [Turndown](https://github.com/mixmark-io/turndown)