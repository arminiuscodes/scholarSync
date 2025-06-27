import React from 'react'
import Navbar from './components/Navbar.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import Homepage from './components/Homepage.jsx'
import CreateStudent from './components/CreateStudent.jsx'
import ViewStudents from './components/ViewStudents.jsx'
import { Route,Routes } from 'react-router-dom'

const App = () => {
  return (
    <>
    <Navbar/>
    <Routes>
      <Route path='/' element={<Homepage/>}></Route>
      <Route path='/signup'element={<Signup/>}></Route>
      <Route path='/login'element={<Login/>}></Route>
      <Route path='/create'element={<CreateStudent/>}></Route>
      <Route path='/students' element={<ViewStudents/>}></Route>
    </Routes>
    </>
  )
}

export default App