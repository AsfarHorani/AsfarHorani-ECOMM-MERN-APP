import React,{useState} from 'react';
import Auth from '../auth';
import Input from '../../Form/input';
import {checkValidity} from '../../../util/checkValidity'
import './login.css'

const Login=(props)=>{
console.log(props)

const [email, setEmail] = useState(
    {
  
  
      value:'',
      validation : {
       required: true,
       type: 'email',
       message: '*Not an email address',
       minLength: 1
              },
      valid: false,
      touched: false
  })

  const [password, setPassword] = useState(
    {
  
  
      value:'',
      validation : {
       required: true,
       type: 'password',
       message: '*cannot be empty',
       minLength: 1
              },
      valid: false,
      touched: false
  })


const inputChangedHandler=(event,identifier)=>{
    console.log(event.target.value)
    if(identifier === 'email')
    {
        let isValid = checkValidity(event.target.value,email.validation)
        setEmail({...email, value:event.target.value, valid: isValid, touched: true})
        console.log(email)
    }
    else if(identifier==='password')
    {
        let isValid = checkValidity(event.target.value,password.validation)
        setPassword({...password, value:event.target.value, valid: isValid, touched: true})
        console.log(password)
       
    }
}

const clickedHandler=()=>{
    const data={
        email:email.value,
        password: password.value
    }
   console.log(data)
    props.login(data);
  
   
}


return( 
<Auth>
        
     <div className='container'>
        <h2>Login</h2>
<Input 
  placeholder="Email Address " 
  message={email.validation.message}
  onChange={(event)=>inputChangedHandler(event,'email')} 
  invalid={!email.valid}
  touched={email.touched}
  shouldValidate={email.validation.required}
   elementType="email" 
  />
 
    <Input 
        id = 'password'
        placeholder="Password" 
        onChange={(event)=>inputChangedHandler(event,'password')} 
        elementType='password' 
        invalid={!password.valid}
        message={password.validation.message}
        touched={password.touched}
        shouldValidate={password.validation.required}
         />
        
        <button  onClick={()=>clickedHandler()} className="Btn">Login</button>
        </div>
    </Auth>
)
}


export default Login;