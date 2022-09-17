import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar'
import '../Some-Product-Components/AllProduct.css';
import ProductContainer from './ProductContainer';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebaseConfig';


function AllProduct() {

  const { type } = useParams();
  // console.log(type);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {

      let productsArray = [];

      getDocs(collection(db, type)).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id })
          // console.log(doc.id, "=>", doc.data())
        });
        setProducts(productsArray)
        // console.log('done')
      }).catch('Error error error')
    }
    getProducts();
  }, [type])

 
  // console.log(type)
  
  return (
    <div className='allproductpage'>
      <Navbar />

      <div className='heading'>
        <p>Top Results for {type.slice(8).toLowerCase()}</p>
      </div>

      <div className='allproductcontainer'>
        {products[0] && products.map((product, index) => (
          <ProductContainer
            key={index}
            product={product}
          />
        ))}
        {/* {products[0] && <ProductContainer product={products[0]}/>} */}
      </div>
    </div>
  )
}

export default AllProduct