
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
        if(rules.type==='email')
        {
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            isValid = re.test(String(value).toLowerCase());
       
        }
        if(rules.type==='tel')
        {
            const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            isValid = re.test(String(value).toLowerCase());
       
        }
        
        return isValid;
    }   
