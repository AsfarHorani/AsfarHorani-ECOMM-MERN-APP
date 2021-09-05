import React from 'react';
import classes from './article.module.css';

import {Link} from 'react-router-dom';
const article=(props)=>{

    let buttons = null;
    
    if(props.isAuth){
        buttons =  (<div className={classes.Actions}>
            <Link to= '/edit-product' onClick={()=>props.editHandler(props.id)} className={classes.Btn}>Edit</Link>
            <Link to= {'/product/' + props.id} className={classes.Btn}>Details</Link>
            <button  onClick={()=>props.delete(props.prodId)} className={classes.Btn}>Delete</button>
            </div>)
    }else{
        buttons=(<div className={classes.Actions}>
            <button onClick={()=>props.addToCart(props.prodId)} className={classes.Btn}>Add to Cart</button>
            <Link to= {'/product/' + props.id} className={classes.Btn}>Details</Link>
               </div> )
    }
    
    return( 
    
    <div className={classes.Item}>

    <header className={classes.CardHeader}>
        <h1 className={classes.Title }>{ props.title }</h1>
    </header>

    <div >
        <img className={classes.Image} src={process.env.REACT_APP_BACKEND_URL+`${props.imageUrl}`} alt={props.title}/>
        
    </div>

    <div className={classes.Content}>
        <h2 className={classes.Price}>{`Rs ${props.price}`}</h2>
       
    </div>
    
    <div className={classes.Actions}>
 
                    {buttons}
    </div>
</div>)
}

export default article;