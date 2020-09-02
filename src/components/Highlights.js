import React, { useEffect, useState } from 'react';
import HighlightsItem from './HighlightsItem';

require('dotenv').config();

const Highlights = (props) => {
    const IE_API_KEY = process.env.REACT_APP_IEX_API_KEY_SIX;
    const cryptoTicker = 'btcusd';
    const cpiTicker = 'CPIAUCSL';
    const recessionTicker = 'RECPROUSM156N';

    const API_CALL_CRYPTO = `https://cloud.iexapis.com/stable/crypto/${cryptoTicker}/price?token=${IE_API_KEY}`;
    const API_CALL_CPINDEX = `https://cloud.iexapis.com/stable/data-points/market/${cpiTicker}?token=${IE_API_KEY}`;
    const API_CALL_REC = `https://cloud.iexapis.com/stable/data-points/market/${recessionTicker}?token=${IE_API_KEY}`;

    const [crypto, setCrypto] = useState('');
    const [cpi, setCpi] = useState('');
    const [rec, setRec] = useState('');

    const getCrypto = () => {
        fetch(API_CALL_CRYPTO)
        .then(res => res.json())   
        .then(data => {
            setCrypto(data.price);
        });
    };

    const getCPI = () => {
        fetch(API_CALL_CPINDEX)
        .then(res => res.json())   
        .then(data => {
            setCpi(data);
        });
    };

    const getRec = () => {
        fetch(API_CALL_REC)
        .then(res => res.json())   
        .then(data => {
            setRec(data);
        });
    };

    useEffect(() => {
        getCrypto(); getCPI(); getRec();
    },[]);

    return(
        <div>
            <HighlightsItem title={'Bitcoin'} price={crypto} />
            <HighlightsItem title={'Consumer Price Index'} price={cpi} />
            <HighlightsItem title={'Recession Probabilities'} price={rec} />
        </div>
    );
};

export default Highlights;