import './App.css';
import { BrowserRouter, Routes, Route, Link} from 'react-router-dom'
import LandingPage from './Components/LandingPage/landingPage';
import OrderTaker from './Components/OrderTaker';
import ResponsiveAppBar from './Components/materialUI NAVbar/navBar';

function App() {


  return (
   <BrowserRouter> 
     <ResponsiveAppBar />
     <Routes>
      <Route path='/' element={<LandingPage/>}/>
      <Route path='order' element={<OrderTaker/>}/>
     </Routes>
   </BrowserRouter>
    
  
  );
}

export default App;
