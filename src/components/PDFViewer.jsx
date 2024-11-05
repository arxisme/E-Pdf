import { useState, useRef } from 'react';

import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = "https://cdn.jsdelivr.net/npm/pdfjs-dist@4.4.168/build/pdf.worker.min.mjs";

const PDFViewer = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pdfFile, setPdfFile] = useState(null);
  const [scale, setScale] = useState(1);
  const fileInputRef = useRef(null);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(URL.createObjectURL(file));
      setPageNumber(1);
    }
  };

  const handleDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const nextPage = () => {
    setPageNumber((prevPage) => (prevPage + 1 <= numPages ? prevPage + 1 : prevPage));
  };

  const previousPage = () => {
    setPageNumber((prevPage) => (prevPage - 1 >= 1 ? prevPage - 1 : prevPage));
  };

  const zoomIn = () => {
    setScale((prevScale) => Math.min(prevScale + 0.2, 2));
  };

  const zoomOut = () => {
    setScale((prevScale) => Math.max(prevScale - 0.2, 0.6));
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      {/* Toolbar */}
      <div className="flex flex-wrap gap-4 items-center mb-6 max-h-1000">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileUpload}
          accept="application/pdf"
          className="hidden"
        />
        <button
          onClick={() => fileInputRef.current.click()}
          className="px-4 py-2 bg-slate-800  hover:bg-slate-700 text-white rounded  transition-colors"
        >
          Upload PDF
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={zoomOut}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            -
          </button>
          <span className="min-w-[60px] text-center">{Math.round(scale * 100)}%</span>
          <button
            onClick={zoomIn}
            className="px-3 py-1 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* PDF Display Area */}
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
            Upload a PDF to get started
          </div>
        )}
      </div>

      {/* Navigation Controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={previousPage}
          disabled={!pdfFile || pageNumber <= 1}
          className="px-4 py-2  bg-slate-800 rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span className="text-sm">
          Page {pageNumber} of {numPages || '--'}
        </span>
        <button
          onClick={nextPage}
          disabled={!pdfFile || pageNumber >= numPages}
          className="px-4 py-2 bg-slate-800 rounded hover:bg-slate-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PDFViewer;
