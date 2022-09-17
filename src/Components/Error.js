import React from 'react'
import Navbar from './Navbar'
import ErrorPng from '../asserts/ErrorPng.jpg';
import './ComponentStyle/Error.css';
function Error() {
  return (
    <>
    <Navbar/>

    <div className='outer-cont'>
       <div className='Error-img'><img src={ErrorPng}/></div>
      
       <p>Error : Something Went Wrong.</p>
    </div>
    </>
  )
}

export default Error