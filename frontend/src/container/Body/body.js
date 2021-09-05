
import React, {Component, Suspense} from 'react';

import './body.css'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import LoadingSpinner from '../../components/UI components/LoadingSpinner'
import { Fragment } from 'react';
import Shop from '../../components/shop/shop';
import Backdrop from '../../components/UI components/Backdrop'
import Modal from '../../components/UI components/Modal'
const AddProductForm = React.lazy(()=> import('../../components/Add-Product From/addProductForm'))
const Signup = React.lazy(()=> import('../../components/Auth/signup/signup'))
const Login = React.lazy(()=> import('../../components/Auth/login/login'))
const ProductView = React.lazy(()=> import('../../components/Article/Product-View/product-view'))
const Checkout = React.lazy(()=> import('../../components/checkout/checkout'))
const Orders = React.lazy(()=> import('../..//components/orders/orders'))
const Cart = React.lazy(()=> import('../../components/cart/cart'))

class Body extends Component {

  state={  
    selectedProduct: null,
    loggedInAdmin : null,
    message: null,
    products: [],
    showBackdrop: false,
    cart: {
      items:[],
     totalPrice: null
    },
    loading: false,
  

}


componentDidMount(){
 console.log('Component did mount....Body')
  let cart =localStorage.getItem('cart');
  if(cart)
  {
   
    cart =JSON.parse(cart)
    console.log(cart.items.length)
    this.props.setCartItemCount(cart.items.length)
    this.setState({cart: cart})
  } const remainingMilliseconds = 60 * 60 * 1000;

 this.setClearCartStorage(remainingMilliseconds);

this.setState({loading: true})
fetch(process.env.REACT_APP_BACKEND_URL+'get-products')
  .then(res=>{
      
      return res.json();
   
  }).then(resData=>{
      console.log(resData)
     
      this.setState({
         loading: false,
          products: resData.products,
        
      })
     
  })
  .catch(err=>{
    console.log(err)
    
this.setState({loading: false})
    this.props.catchError(err)

})
}

shouldComponentUpdate(nextProps, nextState) {
  return this.state!== nextState
 
}


addProductHandler=(prodData)=>{

const formData = new FormData();
formData.append('title',prodData.title)
formData.append('price',prodData.price)
formData.append('description',prodData.description)
formData.append('image', prodData.image)
formData.append('category', prodData.category)

fetch(process.env.REACT_APP_BACKEND_URL+'add-product/',{
       method: 'POST',
       headers: {
          Authorization: 'Bearer ' + this.props.token
          },
       body: formData
  }).then(res=>{
    if(res.status!==200 && res.status!==201)
    {
      throw new Error('create product failed')
    
    }
    return res.json();
  }).then(resData=>{
    console.log(resData);
    const product={
      title: resData.product.title,
      price: resData.product.price,
      description: resData.product.description,
      category: resData.product.category,
      imageUrl: resData.product.imageUrl,
    }
     this.setState(prevState=>{
      let updatedProducts= [...prevState.products];
      updatedProducts = prevState.products.concat(product);
      return {products: updatedProducts}

    }

    
    )
    this.props.history.replace('/')
    
  })
  .catch(err=>{
    console.log(err)
    this.props.catchError(err)

})
}

deleteHandler=(prodId)=>{
  
  console.log(prodId)
  fetch(process.env.REACT_APP_BACKEND_URL+'delete-product/' + prodId,
  {
    method: "DELETE",
    headers:{Authorization: 'Bearer ' + this.props.token}
  }
  ).then(res=>{
    if(res.status!==200 && res.status!==201){
      throw new Error ('Delete product failed')
    }
    return res.json()

  }).then(resData=>{
    console.log(resData)
    const deletedProduct = resData.product;
    const updatedProducts= this.state.products.filter(prod=>prod._id!==deletedProduct._id);
    this.setState({products: updatedProducts})

  }).catch(err=>{
    console.log(err)
    this.props.catchError(err)

})
}

editHandler=(prodId)=>{
  console.log(prodId)
 const prod = this.state.products.find(p=>p._id===prodId)
  console.log(prod)
  this.setState({
    selectedProduct: prod
  })
 console.log(this.state.selectedProduct)
}

addToCartHandler=(prodId)=>{
  
  let updatedCart = {...this.state.cart}
  let updatedCartItems= [...updatedCart.items]
  let alreadyExist = false;
  updatedCartItems.forEach(i=> {
   if(prodId===i.product._id)
   {
     alreadyExist=true
     return 
   }
   
  })
  if(!alreadyExist){
    const product = {...this.state.products.find(p=>prodId===p._id)}
    const prodPrice = product.price;
    
    const newItem = [{
      product: product,
      quantity: 1
    }
     ]
 this.setState(prevState=>{
       let updatedCart = {...prevState.cart}
     let updatedCartItems= [...updatedCart.items];
    let updatedPrice = [updatedCart.totalPrice]
    updatedPrice = +updatedPrice +  +prodPrice;
     updatedCartItems =prevState.cart.items.concat(newItem)
     console.log(updatedPrice)
     localStorage.setItem('cart', JSON.stringify({
      items:updatedCartItems,
      totalPrice: updatedPrice
    }));
    this.props.setCartItemCount(updatedCartItems.length)
      return{ cart: {...this.state.cart, items: updatedCartItems, totalPrice: updatedPrice}}

    })
  } 
  
  
    }
    quantityHandler=(quan, prodId)=>{
     
      this.setState(prevState=>{
      let updatedCart = {...prevState.cart}
      let updatedCartItems= [...updatedCart.items];
      let updatedPrice = updatedCart.totalPrice
      let updatedCartItemIndex =  updatedCart.items.findIndex(p=>prodId===p.product._id)
      let prevQuan = updatedCartItems[updatedCartItemIndex].quantity;
        let prodPrice= updatedCartItems[updatedCartItemIndex].product.price;
      updatedCartItems[updatedCartItemIndex].quantity = quan;
       console.log(updatedPrice)
      if(prevQuan && prevQuan>0){
          updatedPrice = +updatedPrice - (prevQuan*prodPrice)
      }
      console.log(updatedPrice)
      updatedPrice = +updatedPrice + (+quan* +prodPrice);
      localStorage.setItem('cart', JSON.stringify({
        items:updatedCartItems,
        totalPrice: updatedPrice
      }));
      this.props.setCartItemCount(updatedCartItems.length)
     return{ cart:{...this.state.cart, items: updatedCartItems, totalPrice : updatedPrice}}
    })
  }
  
  removeFromCartHandler=(prodId, prodPrice)=>{
   
    this.setState(prevState=>{
  
      let updatedCart = {...prevState.cart}
      let updatedCartItems= [...updatedCart.items];
      let updatedPrice = [updatedCart.totalPrice]
      updatedPrice = +updatedPrice -  +prodPrice;
     updatedCartItems= updatedCart.items.filter(p=>prodId!==p.product._id)
      console.log( updatedCartItems)
      localStorage.setItem('cart', JSON.stringify({
        items:updatedCartItems,
        totalPrice: updatedPrice
      }));
      this.props.setCartItemCount(updatedCartItems.length)
      return{
        cart:{...this.state.cart, items: updatedCartItems, totalPrice: updatedPrice}
        
      }
   
    })
    }

  addOrderHandler=(data)=>{
    console.log(data,this.state.cart)
    this.setState({loading:true})
    fetch(process.env.REACT_APP_BACKEND_URL+'add-order/',{
      method: 'POST',
      headers: {
       'Content-Type': 'application/json',
         },
      body: JSON.stringify({
        name: data.name,
        phone: data.phone,
        email: data.email,
        address: data.address,
        order: this.state.cart
      })
     }).then(res=>{
      if( res.status!==200 && res.status!==201){
        throw new Error('Could not place your order')
      }

      return res.json()

     }).then(resData=>{
       console.log(resData)
       this.setState(prevState=>{
        let updatedCart = {...prevState.cart}
        let updatedCartItems= [...updatedCart.items];
       let updatedPrice = [updatedCart.totalPrice]
       updatedCartItems = [];
       updatedPrice = null;
    
       localStorage.removeItem('cart')
       this.props.setCartItemCount(updatedCartItems.length)
       return{ 
         cart: {...this.state.cart, 
          items: updatedCartItems, 
          totalPrice: updatedPrice},
        message:
          {title: 'Order placed!', 
          content:'Your order has been placed please wait for confirmation call'},
          loading: false
    
      }
      
       })
       this.props.history.replace('/')
      }).catch(err=>{
      console.log(err)
      this.setState({loading:false})
      this.props.catchError(err)

  })
}



  clickedEditHandler=(prodData)=>{
    console.log(prodData)
const formData = new FormData();
formData.append('title',prodData.title)
formData.append('price',prodData.price)
formData.append('description',prodData.description)
formData.append('image', prodData.image)
formData.append('category', prodData.category)
  
 fetch(process.env.REACT_APP_BACKEND_URL+'edit-product/' + this.state.selectedProduct._id,{
      method: 'PUT',
      headers:{
        Authorization: 'Bearer ' + this.props.token,
      
      },
      body: formData
    }).then(res=>{
      if(res.status!==200 && res.status!==201){
        throw new Error('Could not edit product')
      }
      return res.json()
    }).then(resData=>{
      console.log(resData)
       const prodInd = this.state.products.findIndex(p=> p._id===resData.product._id)
      let updatedProducts=[...this.state.products]
      updatedProducts[prodInd] = resData.product
      this.setState({products: updatedProducts, selectedProduct: null})
      this.props.history.replace('/')
    }).catch(err=>{
      console.log(err)
      this.props.catchError(err)

  })
  }

  
  backdropClickHandler = () => {
    this.setState({ showBackdrop: false, message: null });
  };

  showBackdropHandler=()=>{
    this.setState({showBackdrop: true})
  }

  errorSolver = () => {

    this.setState({ message: null });
    console.log(this.state)
  };

  clearCartStorage(){
    localStorage.removeItem('cart')
   }

 setClearCartStorage(milliseconds){
   setTimeout(() => {
      this.clearCartStorage();
    }, milliseconds);

 }
  render() 
  {
    
    return(
      <Fragment>
         {this.state.showBackdrop && (
          <Backdrop onClick={this.backdropClickHandler} />
        )}
   {this.state.message && <Backdrop onClick={this.errorSolver} />}
          {this.state.message && (
            <Modal
              title={this.state.message.title}
              onCancelModal={this.errorSolver}
              onAcceptModal={this.errorSolver}
              acceptEnabled
            >
              <p>{this.state.message.content}</p>
            </Modal>
          )}


         <Suspense fallback={<LoadingSpinner asOverlay/>}>
        <Switch>
          <Route path='/' exact render={(props) => <Shop token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/deserts' exact render={(props) => <Shop param='deserts' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/drinks' exact render={(props) => <Shop param='drinks' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/desi' exact render={(props) => <Shop param='desi' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/desi' exact render={(props) => <Shop param='desi' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/fast-food' exact render={(props) => <Shop param='fastfood' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/barbecue' exact render={(props) => <Shop param='barbecue' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path="/add-product"  exact render={(props) =><AddProductForm token={this.props.token} editMode={false} {...props}  isAuth={this.props.isAuth} clicked={this.addProductHandler} />}/>
          <Route name='product-view' path="/product/:prodId" exact render={(props)=><ProductView addToCart={this.addToCartHandler} token={this.props.token} {...props} />   }></Route>
          <Route path='/edit-product'  exact render={(props)=><AddProductForm token={this.props.token} clickedEdit ={this.clickedEditHandler} product={this.state.selectedProduct} editMode={true} {...props} isAuth={props.isAuth}/>}/>
          <Route path='/Cart' exact render={(props)=><Cart removeFromCartHandler={this.removeFromCartHandler} quantityHandler={this.quantityHandler}  cart={this.state.cart} {...props}/>}/>
          <Route path='/Checkout' exact render={(props)=><Checkout {...props} cart={this.state.cart} loading={this.state.loading}   clicked={this.addOrderHandler}/>}/>
          <Route path="/login" exact render={(props) =><Login  className='login' {...props} login={this.props.login}/>}/>
          <Route path="/signup" exact render={(props) =><Signup {...props} token={this.props.token}  isAuth={this.props.isAuth} signup={this.props.signup}/>}/>
          <Route path='/orders'  exact render={(props)=><Orders {...props} token={this.props.token} catchError={this.props.catchError}/>}/>
          <Redirect to='/'/>
     </Switch>
     </Suspense> 
     </Fragment>
  )
  }
  

}

export default withRouter( Body);