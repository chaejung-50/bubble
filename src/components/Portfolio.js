import React, { useState, useEffect } from 'react';
import app from '../helpers/useFirebase';

import PortfolioCard from './PortfolioCard';

const Portfolio = () => {

    const uid = app.auth().currentUser.uid;
    const [balance, setBalance] = useState([]);
    const [stocks, setStocks] = useState([]);

    //getting Firebase user balance 
    useEffect(() => {
        let doc = app.firestore().collection(`${uid}_savings`).doc('showSavingsBalance');

        doc.onSnapshot(snapshot => {
            setBalance(snapshot.data().savingsBalance.toFixed(2))
        });
    },[]);


    //getting Firebase user Portfolio stocks
    useEffect(() => {
        app.firestore().collection(`${uid}_stocks`).onSnapshot(snapshot =>{
            const stockSnapshot = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data()
            }))
            console.log(stockSnapshot);
            setStocks(stockSnapshot)
        })
    },[])

    
    //need another function here to compare gains and losses each day

    console.log(stocks)
    return(
        <div>
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