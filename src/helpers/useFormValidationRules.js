const validate = (values) => {
    let errors = {};

    if(!values.amount){
        errors.amount = 'Amount is required'
    } else if (!/^\d+$/.test(values.amount)){
        errors.amount = 'Must input a whole number, no fractional shares sorry!'
    } 
    
    return errors;
}

export default validate;