import Navbar from './Components/Navbar/Navbar'
import NoteList from './Components/Note/NoteData/NoteList';
import { ToastContainer } from 'react-toastify';

function App() {

  return (
 <>
      <Navbar />
  
      <NoteList/>
      <ToastContainer />
 </>
  );
}

export default App;
