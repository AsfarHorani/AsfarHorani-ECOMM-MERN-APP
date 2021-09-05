
import React from 'react';
import './cart.scss'
import {Link, withRouter} from 'react-router-dom';
import { useEffect } from 'react';

const Cart =(props)=>{


useEffect(()=>{
  console.log("rendering cart")

},[props.cart])


console.log(props)
    let items =<h3>Cart is Empty</h3>;
    if(props.cart.items.length>0)
    {
      items =  props.cart.items.map(i=>
        {
          let  totalPrice= i.product.price * i.quantity;

          const changeHandler=(event)=>{
          const quantity = event.target.value;
          props.quantityHandler(quantity, i.product._id)
          console.log(totalPrice)
          }
             
        return(
        <div key={i.product._id} className="product">
         <div className='product-image'>
                <img src={process.env.REACT_APP_BACKEND_URL+`${i.product.imageUrl}`}/>
            </div>
            <div className="product-details">
              <div className="product-title">{i.product.title}</div>
            
            </div>
            <div className="product-price">{i.product.price}</div>
            <div className="product-quantity">
              <input defaultValue={i.quantity} type="number" onChange={(event)=>changeHandler(event)}  min="1"/>
            </div>
            <div className="product-removal">
              <button onClick={()=>props.removeFromCartHandler(i.product._id, i.product.price)} className="remove-product">
                Remove
              </button>
              
            </div>
            <div className="product-line-price">{i.product.price * i.quantity}</div>
          </div>
            )})
    }


  return(
      
    <div className="shopping-cart">
    <h1>Shopping Cart</h1> 
    <div className="column-labels">
    <label className="product-image">Image</label>
    <label className="product-details">Product</label>
    <label className="product-price">Price</label>
    <label className="product-quantity">Quantity</label>
    <label className="product-removal">Remove</label>
    <label className="product-line-price">Total</label>
  </div>

    {items}

 <div className="totals">
<div className="totals-item">
  <label>Subtotal</label>
  <div className="totals-value" id="cart-subtotal">{props.cart.totalPrice? props.cart.totalPrice : 0}
  </div>
</div>


</div>
  
  <Link to='/Checkout' >
     <button  className="checkout">
     Checkout
     </button>
     </Link>

  </div>
)

  }



export default withRouter(Cart);
