import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import CartCard from './CartCard';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { collection, getDocs, query, where } from 'firebase/firestore';
import './ComponentStyle/Cart.css';
import emptyCartImg from '../asserts/cart_empty.png';

function Cart() {

  const navigate = useNavigate();
  
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

  const [cartdata, setCartdata] = useState([]);

  if (loggeduser) {
    const getCartData = async () => {
      const cartArray = [];

      const path = `cart-${loggeduser[0].uid}`

      getDocs(collection(db, path)).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          cartArray.push({ ...doc.data(), id: doc.id })
          // console.log(doc.data())
        });
        setCartdata(cartArray)
      }).catch('Error error error');
    }
    getCartData();
  }

  return (
    <>
      <Navbar />

      {
        cartdata.length != 0 ?
          <div>
            <div className='cart-head'>Your Cart Items </div>
            <div className='allcart-items'>
              {cartdata.map((item) => (
                <CartCard key={item.id} itemdata={item} userid={loggeduser[0].uid} />
              ))}
            </div>
            <div className='proceed'>
              <button>Proceed</button>
            </div>
          </div>
          :
          <div className='empty-outerCont'>
            <div className='emptyCart-cont'>
              <div className='emptyCart-head'>Your Cart is Empty! </div>
              <div className='emptyCart-img'><img src={emptyCartImg} /></div>
              <button onClick={() => navigate(`/home`)} className='shopNow-btn'>Shop Now</button>
            </div>
          </div>

      }

    </>
  )
}

export default Cart