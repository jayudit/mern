//this is where the main frontend code goes
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'//bring in browserRouter: helps define routes, handle navigation, and rending different components based on the URL paths 
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Register from './pages/Register'



function App() {
  return (  
    <>
      <Router>
        <div className='container'>
          <Header />
          <Routes>
            <Route path = '/' element={<Dashboard />} />
            <Route path = '/login' element={<Login />} />
            <Route path = '/register' element={<Register />} />
          </Routes>
        </div>
      </Router>
      <ToastContainer />
    </>
  );
}

export default App;
