import React, { useEffect, useState } from 'react'
import { getDoc, doc, query, collection, where, getDocs, addDoc } from 'firebase/firestore';
import { auth, db } from '../../firebaseConfig/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../Navbar';
import ProductSlider from './ProductSlider';
import './SpecificProductDetails.css';
import cod from '../../asserts/cod.png';
import warranty from '../../asserts/warranty.png';
import replace from '../../asserts/return.png'


const SpecificProductDetail = () => {

  const { type, id } = useParams();
  // console.log(type)
  const [product, setProduct] = useState('');
  const [succesMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();



  function GetCurrentUser() {
    const [user, setUser] = useState('');

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

  function GetCurrentProduct() {

    useEffect(() => {
      const getProduct = async () => {
        const docRef = doc(db, `products${type.toUpperCase()}`, id);
        const docSnap = await getDoc(docRef);
        setProduct(docSnap.data());
      };

      getProduct();
    }, [])
    return product
  }
  GetCurrentProduct();

  let overalltax = 10 / 100;
  let overallcommission = 10 / 100;
  let extratax = 10 / 100;

  let mrp = parseInt(product.price);
  mrp = mrp + overalltax * mrp + overallcommission * mrp + extratax * mrp;
  const salePrice = mrp - extratax * mrp;

  let MRP = Math.ceil(mrp);
  let SALEPRICE = Math.ceil(salePrice);


  const addtoCart = () => {
    if (loggeduser) {
      addDoc(collection(db, `cart-${loggeduser[0].uid}`), {
        product, quantity: 1
      }).then(() => {
        setSuccessMsg('Product added to cart & Now you are redirected to Home Page!');
        setTimeout(() => {
          navigate('/home')
        }, 2000)
      }).catch((error) => { setErrorMsg(error.message) });
    }
    else {
      setErrorMsg('You need to login first & now you are redirected to Login Page')
      setTimeout(() => {
        navigate('/login')
      }, 2000)
    }
  }
  return (
    <div>
      <Navbar />

      {product ?
        <div className='myprod-container'>
          <div className='prod-img-cont'>
            <img src={product.productimage} />
          </div>
          <div className='product-body'>
            {succesMsg && <>
              <div className='success-msg1'>{succesMsg}</div>
            </>}
            {errorMsg && <>
              <div className='error-msg1'>{errorMsg}</div>
            </>}
            <p className='prod-head'>{product.producttitle}</p>



            <div className='specific-price-container'>
              <p className='mrp1'>MRP: <p className='rate1'>₹{MRP}</p></p>
              <p className='discount1'>Discount Price :<p className='saleprice1'> ₹{SALEPRICE}</p></p>
              <p className='saved1'>You Save :<p className='yousave1'> ₹{MRP - SALEPRICE}</p></p>
            </div>
            <p className='prod-details-head'>Details</p>
            <p className='prod-description'>{product.description}</p>

            <div className='row-cont'>
              <div className='warranty-replacement'>
                <div className='cod'>
                  <div className='img-circle'>
                    <img src={cod} alt='image-row-cont' />
                  </div>
                  <p>Cash on Delivery</p>
                </div>
                <div className='warranty'>
                  <div className='img-circle'>
                    <img src={warranty} alt='image-row-cont' />
                  </div>
                  <p>Total Warranty</p>
                </div>
                <div className='replacement'>
                  <div className='img-circle'>
                    <img src={replace} alt='image-row-cont' />
                  </div>
                  <p>10 Days Replcaement</p>
                </div>
              </div>
              <div className='buy-cart'>
                <button className='btn-buy'>Buy Now</button>
                <button className='btn-cart' onClick={addtoCart}>Add To Cart</button>
              </div>
            </div>


          </div>

        </div>
        :
        <div> Loading...</div>
      }
      <p className='prod-details-head2'>Some Products</p>
      <ProductSlider type={`productsPHONES`}/>
      <ProductSlider type={`productsLAPTOPS`}/>
      {/* <ProductSlider type={`productsACCESSORIES`}/> */}
      {/* <ProductSlider type={`productsFASHIONS`}/> */}

    </div>


  )
}

export default SpecificProductDetail