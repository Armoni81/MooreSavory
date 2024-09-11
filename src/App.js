import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import { useState } from 'react';
import LandingPage from './Components/LandingPage/landingPage';
import OrderTaker from './Components/OrderTaker';
import ResponsiveAppBar from './Components/materialUI NAVbar/navBar';

function App() {

  const [ total, setTotal] = useState(0.00)


  return (
   <BrowserRouter> 
     <ResponsiveAppBar />
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='order' element={<OrderTaker total={total} setTotal= {setTotal}/>}/>
     </Routes>
   </BrowserRouter>
    
  
  );
}

export default App;
