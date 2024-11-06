import './App.css'
import PdfEditor from './components/PdfEditor';

import TextEditor from './components/TextEditor'
function App() {
  return (
    <div className="flex w-full max-h-screen ">

      <div className="w-1/2">
        <PdfEditor/>
      </div>
      <div className="w-1/2">
        <TextEditor />
      </div>
    </div>


  );
}

export default App;

