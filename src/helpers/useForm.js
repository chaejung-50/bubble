import React, { useState, useEffect } from 'react';

const useForm = (cbBuy, cbSell, validate) => {
    const [values, setValues] = useState({});
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [sellValues, setSellValues] = useState({});
    const [sellErrors, setSellErrors] = useState({});

    useEffect(() => {
        if (Object.keys(errors).length === 0 && isSubmitting){
            cbBuy();
        }
    },[errors]);

    const handleSubmit = (e, price, balance) => {
        e.preventDefault();
            if(balance < (price * values.amount)){
                alert(`you don't have enough cash balance`);
                setIsSubmitting(false);
            }
            else {
                e.preventDefault();
                setErrors(validate(values));
                setIsSubmitting(true);
            }
    }

    const handleChange = (e) => {
        e.persist();
        setValues(values => ({...values, [e.target.name] : e.target.value}))
    }


    useEffect(() => {
        if (Object.keys(sellErrors).length === 0 && isSubmitting){
            cbSell();
        }
    },[sellErrors])


    const handleSellSubmit = (e, currentAmount) => {
        e.preventDefault();
        if(currentAmount < sellValues.amount){
            alert(`you don't have enough shares to complete sale`);
            setIsSubmitting(false);
        }
        else {
            e.preventDefault();
            setSellErrors(validate(sellValues));
            setIsSubmitting(true)
        }
    }

    const handleSellChange = (e) => {
        e.persist();
        setSellValues(values => ({...values, [e.target.name] : e.target.value}))
    }


    return {
        handleChange, 
        handleSubmit,
        handleSellChange, 
        handleSellSubmit,
        values, 
        errors,
        sellValues,
        sellErrors,
    }
}

export default useForm;