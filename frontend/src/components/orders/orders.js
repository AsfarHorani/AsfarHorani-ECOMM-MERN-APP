import React,{useState,useEffect} from 'react';
import './orders.css'
import LoadingSpinner from '../UI components/LoadingSpinner';

const Order =props=> {

   const [orders,setOrders]= useState([]);
   
   const [loading,setLoading] = useState(false)

   const token = localStorage.getItem('token');

   useEffect(()=>{
       
      setLoading(true)
     
      fetch(process.env.REACT_APP_BACKEND_URL+'get-orders',{
          
          headers:{
            
                Authorization: 'Bearer ' + token,
            }
      }).then(res=>{
          console.log(props.token)
          if(res.status===401)
          {
            props.history.replace('/')
            const error = new Error('You are unauthorized!');
            throw error
           
          }
          if(res.status===500){
            const error = new Error('An error occured!');
            throw error
           }
          if(res.status!==200 && res.status!==201){
              const error = new Error('Could not fetch Orders');
              throw error
          }
          return res.json()
      }).then(resData=>{
          console.log(resData)
          setOrders(resData.orders)
          setLoading(false)
        
      }).catch(err=>{
          console.log(err)
          setOrders([])
          props.catchError(err)
          setLoading(false)
      })
  },[token])

 const deleteOrderHandler=(orderId)=>{
  setLoading(true)
  fetch(process.env.REACT_APP_BACKEND_URL+`delete-order/${orderId}`,
  {
    method: "DELETE",
    headers:{Authorization: 'Bearer ' + props.token}
  }
  ).then(res=>{
    if(res.status!==200 && res.status!==201){
      throw new Error ('Delete product failed')
    }
    return res.json()
}).then(resData=>{
    console.log(resData)
    let updatedOrders = orders.filter(order=>order._id!==orderId)
    setOrders(updatedOrders)
    setLoading(false)
}).catch(err=>{
    console.log(err)
    setLoading(false)
    props.catchError(err)
})

 }
  
    
        let ordersArray;
        if(loading)
        {
            return (<LoadingSpinner asOverlay/>)
        }
        
        if(orders.length===0 )
        {
           return ordersArray = <h1>No orders</h1>
        }
      
        ordersArray = orders.map(order=>{
            console.log( order.orderItems.items)
            const items = order.orderItems.items.map(item=>{
              
                return(<li key={item.product._id}>
                 <div className="product">
        
            <div className="product-details">
              <div className="product-title">{item.product.title}</div>
            
            </div>
            <div className="product-price">{item.product.price}</div>
            <div className="product-quantity">
            {item.quantity}
            </div>
           
            <div className="product-line-price">{item.product.price * item.quantity}</div>
          </div>
                </li>)
                
                  
            })
            return( 
                <li key={order._id} className='orders__item'>
                    <h3>
                        Order - {order._id}
                       
                    </h3>
                    <h3> Name: {order.name}</h3>
                    <h3> Adress: {order.address}</h3>
                    <h3>Time: {order.time}</h3>

                    <ul className="orders__products-item">
                    <div className="column-labels">
        
        <label className="product-details">Product</label>
        <label className="product-price">Price</label>
        <label className="product-quantity">Quantity</label>
    
        <label className="product-line-price">Total</label>
      </div>
                            {items}
     
                            
                    </ul>

         
         <div className="totals-item">
           <label>Subtotal</label>
      <div className="totals-value" id="cart-subtotal">{order.orderItems.totalPrice}
        </div>
        </div>
                    <div className="totals-item">    
      <label>Shipping</label>
      <div className="totals-value" id="cart-shipping">15.00</div>
    </div>
    <div className="totals-item">
      <label>Grand Total</label>
      <div className="totals-value" id="cart-total">{+order.orderItems.totalPrice + 15.00}</div>
    </div>
    <button className='Btn' onClick={()=>deleteOrderHandler(order._id)}>Completed</button>
    <button className='Btn' onClick={()=>deleteOrderHandler(order._id)}>Delete</button>
    
                </li>)
            })
        return ( <div className="orders">
        <h1>Orders</h1>
    <ul >
        {ordersArray}
    </ul>
    </div>)
       
    }



export default Order