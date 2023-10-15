import { Routes, Route} from 'react-router-dom'

import "./components/styles.css"

import Home from "./pages/Home";
import CreatePost from "./pages/createpost";
import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';
import PostDisplay from './pages/PostDisplay';

function App() {
  return (
    <div>
      <NavBar />
      <div>
        <Routes>
          <Route index element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='/postdisplay' element={<PostDisplay price='300' start='08/30/1900' end='08/30/2024' distance='18000' />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App;
