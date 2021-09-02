import React from 'react';
import classes from './input.module.css';

const input=(props)=>{
    let inputElement = null;
    let inputClasses = [classes.InputElement]

    if(props.invalid && props.shouldValidate && props.touched)
    {
        console.log(props)
        inputClasses.push(classes.Invalid)
    }
    switch(props.elementType)
    {
        case('input'):
        inputElement=<input  
        type= 'text'
         className={inputClasses.join(' ')} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}/>;
        break;
        case('email'):
        inputElement=<input  
        type= 'email'
        className={inputClasses.join(' ')} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}/>;
        break;
        case('tel'):
        inputElement=<input  
        pattern="[0-9]"
        className={inputClasses.join(' ')} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}
        type='tel'/>;
        break;
        case('password'):
        inputElement=<input  
         className={inputClasses.join(' ')} 
         placeholder={props.placeholder}
         type='password'
         value={props.value}
        onChange={props.onChange}/>;
        break;
        case('file'):
        inputElement=<input  
        type = 'file'
         className={inputClasses.join(' ')} 
         placeholder={props.placeholder}
         value={props.value}
          onChange={props.onChange}/>;
        break;
        case('textarea'):
        inputElement=<textarea 
        type='textarea'  
        className={inputClasses.join(' ')} 
        placeholder={props.placeholder}
        value={props.value}
        onChange={props.onChange}/>;
        break;

        case('select'):
        inputElement=(<select
          className={classes.Select} 
          onChange={props.changed}
          value={props.value}>
              {props.options.map(opt=>{
                  return (
                  <option key={opt.value}value= {opt.value} onChange={props.changed}>{opt.displayValue}</option>
                  )
              })}
          </select>);
        break;

        default:
            inputElement= <input {...props} className={inputClasses.join(' ')}  value={props.value}/>;
            break;

    }
    console.log(props.message)
let validationError = null;
if (props.invalid && props.touched ) {
    validationError = <p>{props.message}</p>;
  
}


return (
    <div className={classes.Input}>
    <label 
    className={classes.Label}>
        {props.label}
        </label>

        {inputElement}
      {validationError}
</div>

) 

}


export default input;