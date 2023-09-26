import { BrowserRouter, Routes, Route} from 'react-router-dom'

import Home from "./pages/Home";
import CreatePost from "./pages/createpost";
import NoPage from './pages/NoPage';
import NavBar from './components/NavBar';
import "./components/styles.css"

function App() {
  return (
    <div>
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<Home/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/createpost' element={<CreatePost />} />
          <Route path='*' element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
