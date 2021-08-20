import React,{Component} from 'react';
import './orders.css'
class Order extends Component {
  state = {
      orders: [],
      grandTotal:0,
       loading: false
  }

 
  componentDidMount(){
      this.setState({loading: true})
    console.log(this.props)
      fetch('http://localhost:8080/get-orders',{
          
          headers:{
            
                Authorization: 'Bearer ' + this.props.token,
            }
      }).then(res=>{
          if(res.status!==200 && res.status!==201){
              const error = new Error('Could not fetch Orders');
              throw error
          }
          return res.json()
      }).then(resData=>{
          console.log(resData)
          this.setState({orders: resData.orders, loading: false})
      }).catch(err=>{
          console.log(err)
      })
  }


  
    render(){
        let orders;
        if(this.state.loading)
        {
            return (<h1>loading!!!</h1>)
        }
        
        if(this.state.orders.length===0 )
        {
           return orders = <h1>No orders</h1>
        }
      
        orders = this.state.orders.map(order=>{
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
                <li className='orders__item'>
                    <h3>
                        Order - {order._id}
                       
                    </h3>
                    <h3> Name: {order.name}</h3>
                    <h3> Adress: {order.address}</h3>
                    <h3>Time:{}</h3>

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
    
                </li>)
            })
        return ( <div className="orders">
        <h1>Orders</h1>
    <ul >
        {orders}
    </ul>
    </div>)
       
    }

}

export default Order