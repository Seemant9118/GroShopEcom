import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebaseConfig/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import './ComponentStyle/SignUp.css';
import RegisterPng from '../asserts/RegistrePng.png';

function SignUp() {

  const [username, setUserName] = useState('');
  const [mobilenumber, setMobileNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  // After Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredentials) => {
        const user = userCredentials.user;
        const initialCartValue = 0;
        //console.log(user);

        addDoc(collection(db, "users"), {
          username: username, email: email, mobilenumber: mobilenumber, password: password, cart: initialCartValue, address: address, uid: user.uid
        })
          .then(() => {
            setSuccessMsg('New User Added Successfully and Now you are redirected to LogIn Page !!')
            setUserName('');
            setMobileNumber('');
            setEmail('');
            setAddress('');
            setPassword('');
            setErrorMsg('');

            //After Adding New user redirected to Login Page with useNavigate().
            setTimeout(() => {
              setSuccessMsg('');
              navigate('/login');
            }, 2000);

          })
          .catch((error) => { setErrorMsg(error.message) });
      })
      .catch((error) => {
        if (error.message === 'Firebase : Error (auth/invalid-email).') {
          setErrorMsg('Please fill all required fields')
        }
        if (error.message === 'Firebase: Error (auth/email-already-in-use).') {
          setErrorMsg('User Already exists');
        }
      });
  }
  return (
    <div>
      <Navbar />
      <div className='signUp-container'>
        <form className='signup-form' onSubmit={handleSubmit}>
          <p>Create an Account</p>
          <div className='RegisterPng'><img src={RegisterPng} /></div>

          {successMsg && <>
            <div className='success-msg'>
              {successMsg}
            </div>
          </>}

          {errorMsg && <>
            <div className='error-msg'>
              {errorMsg}
            </div>
          </>}

          <label>Your Name : </label>
          <input onChange={(e) => setUserName(e.target.value)} type='text' placeholder='First and Last Name' />

          <label>Mobile Number : </label>
          <input onChange={(e) => setMobileNumber(e.target.value)} type='number' placeholder='Mobile Number' />

          <label>Email : </label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Your Email' />

          <label>Password : </label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Your Password' />

          <label>Address : </label>
          <textarea onChange={(e) => setAddress(e.target.value)} placeholder='Enter Your Address'></textarea>

          <button type='submit'>Sign Up</button>

          <div >
            <span>Already have an Account ?</span>
            <Link to='/login' className='already'>LogIn</Link>
          </div>

        </form>

      </div>
    </div>
  )
}

export default SignUp