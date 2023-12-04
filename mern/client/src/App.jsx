import { Routes, Route} from 'react-router-dom'

import "./components/styles.css"

import Home from "./pages/Home";
import Create from "./pages/CreatePost";
import Edit from "./pages/EditPost"
import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';
import PostDisplay from './pages/PostDisplay';
import LoginPage from './pages/Login';
import Profile from './pages/Profile';
import CreateProfile from './pages/CreateProfile';
import EditProfile from './components/editProfile';
import Settings from './pages/Settings';
import { ContactUs } from './pages/Contact';

function App() {
  return (
    <div>
      <NavBar />
      <div>
        {/* Set up Routes for links */}
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createpost' element={<Create />} />
          <Route path='/editpost/:id' element={<Edit />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/postdisplay/:id' element={<PostDisplay />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/createprofile' element={<CreateProfile />} />          
          <Route path='/editprofile/:id' element={<EditProfile />} />          
          <Route path='/settings' element={<Settings />} />
          <Route path='/contact' element={<ContactUs />} />
          <Route path='*' element={<NoPage />} /> 
        </Routes>
      </div>
    </div>
  )
}

export default App;
