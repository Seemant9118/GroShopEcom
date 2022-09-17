import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Components/Home';
import LogIn from './Components/LogIn';
import SignUp from './Components/SignUp';
import UserProfile from './Components/UserProfile';
import Error from './Components/Error';
import AddProducts from './Components/AddProducts';
import AllProduct from './Components/Some-Product-Components/AllProduct';
import SpecificProductDetail from './Components/Some-Product-Components/SpecificProductDetail';
import Cart from './Components/Cart';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/signup' element={<SignUp />} />
        <Route exact path='/login' element={<LogIn />} />
        <Route exact path='/cart' element={<Cart />} />
        <Route exact path='/userprofile' element={<UserProfile />} />
        <Route exact path='/sellProduct' element={<AddProducts />} />

        <Route path=''>
          <Route exact path='/product-type/:type' element={<AllProduct />} />
        </Route>

        <Route path='/product/:id/:type' element={<SpecificProductDetail/>}/>
        <Route exact path ='/cartdata' element={<Cart/>} />
      
 
       


        <Route path='*' element={<Error />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
