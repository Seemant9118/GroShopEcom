import React, { useState, useEffect } from 'react'
import './ComponentStyle/Home.css';
import Banner from './Banner'
import Navbar from './Navbar'
import Products from './Products'
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { collection, getDoc, getDocs, query, where } from 'firebase/firestore';
import ProductSlider from './Some-Product-Components/ProductSlider';
import SliderproductCard from './Some-Product-Components/SliderproductCard';
import { useParams } from 'react-router-dom';

function Home() {
  
  // Main Function to get data from database
  function GetCurrentUser() {
    const [user, setUser] = useState('');
    // const userCollectionRef = collection(db, "users");

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

  // if(loggeduser){console.log(loggeduser)} //Testing k liye h bs

  
  return (
    <div>
      <Navbar />
      <Banner />
      <div className='slider-head'><p>Limited Time Deals</p></div>
      <ProductSlider type={'productsPHONES'}/>
      <ProductSlider type={'productsLAPTOPS'}/>
      <ProductSlider type={'productsACCESSORIES'}/>
      <ProductSlider type={'productsFASHIONS'}/>
      {/* <SliderproductCard/> */}
      
    </div>
  )

}

export default Home