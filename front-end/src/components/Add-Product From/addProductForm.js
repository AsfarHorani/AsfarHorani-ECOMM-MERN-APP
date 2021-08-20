import React , {Component, useEffect} from 'react';
import Input from '../Form/input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './admin.module.css';

const addProductForm= (props)=>{


    let product = null ;
 
    let price, title, description,elements,image, category
if(props.editMode){
    product = props.product
    price = product.price; title=product.title; description= product.description; 
}
 

    const inputChangedHandler = (event,identifier)=>{
        if(identifier==='title')
        {
        title= event.target.value;
        
        }
        if(identifier==='price')
        {
            price = event.target.value
           
        }
        if(identifier==='image')
        {
            console.log(event.target.files)
            image=event.target.files[0]
          
        }
        if(identifier==='desc')
        {
             description = event.target.value
           
        }
        if(identifier==='category')
        {
            category = event.target.value
           console.log(category)
        }
        
     
    }
const clickedHandler=(pri,ti,desc,im,cat)=>{
   
  const productData={
      price: pri,
      title: ti,
      description: desc,
      image: im,
      category: cat
  }
  console.log(productData)
       props.clicked(productData);
       props.history.replace('/')
}
const EditClickHandler=(pri,ti,desc,im)=>{
      if(!im){
          im ={ path: props.product.imageUrl} 
      }
    const productData={
        price: pri,
        title: ti,
        description: desc,
        image: im
    }
         props.clickedEdit(productData);
         props.history.replace('/')
  }


        
    if(props.editMode){
      elements = ( <div className={classes.Form}>
        <Input 
        id = 'title'
        onChange={(event)=>inputChangedHandler(event,'title')} 
        defaultValue={product.title}
        elementType='text' 
        label='Title'/>

<div className={classes.Input}>
            <label 
         className={classes.Label}>
         Category
        </label>
       <select  onChange={(event)=>inputChangedHandler(event,'category')}>
                <option value="Empty" selected=''>Select Category</option>
                <option value="desi">Desi</option>
                <option value="drink">Drink</option>
                <option value="deserts">Deserts</option>
                <option value="barbecue">Barbecue </option>
             </select>
        </div>
       <Input 
        id= "price"
        onChange={(event)=>inputChangedHandler(event,'price')} 
        elementType='text' 
        defaultValue={product.price}
        label='Price'/>
    
    <Input 
        id="image"
        onChange={(event)=>inputChangedHandler(event,'image')} 
        elementType='file' 
        accept='png, .jpg,.jpeg'
        label='Image'/>
    
<Input
id="description"
onChange={(event)=>inputChangedHandler(event,'desc')} 
defaultValue={product.description}
elementType="textArea"
label="Desciption"
/>
<div >
<button  className={classes.Btn} onClick={()=>EditClickHandler(price,title,description,image,category)}>Okay</button>
<button  className={classes.Btn}>Cancel</button>

</div>

        </div>
        
      )
    } 
    else{
        elements =   (  <Auxiliary>
        <div className={classes.Form}>
        <Input 
        id = 'title'
        onChange={(event)=>inputChangedHandler(event,'title')} 
        elementType='text' 
        label='Title'/>

        <div className={classes.Input}>
            <label 
         className={classes.Label}>
         Category
        </label>
       <select onChange={(event)=>inputChangedHandler(event,'category')}>
               <option value="Empty" selected=''>Select Category</option>
                <option value="desi">Desi</option>
                <option value="drinks">Drink</option>
                <option value="deserts">Desert</option>
                <option value="barbecue">Barbecue </option>
                <option value="fastfood">Fast food</option>
             </select>
        </div>

<Input 
        id= "price"
        onChange={(event)=>inputChangedHandler(event,'price')} 
        elementType='text' 
        label='Price'/>
    
    <Input 
        id="image"
        onChange={(event)=>inputChangedHandler(event,'image')} 
        elementType='file' 
        accept='png, .jpg,.jpeg'
        label='Image'/>
    
<Input
id="description"
onChange={(event)=>inputChangedHandler(event,'desc')} 
elementType="textArea"
label="Desciption"
/>

        </div>

<div >
<button  className={classes.Btn} onClick={()=>clickedHandler(price,title,description,image,category)}>Add</button>
<button  className={classes.Btn}>Cancel</button>

</div>
</Auxiliary>)
    }

    return (elements )
    



}


export default addProductForm;