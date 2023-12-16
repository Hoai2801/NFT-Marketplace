import { Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './pages/Home';
import Layout from './pages/Layout';
import DetailNFT from './pages/DetailNFT';

function App() {
  return (
    <Routes>
      <Route element={<Layout />} >
        <Route path='/' element={<Home />} />
        <Route path='/nft/:id' element={<DetailNFT />} />
      </Route>
    </Routes>
  );
}

export default App;
