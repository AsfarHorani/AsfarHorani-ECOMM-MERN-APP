import React, { Component,Fragment } from 'react';
import SideBar from '../../SideBar/sideBar'
import Article  from '../../Article/article';
import classes from './shop.module.css';
const shop=(props)=>{
    let prods = props.products ;
    const param = props.param
    console.log(props.param)
    switch(param)
    {
        case('deserts'):
         prods= props.products.filter(p=>p.category=== 'deserts')
        console.log(prods)
        break
        case('desi'):
         prods= props.products.filter(p=>p.category=== 'desi')
    
        break
        
        case('drinks'):
        prods= props.products.filter(p=>p.category=== 'drinks')
        break
        case('fastfood'):
        prods= props.products.filter(p=>p.category=== 'fastfood')
        break
        case('barbecue'):
        prods= props.products.filter(p=>p.category=== 'barbecue')
        break

    default: prods = prods
    
     break
    
     
    }



    if(props.loading){
             return (
                <h1>loading...</h1>
            )
        }

        if(!prods || prods.length===0){
            return (
                <h1>No Products !</h1>
            )
        }
    
        

        prods = prods.map(art=>{
            
           return( <Article
             addToCart={props.addToCart}
             key={art._id}
             editHandler={props.editHandler}
             id={art._id}
             prodId={art._id}
             isAuth={props.isAuth}
             title={art.title} 
             price={art.price}  
             description={art.description}
             imageUrl={ art.imageUrl}
             delete={props.delete}
             key={art._id}/>)
        })
        
    
        return (
            <Fragment>
            <SideBar />
        <div className={classes.Grid}>{prods}  </div> 
        </Fragment>
    )

    }



export default shop;