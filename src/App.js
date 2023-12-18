import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import DetailNFT from './pages/DetailNFT';
import Create from './pages/Create';
<<<<<<< HEAD
import Sell from './pages/Sell';
=======
import Account from './pages/Account';
>>>>>>> 8e1fa685d335cedd507673f2feefa2466eb92fa6

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/nft/:id' element={<DetailNFT />} />
        <Route path='/create' element={<Create />} />
<<<<<<< HEAD
        <Route path='/sell' element={<Sell />} />
=======
        <Route path='/account' element={<Account />} />
>>>>>>> 8e1fa685d335cedd507673f2feefa2466eb92fa6
      </Route>
    </Routes>
  );
}

export default App;
