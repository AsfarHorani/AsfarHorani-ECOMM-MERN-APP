import React , {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import Input from '../Form/input';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './admin.module.css';

const AddProductForm= (props)=>{
    let history = useHistory();
  const [title, setTitle] = useState(
      {
 
 
        value:'',
        validation : {
         required: true,
         minLength: 5,
         maxLength: 20,
         message: '*must be of length between 5 and 20 letters'
                },
       valid: false,
     
       touched: false
})
 const [product, setProduct] = useState({})

 const [price, setPrice] = useState(
    {
      type: 'text',
      placeholder: 'Product price',
     
      value:'',
      validation : {
       required: true,
       message: '*must be a number of max 5 digits',
       minLength: 1,
       maxLength: 5,
              },
         
     valid: false,
     touched: false
})
const [category,setCategory]=useState({value:''})
 const [description, setDescription] = useState(
    {
      type: 'text',
      placeholder: 'Product description',

      value:'',
      validation : {
       required: true,
       message: '*Must be of length between 20 and 500',
       minLength: 20,
       maxLength: 500,
              },
     
     valid: false,
     touched: false
})

const [image, setImage] = useState()

useEffect(()=>{
   
    if(props.editMode && props.product){
        console.log(props.product)
        let editProduct = props.product ;
        setProduct({editProduct})
        let editPrice = {...price}
        editPrice.value= editProduct.price
        setPrice(editPrice); 
        console.log(editProduct)
         
           let imageOld = editProduct.imageUrl
        
           setImage(imageOld)
        let editTitle = {...title}
        editTitle.value = editProduct.title;
        setTitle(editTitle); 
        let editDescription = {...description}
        editDescription.value = editProduct.description
        setDescription(editDescription); 
        let cat = {...category};
        cat.value = editProduct.category
        setCategory(cat)
        console.log(category)
    }
     
    
 },[props.product])

 
    let elements

    const inputChangedHandler = (event,identifier)=>{
        if(identifier==='title')
        {
        
        const isValid = checkValidity(event.target.value,title.validation)
        setTitle({...title, value: event.target.value, touched: true, valid: isValid});
        console.log(title)
        }
        if(identifier==='price')
        {
            let isValid = checkValidity(event.target.value,price.validation)
        
            setPrice({...price, value: event.target.value,touched: true,valid: isValid})
           
        }
        if(identifier==='image')
        {
            
            const uploadedImage=event.target.files[0]
            console.log(uploadedImage)
            setImage(uploadedImage)

          
        }
        if(identifier==='desc')
        {
            let isValid = checkValidity(event.target.value,description.validation)
            setDescription({...description, value: event.target.value,touched: true,valid: isValid})
            console.log(description)
           
        }
        if(identifier==='category')
        {
            let isValid = event.target.value!='' || null;
            let cat;
            cat= {...category}
            cat.value= event.target.value
           setCategory(cat) 
           console.log(category)
        }
    
     
    }

    const checkValidity=(value,rules)=>{
        let isValid = true;

    
        if(rules.required)
        {   
            isValid= value.trim()!=='' && isValid;
        }
        if(rules.minLength)
        {
            console.log(value,rules)
             isValid= value.length >= rules.minLength && isValid;
             
        }
        if(rules.minLength)
        {
             isValid= value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }   

const clickedHandler=()=>{
   
  const productData={
      price: price.value,
      title: title.value,
      description: description.value,
      image: image,
      category: category.value
  }
  console.log(productData)
props.clicked(productData);
     
}
const EditClickHandler= ()=>{
      
    const productData={
      price: price.value,
      title: title.value,
      description: description.value,
      image: image,
      category: category.value
    }
   console.log(productData)
    props.clickedEdit(productData);
      
  }

 const cancelEdit=()=>{
        history.push('/')
 }

        
    if(props.editMode){
        console.log(price)
        elements = ( <div className={classes.Form}>
         <Input 
        id = 'title'
        onChange={(event)=>inputChangedHandler(event,'title')} 
        value={title.value} 
        elementType={title.type}
        invalid={!title.valid}
        message={title.validation.message}
        touched={title.touched}
        label='Title'
        shouldValidate={title.validation.required}/>

<div className={classes.Input}>
            <label 
         className={classes.Label}>
         Category
        </label>
       <select value={category}  className={classes.InputElement} onChange={(event)=>inputChangedHandler(event,'category')}>
                <option value="Empty" >Select Category</option>
                <option value="desi">Desi</option>
                <option value="drink">Drink</option>
                <option value="deserts">Deserts</option>
                <option value="barbecue">Barbecue </option>
                <option value="fastfood">Fast food</option>
             </select>
        </div>
       <Input 
        id= "price"
        message={title.validation.message}
     
        value={price.value}
        onChange={(event)=>inputChangedHandler(event,'price')} 
        elementType='text' 
        value={price.value}
        invalid={!price.valid}
        touched={price.touched}
       
        shouldValidate={price.validation.required}

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
message={description.validation.message}
      
value={description.value}
elementType="textArea"
invalid={!description.valid}
touched={description.touched}

shouldValidate={description.validation.required}
label="Desciption"
/>
<div >
<button  className={classes.Btn} onClick={()=>EditClickHandler(price.value,title.value,description.value,category)}>Okay</button>
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
        invalid={!title.valid}
        message={title.validation.message}
        touched={title.touched}
        label='Title'
        shouldValidate={title.validation.required}/>

        <div className={classes.Input}>
            <label 
         className={classes.Label}>
         Category
        </label>
       <select className={classes.InputElement}  onChange={(event)=>inputChangedHandler(event,'category')}>
               <option value="Empty" >Select Category</option>
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
        elementType='tel' 
        message={price.validation.message}
        label='Price'
        invalid={!price.valid}
        touched={price.touched}
        shouldValidate={price.validation.required}/>
    
    <Input 
        id="image"
        onChange={(event)=>inputChangedHandler(event,'image')} 
        elementType='file' 
        accept='png, .jpg,.jpeg'
        label='Image'/>
    
<Input
id="description"
message={description.validation.message}
onChange={(event)=>inputChangedHandler(event,'desc')} 
elementType="textarea"
label="Desciption"
invalid={!description.valid}
touched={description.touched}
shouldValidate={description.validation.required}
/>
<div >
<button  className={classes.Btn} onClick={()=>clickedHandler(price.value,title.value,description.value,category)}>Add</button>
<button  className={classes.Btn} onClick={()=>cancelEdit()}>Cancel</button>

</div>
        </div>


</Auxiliary>)
    }

    return (elements )
    



}


export default AddProductForm;