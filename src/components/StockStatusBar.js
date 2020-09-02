import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import { Button, TextField } from '@material-ui/core';
import app from '../helpers/useFirebase';
import useForm from '../helpers/useForm';
import validate from '../helpers/useFormValidationRules';


const StockStatusBar = (props) => {
    const uid = app.auth().currentUser.uid;
    const [stocks, setStocks] = useState([]);
    const [amount, setAmount] = useState([]);
    const [info, setInfo] = useState([]);
    const [holding, setHolding] = useState(false);
    const [currentAmount, setCurrentAmount] = useState(0);
    const [balance, setBalance] = useState([]);

    let docu = app.firestore().collection(`${uid}_savings`).doc('showSavingsBalance');

    useEffect(() => {
        app.firestore().collection(`${uid}_stocks`).onSnapshot(snapshot =>{
            const amountSnapshot = snapshot.docs.map((doc) => ({...doc.data()}));
            setInfo(amountSnapshot);
        });
    },[]);
    
    useEffect(() => {
        docu.onSnapshot(snapshot => {
            setBalance(snapshot.data().savingsBalance.toFixed(2));
        });
    },[]);

    useEffect(() => {
        const tempArr = info.map(stock => stock.stockName);
        const tempArrAm = info.map(stock => stock.amount);
        setStocks(tempArr);
        setAmount(tempArrAm);
    },[info]);

    useEffect(() => {
        let index = stocks.indexOf(props.searchedTicker);
        if(index > -1){
            setCurrentAmount(amount[index]);
            setHolding(true);
        }
        else{
            setCurrentAmount(0);
            setHolding(false);
        }
    });

    const {
        values, 
        errors, 
        sellValues,
        sellErrors,
        handleChange, 
        handleSubmit,
        handleSellChange,
        handleSellSubmit,
    } = useForm(buy, sell, validate)

    function buy(){
        app.firestore().collection(`${uid}_stocks`).doc(`${props.searchedTicker}`).set({
            stockName: props.searchedTicker,
            amount: (parseInt(values.amount) + parseInt(currentAmount)),
            costPerShare: props.latestPrice,
        });

        let docu = app.firestore().collection(`${uid}_savings`).doc('showSavingsBalance');
        docu.get().then( (doc) => {                    
            let current = doc.data().savingsBalance - (parseInt(values.amount) * parseInt(props.latestPrice));
            docu.update({
                savingsBalance : current,
            })
        })
        alert(`Success! You bought shares of ${props.searchedTicker}`);
    }

    function sell() {
        app.firestore().collection(`${uid}_stocks`).doc(`${props.searchedTicker}`).set({
            stockName: props.searchedTicker,
            amount: (parseInt(currentAmount) - parseInt(sellValues.amount)),
            costPerShare: props.latestPrice,
        });

        let docu = app.firestore().collection(`${uid}_savings`).doc('showSavingsBalance');
        docu.get().then( (doc) => {                    
            let current = doc.data().savingsBalance + (parseInt(sellValues.amount) * parseInt(props.latestPrice));
            docu.update({
                savingsBalance : current,
            });
        });
        alert(`Success! You sold shares of ${props.searchedTicker}`);
    }

    return(
        <>
            <Grid item sm={6} style={{ fontSize: '12px', paddingTop:'1vh'}}>
                <p>Holding: <span className='bolder'>{currentAmount}</span></p>
                <p>Market Price: <span className='bolder'>{props.latestPrice}</span></p>
                <form onSubmit={(e) => {handleSubmit(e, props.latestPrice, balance)}}>
                    {errors.amount && (
                        <span className='errorText'>{errors.amount}</span>
                    )}
                    <TextField
                    onChange={handleChange}
                    id="standard-required"
                    required
                    name="amount"
                    id="amount"
                    value={values.amount}
                    label="Amount" 
                    />
                    <Button type='sumbit' variant='outlined' color='primary'>Buy</Button>
                </form>
                {holding ? 
                    <form onSubmit={(e) => {handleSellSubmit(e, currentAmount)}}>
                    {sellErrors.amount && (
                        <span className='errorText'>{sellErrors.amount}</span>
                    )}
                        <TextField 
                        onChange={handleSellChange}
                        id="standard-required"
                        required
                        name="amount"
                        id="sellAmount"
                        value={sellValues.sellAmount}
                        label="Amount" 
                        />
                        <Button type='submit' variant='outlined' color='primary'>Sell</Button> 
                    </form>
                : null}
            </Grid>
            <Grid item sm={6} style={{fontSize: '12px'}}>
                Available Cash Balance: ${balance}
            </Grid>
        </>
    );
};

export default StockStatusBar;