import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import DetailNFT from './pages/DetailNFT';
import Create from './pages/Create';
import Account from './pages/Account';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/nft/:id' element={<DetailNFT />} />
        <Route path='/create' element={<Create />} />
        <Route path='/account' element={<Account />} />
      </Route>
    </Routes>
  );
}

export default App;
