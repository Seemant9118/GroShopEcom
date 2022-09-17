import React, { useState } from 'react'
import './ComponentStyle/CartCard.css';
import del from '../asserts/dele.png' 
import { deleteDoc , doc, updateDoc} from 'firebase/firestore';
import {db} from '../firebaseConfig/firebaseConfig';

const CartCard = (props) => {

  const [productquantity, setProductQuantity] = useState(1);


  let set = props.itemdata.product;
  // console.log(set)
  let overalltax = 10 / 100;
  let overallcommission = 10 / 100;
  let extratax = 10 / 100;

  let mrp = parseInt(set.price);
  mrp = mrp + overalltax * mrp + overallcommission * mrp + extratax * mrp;
  const salePrice = (mrp - extratax * mrp)*productquantity;

  let MRP = Math.ceil(mrp);
  let SALEPRICE = Math.ceil(salePrice);


  const increasequantity = async () => {
    setProductQuantity(productquantity + 1);

    const itemref = doc(db,`cart-${props.userid}` , `${props.itemdata.id}`)
    await updateDoc(itemref,{
      quantity:productquantity + 1
    }) .then (() => {})
  }

  const decreasequantity = async () => {
    if (productquantity >= 1) {
      setProductQuantity(productquantity - 1);

      const itemref = doc(db,`cart-${props.userid}` , `${props.itemdata.id}`)
      await updateDoc(itemref,{
        quantity:productquantity - 1
      }) .then (() => {})

    }
  }

  const deletecartitem = async() => {  
      await deleteDoc(doc(db,`cart-${props.userid}`,`${props.itemdata.id}`))
      .then(()=>{
        // console.log('doc deleted')
      })
  }

  return (
    
    <div className='cart-prod-container'>
      <div className='cart-prod-imgtitle'>
        <div className='prod-image'><img src={set.productimage}/></div>
        <div className='prod-title'><p>{set.producttitle}</p></div>
      </div>
      <div className='prodquantity-div'>
        <button onClick={increasequantity}>+</button>
        <p>{productquantity}</p>
        <button onClick={decreasequantity}>-</button>
      </div>
      <div className='prodprice'>₹{SALEPRICE}</div>
      <button className='deletebtn' onClick={deletecartitem}>
        <img src={del}/>
      </button>
    </div>
  )
}

export default CartCard