import React from 'react'
import './ProductContainer.css';
import { Link } from 'react-router-dom';
const ProductContainer = (props) => {
  let set = props.product;
  // console.log(set)
  let overalltax = 10 / 100;
  let overallcommission = 10 / 100;
  let extratax = 10 / 100;

  let mrp = parseInt(set.price);
  mrp = mrp + overalltax * mrp + overallcommission * mrp + extratax * mrp;
  const salePrice = mrp - extratax * mrp;

  let MRP = Math.ceil(mrp);
  let SALEPRICE = Math.ceil(salePrice);


  return (
    <div>

      <div className='product-container'>
        <img alt='ProductImage' src={set.productimage} />
        <div className='product-details'>
          <Link to={`/product/${set.id}/${set.producttype}`}>
            <button className='product-title'>{set.producttitle}</button>
          </Link>
          <div className='price-container'>
            <p className='mrp'>MRP: <p className='rate'>₹{MRP}</p></p>
            <p className='discount'>Discount Price :<p className='saleprice'> ₹{SALEPRICE}</p></p>
            <p className='saved'>You Save :<p className='yousave'> ₹{MRP - SALEPRICE}</p></p>
          </div>

          <div className='buy-cart'>
            <Link to={`/product/${set.id}/${set.producttype}`}>
              <button className='btn-cart'>Show more</button>
            </Link>
          </div>
        </div>
      </div>
    </div >
  )
}

export default ProductContainer