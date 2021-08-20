import React from 'react';
import './checkout.scss'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

const checkout = (props)=>{
  let subTotal = props.cart.totalPrice;
  let grandTotal = +subTotal + 15.00;
 let items =<h3>Cart is Empty</h3>;
    if(props.cart.items.length>0)
    {
      items =  props.cart.items.map(i=>
        {
          let  totalPrice= i.product.price * i.quantity;

     
        return(
        <div key={i.product._id} className="product">
  
            <div className="product-details">
              <div className="product-title">{i.product.title}</div>
           </div>
            <div className="product-price">{i.product.price}</div>
            <div className="product-quantity">
              <p  type="number"  >{i.quantity}</p>
            </div>
       
            <div className="product-line-price">{totalPrice}</div>
          </div>
            )})
    }


  let name,email,phone, address;
  const inputChangedHandler = (event,identifier)=>{
      if(identifier==='name')
      {
      name= event.target.value;
      
      }
      if(identifier==='email')
      {
          email = event.target.value
         
      }

      if(identifier==='phone')
      {
        phone = event.target.value
         
      }
      if(identifier==='address')
      {
        address = event.target.value
         
      }
  
      
  }

const clickedHandler=(em,na,ad,ph)=>{
const data={

  
    email: em,
    name: na,
    address: ad,
    phone: ph
}
console.log(data)

props.clicked(data)
props.history.replace('/')
}


  return(
    <Auxiliary>
      
    <div id="container">  
 
 
 <div  id="contact">
   <h3>Customer's details</h3>
    <h4>Fill this form to place your order</h4>
    
  <input placeholder="Your name" type="text" tabindex="1" onChange={(event)=>inputChangedHandler(event,'name')} required autofocus/>
 
  <input placeholder="Your Email Address  (optional)" onChange={(event)=>inputChangedHandler(event,'email')}  type="email" tabindex="2" required/>

  <input placeholder="Your Phone Number " onChange={(event)=>inputChangedHandler(event,'phone')}  type="tel" tabindex="3" required/>

  <textarea placeholder="Complete Address" onChange={(event)=>inputChangedHandler(event,'address')}  tabindex="5" required></textarea>



  </div>
</div>
<hr className='line'></hr>
<div class='order-summary'>
           <h2>Your order</h2>

        <div className="column-labels">
    
        <label className="product-details">Product</label>
        <label className="product-price">Price</label>
        <label className="product-quantity">Quantity</label>
         <label className="product-line-price">Total</label>
      </div>
           {items}

           <div className="totals">
     <div className="totals-item">
      <label>Subtotal</label>
      <div className="totals-value" id="cart-subtotal">{subTotal? subTotal : 0}</div>
    </div>
   
    <div className="totals-item">
      <label>Shipping</label>
      <div className="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div className="totals-item totals-item-total">
      <label>Grand Total</label>
      <div className="totals-value" id="cart-total">{grandTotal }</div>
    </div>
  </div>
      
  <button className='button' name="submit" type='submit'  onClick={()=>clickedHandler(email,name,address,phone)}  id="contact-submit" >Order</button>


      </div>
    
         
    </Auxiliary>
   
  )
}




export default checkout;