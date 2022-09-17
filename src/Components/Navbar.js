import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './ComponentStyle/Navbar.css';
import cartLogo from '../asserts/cart2.png';
import ProfileLogo from '../asserts/Profile2.png';
import CompanyLogo from '../asserts/Logo3.png';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { collection, getDocs, query, QuerySnapshot, where } from 'firebase/firestore';

function Navbar() {
  function GetCurrentUser() {
    const [user, setUser] = useState('');
    const userCollectionRef = collection(db, "users");

    useEffect(() => {
      auth.onAuthStateChanged(userlogged => {
        if (userlogged) {
          const getUsers = async () => {
            const q = query(collection(db, "users"), where('uid', '==', userlogged.uid))
            //console.log(q);
            const data = await getDocs(q);
            setUser(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
          }
          getUsers();
        }
        else {
          setUser(null);
        }
      })
    }, [])
    return user
  }
  const loggeduser = GetCurrentUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate('/login')
    })
  }

  const [cartdata , setCartData] = useState([]);

  if (loggeduser) {
    const getCartData = async () => {
      const cartArray= [];

      const path = `cart-${loggeduser[0].uid}`

      getDocs(collection(db,path)).then((QuerySnapshot)=> {
        QuerySnapshot.forEach((doc) => {
          cartArray.push({...doc.data(),id:doc.id})
          // console.log(doc.data())
        });
        setCartData(cartArray)
      }).catch('Error error error');
    }
    getCartData();
  }
  return (
    <div className='MainNav'>
      <div className='navbar'>
        <div className='LeftContainer'>
          <img src={CompanyLogo} />
        </div>
        <div className='RightContainer'>

          {!loggeduser && <nav>
            <Link to='/'><button>Home</button></Link>
            <Link to='/signup'><button>Register/SignUp?</button></Link>
            <Link to='/login'><button>Login</button></Link>

            <div className='cart-btn'>
              <img src={cartLogo} alt='no img' />
              <span className='cart-icon-css'>0</span>
            </div>

            <Link to='/userprofile'>
              <img src={ProfileLogo} className='profile-icon' />
            </Link>
          </nav>}


          {loggeduser &&
            <nav>
              <Link to='/'><button>Home</button></Link>
              <Link to='/sellProduct'><button>Sell</button></Link>

              <div className='cart-btn'>
                <Link to='/cartdata'> <img src={cartLogo} alt="no img" /></Link>
                <button className='cart-icon-css'>{cartdata.length}</button>
              </div>

              <Link to='/userprofile'>
                <img src={ProfileLogo} className='profile-icon' />
              </Link>

              <button className='logout-btn' onClick={handleLogout}>Logout</button>

            </nav>
          }
        </div>
      </div>

      <div className='product-types'>
        <button onClick={() => navigate(`/product-type/productsPHONES`)}>Smart Phones</button>
        <button onClick={() => navigate(`/product-type/productsLAPTOPS`)}>Laptops </button>
        <button onClick={() => navigate(`/product-type/productsACCESSORIES`)}>Accessories</button>
        <button onClick={() => navigate(`/product-type/productsFASHIONS`)}>Fashions</button>
      </div>
    </div>
  )
}

export default Navbar