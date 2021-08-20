import Header from '../../components/Header/Header';
import React, {Component} from 'react';
import Shop from '../../components/shop/home/home';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import SideBar from '../../components/SideBar/sideBar';
import SideDrawer from '../../components/SideBar/sideDrawer/sideDrawer';
import { Route, Switch, Redirect, withRouter } from 'react-router-dom';
import AddProductForm from '../../components/Add-Product From/addProductForm'
import Signup from '../../components/Auth/signup/signup'
import Login from '../../components/Auth/login/login'
import ProductView from '../../components/Article/Product-View/product-view';
import Cart from '../../components/cart/cart';
import Checkout from '../../components/checkout/checkout';
import Orders from '../..//components/orders/orders'

class Body extends Component {

  state={  
    selectedProduct: null,
    loggedInAdmin : null,
    
    products: [],
    cart: {
      items:[],
     totalPrice: null
    },
    loading: false,
    

}

shouldComponentUpdate(nextProps, nextState) {
  return this.state.products.length!= nextState.products.length;
 
}

componentDidMount(){
  
this.setState({loading: true})
fetch('http://localhost:8080/get-products')
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
  })
}



addProductHandler=(prodData)=>{

const formData = new FormData();
formData.append('title',prodData.title)
formData.append('price',prodData.price)
formData.append('description',prodData.description)
formData.append('image', prodData.image)
formData.append('category', prodData.category)

console.log(formData)
fetch('http://localhost:8080/add-product/',{
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
    
  })
  .catch(err=>{
    console.log(err)
  })
  

}

deleteHandler=(prodId)=>{
  
  console.log(prodId)
  fetch('http://localhost:8080/delete-product/' + prodId,
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
      return{ cart: {...this.state.cart, items: updatedCartItems, totalPrice: updatedPrice}}
     // this.setState({ someProperty: { ...this.state.someProperty, flag: false} });
    })
  }
  
    }

     clickCheckoutHandler=(cart)=>{
      this.setState({cart: cart})
     }

  addOrderHandler=(data)=>{
    console.log(data,this.state.cart)
    fetch('http://localhost:8080/add-order/',{
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
        throw new Error('Coul\'d not place your order')
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
       return{ cart: {...this.state.cart, items: updatedCartItems, totalPrice: updatedPrice}}
       })
     }).catch(err=>{
       console.log(err)
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
  
 fetch('http://localhost:8080/edit-product/' + this.state.selectedProduct._id,{
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
      this.setState({selectedProduct: null})
    })
  }

 

  render() 
  {
    
    return(
      <Auxiliary>
       
        <Switch>
          <Route path='/' exact render={(props) => <Shop token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/deserts' exact render={(props) => <Shop param='deserts' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/drinks' exact render={(props) => <Shop param='drinks' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/desi' exact render={(props) => <Shop param='desi' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/desi' exact render={(props) => <Shop param='desi' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/fast-food' exact render={(props) => <Shop param='fastfood' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path='/barbecue' exact render={(props) => <Shop param='barbecue' token={this.props.token} {...props} loading={this.state.loading} addToCart={this.addToCartHandler} editHandler={this.editHandler} delete={this.deleteHandler} isAuth={this.props.isAuth} products={this.state.products}/>}/>
          <Route path="/add-product"  exact render={(props) =><AddProductForm token={this.props.token} editMode={false} {...props}  isAuth={this.props.isAuth} clicked={this.addProductHandler} />}/>
          <Route name='product-view' path="/product/:prodId" exact render={(props)=><ProductView token={this.props.token} {...props} />   }></Route>
          <Route path='/edit-product'  exact render={(props)=><AddProductForm token={this.props.token} clickedEdit ={this.clickedEditHandler} product={this.state.selectedProduct} editMode={true} {...props} isAuth={props.isAuth}/>}/>
          <Route path='/Cart' exact render={(props)=><Cart clicked={this.clickCheckoutHandler} cart={this.state.cart} {...props}/>}/>
          <Route path='/Checkout' exact render={(props)=><Checkout  {...props} cart={this.state.cart} clicked={this.addOrderHandler}/>}/>
          <Route path="/login" exact render={(props) =><Login {...props}  login={this.props.login}/>}/>
          <Route path="/signup" exact render={(props) =><Signup {...props} token={this.props.token} {...props}  signup={this.props.signup}/>}/>
          <Route path='/orders'  exact render={(props)=><Orders {...props} token={this.props.token}/>}/>
          <Redirect to='/'/>
     </Switch>
      </Auxiliary>
  )
  }
  

}

export default withRouter( Body);