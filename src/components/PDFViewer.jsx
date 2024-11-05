import { useState, useRef } from 'react';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the PDF.js worker source to load PDFs
pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

const PDFViewer = () => {
  // State variables to manage PDF data, page number, and scale
  const [numPages, setNumPages] = useState(null); // Total number of pages in the PDF
  const [pageNumber, setPageNumber] = useState(1); // Current page number
  const [pdfFile, setPdfFile] = useState(null); // URL of the uploaded PDF file
  const [scale, setScale] = useState(1); // Scale for zoom functionality
  const fileInputRef = useRef(null); // Reference to the hidden file input

  // Handle file upload and set the PDF source
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(URL.createObjectURL(file)); // Create a URL for the uploaded file
      setPageNumber(1); // Reset to the first page on upload
    }
  };

  // Handle the success event of PDF document load
  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // Set the total number of pages
  };

  // Navigate to the next page if it exists
  const nextPage = () => {
    setPageNumber((prevPage) => (prevPage + 1 <= numPages ? prevPage + 1 : prevPage));
  };

  // Navigate to the previous page if it exists
  const previousPage = () => {
    setPageNumber((prevPage) => (prevPage - 1 >= 1 ? prevPage - 1 : prevPage));
  };

  // Increase the zoom level up to a maximum scale of 2
  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2));
  };

  // Decrease the zoom level down to a minimum scale of 0.6
  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Toolbar section */}
      <div className="flex flex-wrap gap-4 items-center mb-6 max-h-1000">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/pdf"
          className="hidden" // Hide the file input
        />
        <button
          onClick={() => fileInputRef.current.click()} // Trigger the hidden file input
          className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors"
        >
          Upload PDF
        </button>

        {/* Zoom controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="min-w-[60px] text-center">{Math.round(scale * 100)}%</span> {/* Display current zoom level */}
          <button
            onClick={zoomIn}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF display section */}
      <div className="border border-gray-200 rounded-lg bg-gray-50 p-4 min-h-[600px]">
        {pdfFile ? (
          <Document
            file={pdfFile}
            onLoadSuccess={handleDocumentLoadSuccess}
            className="flex justify-center"
          >
            <Page pageNumber={pageNumber} scale={scale} className="shadow-lg" />
          </Document>
        ) : (
          <div className="flex items-center justify-center h-[600px] text-gray-500">
            Upload a PDF to get started {/* Placeholder message when no file is uploaded */}
          </div>
        )}
      </div>

      {/* Page navigation controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={previousPage}
          disabled={!pdfFile || pageNumber <= 1} // Disable if no PDF or on the first page
          className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {pageNumber} of {numPages || '--'} {/* Display current page and total pages */}
        </span>
        <button
          onClick={nextPage}
          disabled={!pdfFile || pageNumber >= numPages} // Disable if no PDF or on the last page
          className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
