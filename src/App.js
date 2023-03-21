import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/Navbar';
import About from './components/About';
import Home from './components/Home';
import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import NoteState from './context/notes/NoteState';
import AlertState from './context/alerts/AlertState';
import Notes from './components/Notes';

function App() {
  return (
    <>
      {/* Wrap the entire application with the AlertState and NoteState providers */}
      <AlertState>
        <NoteState>
          <BrowserRouter>
            {/* Add the Navbar component to the top of the application */}
            <Navbar />
            {/* Add the Alert component to display alerts */}
            <Alert />
            {/* Create a route for the components */}
            <Routes>
              <Route path="/*" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/notes" element={<Notes />} />
            </Routes>
          </BrowserRouter>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
