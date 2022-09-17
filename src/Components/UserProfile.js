import React, { useState, useEffect } from 'react'
import Navbar from './Navbar';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { updateProfile } from 'firebase/auth';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import '../Components/ComponentStyle/UserProfile.css';
import NotLogged from '../asserts/NotLoggedIn.png';

function UserProfile() {

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
  const loggedUser = GetCurrentUser();

  return (
    <>
      <Navbar />
      <div className='UserProfile-outerContainer'>
        {loggedUser ?
          <div className='User-Profile'>
            <p className='heading'>Your Account Details </p>
            <div className='data-row'>
              <span>Your Name </span>
              <span>{loggedUser[0].username}</span>
            </div>
            <div className='data-row'>
              <span>Your EmailId </span>
              <span>{loggedUser[0].email}</span>
            </div>
            <div className='data-row'>
              <span>Your Number </span>
              <span>{loggedUser[0].mobilenumber}</span>
            </div>
          </div>
          :
          <div className='outer-container-NOT'>
            {/* You're not Logged In! */}
            <div className='inner-container-NOT'>
                {/* <p>Oop's!</p> */}
                <img src={NotLogged}/>
                <p>You're not Logged In!</p>
            </div>
          </div>}
      </div>
    </>

  )
}

export default UserProfile