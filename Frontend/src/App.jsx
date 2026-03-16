import {BrowserRouter , Route , Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import SinglePost from './pages/SinglePost'

const App = () => {
  return (
     <BrowserRouter>
         <Routes>
             <Route path='/' element={<Home />} />
             <Route path='/login' element={<Login />} />
             <Route path='/register' element={<Register />} />
             <Route path='/post/:id' element={<SinglePost />} />
         </Routes>
     </BrowserRouter>
  )
}

export default App
