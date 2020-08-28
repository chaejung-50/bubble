import React from 'react';

const PortfolioCard = (props) => {
    return(
        <div className="card" style={{ width: '200px'}}>
            {/* <img src={}></img> */}
            <p>{props.stockName}</p>
            <p>Quantity: {props.amount}</p>
            <p>Cost Per Share: {props.costPerShare}</p>
        </div>
    );
};

export default PortfolioCard;