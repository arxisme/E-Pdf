import { useRef, useState } from 'react';
import { PDFDocument } from 'pdf-lib';

function PdfEditor() {
  const [pdfUrl, setPdfUrl] = useState(null);
  const fileinputref = useRef(null);

  const loadAndEditPdf = async (file) => {
    const fileReader = new FileReader();

    fileReader.onload = async (e) => {
      const pdfDoc = await PDFDocument.load(e.target.result);
      const pdfBytes = await pdfDoc.save();
      const pdfBlob = new Blob([pdfBytes], { type: 'application/pdf' });
      const pdfUrl = URL.createObjectURL(pdfBlob);
      setPdfUrl(pdfUrl);
    };

    fileReader.readAsArrayBuffer(file);
  };
  const handleButtonClick = () => {
    fileinputref.current.click();
  }

  return (
    <div className="flex flex-col items-center pl-12">
      <div className='w-full justify-start'>
      <button
        className='px-4 py-2 m-2 bg-slate-800 hover:bg-slate-700 text-white rounded transition-colors'
        onClick={handleButtonClick}
      >Upload Pdf</button>
      <input
        style={{ display: "none" }}
        type="file"
        accept="application/pdf"
        onChange={(e) => {
          if (e.target.files.length > 0) {
            loadAndEditPdf(e.target.files[0]);
          }
        }}
        ref={fileinputref}
      />
      </div>
      {pdfUrl && (
        <iframe
          style={{ borderRadius: "10px" }}
          src={pdfUrl}
          title="Edited PDF Preview"
          className="w-full h-[93vh] border border-gray-400"
        />
      )}
    </div>
  );
}

export default PdfEditor;
