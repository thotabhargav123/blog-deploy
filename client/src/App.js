import './App.css';
import Login from './components/accounts/Login'
import DataProvider from './context/DataProvider';
import Home from './components/Home/Home';
import Header from './components/Header/Header'
import { BrowserRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom'
import { useState } from 'react';
import CreatePost from './components/create/CreatePost';
import Detailview from './components/details/Detailview';
import Update from './components/create/Updatepost';
import Contact from './components/contact/Contact';
const PrivateRoute = ({ isAuthenticated, ...props }) => {
  return isAuthenticated ?
    <>
      <Header />
      <Outlet />
    </>
    : <Navigate replace to='/login' />
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div>
      <DataProvider>
        <BrowserRouter>
          <div style={{ marginTop: 70 }}>
            <Routes>
              <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
              <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path="/" element={<Home />} />
              </Route>
              <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path="/create" element={<CreatePost />} />
              </Route>
              <Route path='/details/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path="/details/:id" element={<Detailview />} />
              </Route>
              <Route path='/update/:id' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path="/update/:id" element={<Update />} />
              </Route>
              <Route path='/contact' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
                <Route path='/contact' element={<Contact />} />
              </Route>
            </Routes>

          </div>
        </BrowserRouter>
      </DataProvider>

    </div>
  );
}

export default App;
