
  export const checkValidity=(value,rules)=>{
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
        if(rules.maxLength)
        {
             isValid= value.length <= rules.maxLength && isValid;
        }

        return isValid;
    }   
