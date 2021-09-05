import React,{useEffect} from 'react';
import { useHistory } from "react-router-dom";
import Auth from '../auth';
import Input from '../../UI components/input';
import './signup.css'

const Signup=(props)=>{
    let history = useHistory();

 useEffect(()=>{
   if(!props.isAuth)
   {
    history.push("/");
   }
 },[props.isAuth])

    let name,email,password;
    const inputChangedHandler = (event,identifier)=>{
        if(identifier==='name')
        {
        name= event.target.value;
        
        }
        if(identifier==='email')
        {
            email = event.target.value
           
        }
       
        if(identifier==='password')
        {
             password = event.target.value
           
        }
        console.log(email,name,password)
   
    }

const clickedHandler=(em,na,pa)=>{
  const adminData={
      email: em,
      name: na,
      password: pa
  }
  
  console.log(adminData)
  props.clicked(adminData)
  
}



return( 
<Auth>
        
        <form>
        <h2>Signup</h2>
        <Input 
        id = 'name'
        onChange={(event)=>inputChangedHandler(event,'name')} 
        elementType='text' 
        label='Name'/>

    <Input 
        id = 'email'
        onChange={(event)=>inputChangedHandler(event,'email')} 
        elementType='email' 
        label='Email'/>
 
    <Input 
        id = 'password'
        onChange={(event)=>inputChangedHandler(event,'password')} 
        elementType='password' 
        label='Password'/>
        
        <button className="Btn" onClick={()=>clickedHandler(email,name,password)}>Signup</button>
        </form>
    </Auth>
)

}


export default Signup