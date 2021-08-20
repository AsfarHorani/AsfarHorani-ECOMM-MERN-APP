import React from 'react';
import Auth from '../auth';
import Input from '../../Form/input';
import './login.css'

const login=(props)=>{
console.log(props)
let email, password;
const inputChangedHandler=(event,identifier)=>{
    if(identifier === 'email')
    {
        email= event.target.value
    }
    else if(identifier==='password')
    {
         password = event.target.value
       
    }
}

const clickedHandler=(em,pas)=>{
    const data={
        email:em,
        password: pas
    }
    console.log(data)
    props.login(data);
    props.history.replace('/')
   
}


return( 
<Auth>
        
     
        <h2>Login</h2>
  <Input  id = 'email'
        onChange={(event)=>inputChangedHandler(event,'email')} 
        elementType='email' 
        label='Email'/>
 
    <Input 
        id = 'password'
        onChange={(event)=>inputChangedHandler(event,'password')} 
        elementType='password' 
        label='Password'/>
        
        <button  onClick={()=>clickedHandler(email,password)} className="Btn">Login</button>
       
    </Auth>
)
}


export default login;