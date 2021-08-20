import React from 'react';
import classes from './input.module.css';

const input=(props)=>{
let inputElement=null;


switch(props.elementType)
{
    case('input' || 'email'):
            inputElement= <input
            type={props.elementType}
            classesName={classes.InputElement}
            {...props}
           />
    break

    

    case('textArea'):
    inputElement= <textarea
   classesName={classes.InputElement}
   type={props.elementType}
    {...props}
   />
   break

   case('file'):
   inputElement= <input
   type={props.elementType}
   classesName={classes.InputElement}
   {...props}
  />
  break

  case('password'):
   inputElement= <input
   type={props.elementType}
   classesName={classes.InputElement}
   {...props}
  />
  break
  default: inputElement= <input onChange={props.changed} className={classes.inputElement} {...props}  />

}
       


return (
    <div className={classes.Input}>
    <label 
    className={classes.Label}>
        {props.label}
        </label>

        {inputElement}
    {/* {validationError} */}
</div>

) 

}


export default input;