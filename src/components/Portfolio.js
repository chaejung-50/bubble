import React, { useState, useEffect } from 'react';
import app from '../helpers/useFirebase';
import PortfolioCard from './PortfolioCard';

require('dotenv').config();
const Portfolio = () => {

    const uid = app.auth().currentUser.uid;
    const [balance, setBalance] = useState([]);
    const [stocks, setStocks] = useState([]);
    const [currentPrice, setCurrentPrice] = useState([]);

    //getting Firebase user balance 
    useEffect(() => {
        let doc = app.firestore().collection(`${uid}_savings`).doc('showSavingsBalance');

        doc.onSnapshot(snapshot => {
            setBalance(snapshot.data().savingsBalance.toFixed(2));
        });
    },[]);

    //getting Firebase user Portfolio stocks
    useEffect(() => {
        app.firestore().collection(`${uid}_stocks`).onSnapshot(snapshot =>{
            const stockSnapshot = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }));
            setStocks(stockSnapshot);       
        });
    },[]);

    //methods to create portfolio total 
    const [amount, setAmount] = useState([]);
    useEffect(() => {
        const tempArr = stocks.map(value => value.amount)
        setAmount(tempArr)
    },[stocks])
    

    useEffect(() => {
        const tempArr = stocks.map(value => value.id)
        tempArr.forEach(item => {
            const IE_API_KEY = process.env.REACT_APP_IEX_API_KEY_FIVE;
            const API_CALL_ = `https://cloud.iexapis.com/stable/stock/${item}/quote?token=${IE_API_KEY}`;
            fetch(API_CALL_)
            .then(res => res.json())
            .then(data => {
                setCurrentPrice(currentPrice => [...currentPrice, data.latestPrice]);
            });
        });
    },[stocks]);

    let [sum, setSum] = useState(0);
    useEffect(() => {
        for(let i = 0; i < currentPrice.length; i++){
            sum += currentPrice[i] * amount[i];
            setSum(sum);
        }
    },[currentPrice]);

    return(
        <div>
            <p>Total Invested Balance: <span style={{fontWeight: 'bolder'}}>{sum.toFixed(2)}</span></p>
            <div className="row" style={{height: '30vh', width: '50vw'}}>
                {stocks.map((stock) => (
                    <PortfolioCard 
                        key={stock.id}
                        stockName={stock.stockName}
                        amount={stock.amount}
                        costPerShare={stock.costPerShare}
                    />
                ))}
            </div>
        </div>
    )
}


export default Portfolio;