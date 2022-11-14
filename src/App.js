import React from 'react'
import { Routes,Route, Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Nav from './components/Nav';
import MainPage from './routes/MainPage';
import DetailPage from './routes/DetailPage';
import SearchPage from './routes/SearchPage';
import './styles/App.scss'
import LoginPage from './routes/LoginPage';
import SignUp from './routes/SignUp';
import Info from './routes/Info';

const Layout = () =>{
  return(
    <div>
      <Nav />
      <Outlet />
      <Footer />
    </div>
  )
}

function App() {

  return (
    <div className='app'>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<MainPage />} />
          <Route path='detail/:movieId' element={<DetailPage />} />
          <Route path='search' element={<SearchPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/Info' element={<Info />} />
       </Routes>
    </div>
  );
}

export default App;
