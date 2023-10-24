import { Routes, Route} from 'react-router-dom'

import "./components/styles.css"

import Home from "./pages/Home";
import Create from "./components/create";
import Edit from "./components/edit"
import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';
import PostDisplay from './pages/PostDisplay';

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
          <Route path='/edit/:id' element={<Edit />} />
          <Route path='/postdisplay/:id' element={<PostDisplay />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
