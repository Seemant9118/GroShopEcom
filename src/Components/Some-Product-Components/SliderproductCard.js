import React from 'react';
import './SliderproductCard.css';
import {Link} from 'react-router-dom';

const SliderproductCard = (product) => {
    let set = product.product;
    let overalltax = 10 / 100;
    let overallcommission = 10 / 100;
    let extratax = 10 / 100;
    
    let mrp = parseInt(set.price);
    mrp = mrp + overalltax * mrp + overallcommission * mrp + extratax * mrp;
    const salePrice = mrp - extratax * mrp;

    let MRP = Math.ceil(mrp);
    let SALEPRICE = Math.ceil(salePrice);


    return (
        <div className='mini-product-container'>
            <div className='mini-img-container'>
                <img src={set.productimage} />
            </div>

            <div className='mini-product-details'>
                <p className='mini-product-title'>{set.producttitle}</p>
            </div>

            <div className='mini-price-container'>
                <p className='mrp'>MRP: <p className='rate'>₹{MRP}</p></p>
                <p className='discount'>Discount Price :<p className='saleprice'> ₹{SALEPRICE}</p></p>
                <p className='saved'>You Save :<p className='yousave'> ₹{MRP - SALEPRICE}</p></p>
            </div>

            <Link to={`/product/${set.id}/${set.producttype}`}>
                <button className='showmore-btn'>Show more &gt; </button>
            </Link>

        </div>
    )
}

export default SliderproductCard