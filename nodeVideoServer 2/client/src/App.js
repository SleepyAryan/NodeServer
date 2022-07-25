import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import SignIn from './components/Form/SignIn/SignIn';
import SignUp from './components/Form/SignUp/SignUp';
import Upload from './components/Upload/upload'
import VideoPlayer from './components/VideoPlayer/VideoPlayer';
function App() {
  return (
    <Routes>
    <Route exact path="/signUp" element={<SignUp/>}/>
    <Route exact path="/signIn" element={<SignIn/>}/>
    <Route exact path="/upload" element={<Upload/>}/>
    <Route exact path="/" element={<Dashboard/>}/>
    <Route exact path="/video/:videoTitle" element={<VideoPlayer/>}/>
    </Routes>
  );
}

export default App;
