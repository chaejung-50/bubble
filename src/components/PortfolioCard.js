import React from 'react';
import { useHistory } from 'react-router-dom';

const PortfolioCard = (props) => {
    let history = useHistory();
    let prompt = props.stockName;

    const handleRedirect = (props) => {
        try {
            history.push({
                pathname: '/stockInfo',
                search: `?query=${props}`,
                state: {
                    key: props,
                }
            });
        }
        catch (err){
            console.log(err);
        }
    }

    return(
        <div className='card' style={{ width: '200px'}} onClick={() => handleRedirect(prompt)}>
            <p className='bolder'>{props.stockName}</p>
            <p>Quantity: <span className='bolder'>{props.amount}</span></p>
            <p>Cost Per Share: <span className='bolder'>{props.costPerShare}</span></p>
        </div>
    );
};

export default PortfolioCard;