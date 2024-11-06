import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import TurndownService from 'turndown'; 

const TextEditor = () => {
  // State to hold the content of the 5editor
  const [html, setHtml] = useState('Write your content here...');
  const turndownService = new TurndownService(); // Instance of Turndown for converting HTML to Markdown

  // Function to handle changes in the editor and update the state
  const onChange = (value) => {
    setHtml(value);
  };

  // Function to open a new window and print the content as a PDF
  const printContent = () => {
    const printWindow = window.open('', '_blank'); // Open a new blank window/tab
    printWindow.document.write(`
      <html>
        <head>
          <title>Print Document</title>
          <style>
            body { font-family: Arial, sans-serif; padding: 20px; }
          </style>
        </head>
        <body>${html}</body>
      </html>
    `); // Write the content along with basic styling
    printWindow.document.close(); // Close the document to complete the content writing
    printWindow.print(); // Trigger the print dialog
  };

  // Function to export the editor content to a Markdown file
  const exportToMarkdown = () => {
    const markdown = turndownService.turndown(html); // Convert the HTML content to Markdown

    // Create a Blob object for the Markdown content
    const blob = new Blob([markdown], { type: 'text/markdown' });

    // Create a temporary download link and trigger the download
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob); // Generate a temporary URL for the Blob
    link.download = `document.md`; // Set the filename for download
    link.click(); // Programmatically click the link to trigger download

    // Release the object URL after download
    URL.revokeObjectURL(link.href);
  };

  return (
    <div className='h-screen flex flex-col'>
      {/* Container for the buttons */}
      <div className='flex justify-between w-full mx-auto p-4'>
        <button
          className='px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors'
          onClick={exportToMarkdown}
        >
          Export Markdown
        </button>
        <button
          className='px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors'
          onClick={printContent}
        >
          Save As PDF
        </button>
      </div>

      {/* The main editor area */}
      <div className='h-full'>
        <ReactQuill
          value={html} // Set the value of the editor
          onChange={onChange} // Handle changes in the editor
          theme="snow" // Use the 'snow' theme for a clean appearance
          placeholder="" // Placeholder text when the editor is empty
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered' }, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean'] // Option to remove formatting
            ]
          }}
          style={{
            maxHeight: "800px", // Max height for the editor
            overflowY: "auto", // Vertical scrollbar for overflow
            margin: "8px", // Outer margin
            borderRadius: "10px" // Rounded corners for better aesthetics
          }}
        />
      </div>
    </div>
  );
};

export default TextEditor;
