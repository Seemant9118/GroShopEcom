import React, { useState } from 'react'
import Navbar from './Navbar';
import './ComponentStyle/LogIn.css';
import { Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import LogINpng from '../asserts/LogIn.png';
function LogIn() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const auth = getAuth();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSuccessMsg('Logged In successfully , you will be redirected to homepage.')

        setEmail('');
        setPassword('');
        setErrorMsg('');
        setTimeout(() => {
          setSuccessMsg('');
          navigate('/home');
        }, 2000);
      })

      .catch((error) => {
        const errorCode = error.code;
        console.log(error.message);
        if (error.message === 'Firebase: Error (auth/invalid-email).') {
          setErrorMsg('Please Fill all required Fields.*')
        }
        if (error.message === 'Firebase: Error (auth/user-not-found).') {
          setErrorMsg('Email not found!');
        }
        if (error.message === 'Firebase: Error (auth/wrong-password).') {
          setErrorMsg('Wrong Password!');
        }
      });
  }

  return (
    <div>
      <Navbar />


      <div className='login-container'>

        <form className='login-form' onSubmit={handleLogin}>
          <p>LogIn </p><img src={LogINpng} className='LogInPng' />

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


          <label>Email : </label>
          <input onChange={(e) => setEmail(e.target.value)} type='email' placeholder='Enter Your Email' />

          <label>Password : </label>
          <input onChange={(e) => setPassword(e.target.value)} type='password' placeholder='Enter Your Password' />


          <button type='submit'>Login</button>

          <div >
            <span>Don't have an Account ?</span>
            <Link to='/signup' className='already2'>SignUp</Link>
          </div>

        </form>

      </div>

    </div>
  )
}

export default LogIn