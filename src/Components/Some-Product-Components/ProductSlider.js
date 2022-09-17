import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import SliderproductCard from './SliderproductCard';
import { collection, query, onSnapshot, getDocs } from 'firebase/firestore';
import { db } from '../../firebaseConfig/firebaseConfig';


const ProductSlider = (props) => {

  // const { type } = useParams();
  // console.log(type);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = () => {

      let productsArray = [];
      const path = `${props.type}`;

      getDocs(collection(db, path)).then((QuerySnapshot) => {
        QuerySnapshot.forEach((doc) => {
          productsArray.push({ ...doc.data(), id: doc.id })
          // console.log(doc.id, "=>", doc.data())
        });
        setProducts(productsArray)
        // console.log('done')
      }).catch('Error error error')
    }
    getProducts();
  }, [])

  // CSS Part
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 3
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1
    }
  };

  return (
    <div>
      <Carousel responsive={responsive}>
        {
          products.map((product) => (
            <SliderproductCard key={product.id} product={product} />
          ))
        }
      </Carousel>;
    </div>
  )
}

export default ProductSlider