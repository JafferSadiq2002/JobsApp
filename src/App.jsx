
import './App.css'
import Login from './components/Login/index.jsx'
import Home from './components/Home/index.jsx'
import Jobs from './components/Jobs/index.jsx'
import JobItemDetails from './components/JobItemDetails/index.jsx'
import NotFound from './components/NotFound/index.jsx'
import ProtectedRoute from './components/ProtectedRoute/index.jsx'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
const App = () => {
  return (
    <div className='app-container'>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login/>} />
          <Route exact path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route exact path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
          <Route exact path="/jobs/:id" element={<ProtectedRoute><JobItemDetails /></ProtectedRoute>} />
          <Route path = '*' element ={<NotFound />} />
        </Routes>
      </Router>
    </div>
    
  )
}

export default App
