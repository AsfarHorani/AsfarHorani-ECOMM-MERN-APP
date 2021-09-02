import React,{useState,useEffect} from 'react';
import './checkout.scss'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import {checkValidity} from '../../util/checkValidity'
import Input from '../Form/input'
const Checkout = (props)=>{

  const [name, setName] = useState(
    {


      value:'',
      validation : {
       required: true,
       minLength: 5,
       maxLength: 20,
       message: '*must be of length between 5 and 20'
              },
     valid: false,
   
     touched: false
})
const [email, setEmail] = useState(
  {


    value:'',
    validation : {
     required: true,
     type: 'email',
     message: '*must be a valid email '
            },
    valid: false,
    touched: false
})
const [phone, setPhone] = useState(
  {


    value:'',
    validation : {
     required: true,
     minLength: 11,
     message: '*must be a valid phone number'
  
            },
   valid: false,
 
   touched: false
})
const [address, setAddress] = useState(
  {


    value:'',
    validation : {
     required: true,
     minLength: 10,
     maxLength: 50,
     message: '*must be a valid and complete address of length between 10 and 50'
            },
   valid: false,
 
   touched: false
})

const [isFormValid, setIsfromValid] = useState(false)
const [cart,setCart]= useState({})

  let subTotal = props.cart.totalPrice;

  let shipment =Math.round((+subTotal/100)*10,1) ;
    let grandTotal = +subTotal +shipment;
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

    useEffect(()=>{
    setCart(props.cart)
   
    },[props.cart])

    useEffect(()=>{
      
     if(email.valid && phone.valid && address.valid && name.valid && isFormValid===false && props.cart.items.length>0)
     {
      setIsfromValid(true)
     }
     else(
      setIsfromValid(false)
     )
     console.log('checking form validity..', isFormValid)
    },[email,phone,address,name])

  const inputChangedHandler = (event,identifier)=>{
      if(identifier==='name')
      {
        let isValid = checkValidity(event.target.value,name.validation)
        setName({...name, value:event.target.value, valid: isValid, touched: true})
        console.log(name)
      
      }
      if(identifier==='email')
      {
        let isValid = checkValidity(event.target.value,email.validation)
        setEmail({...email, value:event.target.value, valid: isValid, touched: true})
        console.log(email)
      }

      if(identifier==='phone')
      {
        let isValid = checkValidity(event.target.value,phone.validation)
        setPhone({...phone, value:event.target.value, valid: isValid, touched: true})
        console.log(phone)
       
      }
      if(identifier==='address')
      {
        let isValid = checkValidity(event.target.value,address.validation)
        setAddress({...address, value:event.target.value, valid: isValid, touched: true })
         
      }
  
      
  }

const clickedHandler=()=>{
const data={

  
    email: email.value,
    name: name.value,
    address: address.value,
    phone: phone.value
}
console.log(data)

props.clicked(data)

}


  return(
    <Auxiliary>
      
    <div id="container">  
 
 
 <div  id="contact">
   <h3>Customer's details</h3>
    <h4>Fill this form to place your order</h4>
    
  <Input placeholder="Your name" 
    elementType="text" 
    onChange={(event)=>inputChangedHandler(event,'name')}
    message={name.validation.message}
    invalid={!name.valid}
    touched={name.touched}
    shouldValidate={name.validation.required}
   />

 
  <Input 
  placeholder="Your Email Address  (optional)" 
  message={email.validation.message}
  elementType="email" 
  onChange={(event)=>inputChangedHandler(event,'email')} 
  invalid={!email.valid}
  touched={email.touched}
  shouldValidate={email.validation.required}
   elemetType="email" 
  />

  <Input
   placeholder="Your Phone Number "
   message={phone.validation.message}
   onChange={(event)=>inputChangedHandler(event,'phone')}
     elementType="tel"
     invalid={!phone.valid}
     touched={phone.touched}
     shouldValidate={phone.validation.required}
    />

  <Input
id="address"
message={address.validation.message}
onChange={(event)=>inputChangedHandler(event,'address')} 
value={address.value}
elementType="textarea"
invalid={!address.valid}
touched={address.touched}
shouldValidate={address.validation.required}
placeholder="Your Complete Address"
/>


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
      <div className="totals-value" id="cart-shipping">{shipment}</div>
    </div>
    <div className="totals-item totals-item-total">
      <label>Grand Total</label>
      <div className="totals-value" id="cart-total">{grandTotal }</div>
    </div>
  </div>
      
  <button className='button' type='submit' disabled={!isFormValid} onClick={()=>clickedHandler()}  id="contact-submit" >Order</button>


      </div>
    
         
    </Auxiliary>
   
  )
}




export default Checkout;