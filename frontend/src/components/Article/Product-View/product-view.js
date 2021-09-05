import React, {Component} from 'react';
import './productView.css'
import LoadingSpinner from '../../UI components/LoadingSpinner';

class ProductView extends Component{

state={
    product:[],
    loading: false
}


componentDidMount() {
    console.log(this.props.match)
    const prodId = this.props.match.params.prodId;
    this.setState({loading:true})

 
  fetch(process.env.REACT_APP_BACKEND_URL+'get-product/'+ prodId,
        { method: "GET", 
          
          }).then(res=>{
            if(res.status!==200 && res.status!==201){
              throw new Error(' could not fetch product')
            }
            console.log(res)
            return res.json()
          }).then(resData=>{
            console.log(resData)
            this.setState({
                product: resData.product,
                loading: false
                
            })
            console.log(this.state)
          }).catch(err=>{
            this.setState({
              
              loading: false
              
          })
            console.log(err)
          })
      
      
}

     
   
    render(){
        console.log(this.state.product)
       let product = this.state.product;
       if(!product)
       {
           return <h3>Something went wrong try to reload page!</h3>
       }

      
      if(this.state.loading){
        return (<LoadingSpinner asOverlay/>)
      }   
      
return (
  <main className='centered'>
      <h1>{product.title}</h1>
      <div >
          <img className="image" src={process.env.REACT_APP_BACKEND_URL+`${product.imageUrl}`} alt={product.title} />
      </div>
      <h2>{`Rs: ${product.price}`}</h2>
      <p>{product.description}</p>
      <button className="Btn" onClick={()=>this.props.addToCart(product._id)}>Add to cart</button>
      </main>
       )

    }
    
    
}

export default ProductView;