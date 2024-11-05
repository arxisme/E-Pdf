import './App.css'
import  PDFViewer  from './components/PDFViewer'
import TextEditor from './components/TextEditor'
function App() {
  return (
    <div className="flex w-full max-h-screen ">

      <div className="w-1/2">
        <PDFViewer />
      </div>
      <div className="w-1/2">
        <TextEditor />
      </div>
    </div>


  );
}

export default App;

