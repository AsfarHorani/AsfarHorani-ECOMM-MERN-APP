import React, {Component} from 'react';
import './productView.css'
class ProductView extends Component{

state={
    product:[],
    loading: false
}


componentDidMount() {
    console.log(this.props.match)
    const prodId = this.props.match.params.prodId;
    this.setState({loading:true})
  fetch('http://localhost:8080/get-product/' + prodId,
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
            console.log(err)
          })
      
      
}

     
   
    render(){
        console.log(this.state.product)
       let product = this.state.product;
       if(!product)
       {
           return null
       }

      
      if(this.state.loading){
        return (<h1>Loading...</h1>)
      }   
      
return (
  <main className='centered'>
      <h1>{product.title}</h1>
      <div >
          <img class="image" src={`http://localhost:8080/${product.imageUrl}`} alt={product.title} />
      </div>
      <h2>{`Rs: ${product.price}`}</h2>
      <p>{product.description}</p>
      <button className="Btn" onClick={()=>this.props.addToCart(product._id)}>Add to cart</button>
      </main>
       )

    }
    
    
}

export default ProductView;