import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import DetailNFT from './pages/DetailNFT';
import Create from './pages/Create';
import Sell from './pages/Sell';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/nft/:id' element={<DetailNFT />} />
        <Route path='/create' element={<Create />} />
        <Route path='/sell' element={<Sell />} />
      </Route>
    </Routes>
  );
}

export default App;
