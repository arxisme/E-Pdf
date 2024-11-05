
import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; 
import TurndownService from 'turndown';

const TextEditor = () => {
  const [html, setHtml] = useState('Write your content here...');
  const turndownService = new TurndownService();

  const onChange = (value) => {
    setHtml(value);
  };
  const printContent = () => {
    const printWindow = window.open('', '_blank');
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
    `);
    printWindow.document.close();
    printWindow.print();
  };

  const exportToMarkdown = () => {
    const markdown = turndownService.turndown(html);

    
    const blob = new Blob([markdown], { type: 'text/markdown' });

    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `document.md`;
    link.click();

    URL.revokeObjectURL(link.href);
  };

  return (
    <div className='h-screen flex flex-col  '>
      <div className='flex justify-between w-full  mx-auto p-4 '>
        <button
          className='px-4 py-2 bg-slate-800  hover:bg-slate-700 text-white rounded  transition-colors'
          onClick={exportToMarkdown}
        >
          Export Markdown
        </button>
        <button
          className='px-4 py-2 bg-slate-800  hover:bg-slate-700 text-white rounded  transition-colors'
          onClick={printContent}
        >
          Save As pdf
        </button>
      </div>
      <div className='h-full'>
        <ReactQuill
          value={html}
          
          onChange={onChange}
          theme="snow" 
          placeholder=""
          modules={{
            toolbar: [
              [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
              [{ 'list': 'ordered'}, { 'list': 'bullet' }],
              ['bold', 'italic', 'underline', 'strike', 'blockquote'],
              [{ 'color': [] }, { 'background': [] }],
              [{ 'align': [] }],
              ['link', 'image'],
              ['clean'] 
            ]
          }}
          style={{maxHeight:"800px" , overflowY:"auto" , margin:"8px" , borderRadius:"10px"}}
        />
      </div>
      
    </div>
  );
};

export default TextEditor;
