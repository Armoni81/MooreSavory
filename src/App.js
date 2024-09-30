import './App.css';
import { BrowserRouter, Routes, Route} from 'react-router-dom'
import { useState } from 'react';
//Imported Components
import LandingPage from './Components/LandingPage/landingPage';
import ResponsiveAppBar from './Components/MuiNavBar/navBar';
import RenderSalads from './Components/RenderSalads';
import Salad from './Components/salad';
import AddSalad from './Components/addSalad';
import PrimarySearchAppBar from './Components/MuiNavBar/navBar';

const App = () => {
  const [ total, setTotal] = useState(0.00)
  const [ saladsAddedToCart, setSaladsAddedToCart ] = useState([])
  const cartLength = saladsAddedToCart.length
  

  return (
   <BrowserRouter> 
     <PrimarySearchAppBar cartLength={cartLength}/>
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='order' element={<RenderSalads total={total} setTotal= {setTotal} saladsAddedToCart={saladsAddedToCart} setSaladsAddedToCart={setSaladsAddedToCart}/>}/>
      <Route path='/Salads' element={<Salad/>} />
      <Route path='/add' element={<AddSalad/>}/>
     </Routes>
   </BrowserRouter>
  );
}

export default App;
