import React, { useState, useEffect } from 'react';
import NewsItem from './NewsItem';

require('dotenv').config();

const News = () => {
    const [array, setArray] = useState([]);

    const getNews = () => {
        const IE_API_KEY = process.env.REACT_APP_IEX_API_KEY_THREE;
        let ticker = 'GOOGL';
        const API_CALL_NEWS = `https://cloud.iexapis.com/stable/stock/${ticker}/news?token=${IE_API_KEY}`;

        fetch(API_CALL_NEWS)
        .then(res => {
                return res.json();
            }
        )
        .then(result => {
            let newsArray = result.slice(0, 3);
            setArray(newsArray);
        });
    }

    useEffect(() => {
        getNews();
    },[]);

    return(
        <div>
            {array.map(show => (
                <NewsItem
                    src={show.image}
                    url={show.url}
                    headline={show.headline}
                    summary={show.summary}
                />
            ))}
        </div>
    );
};

export default News; 
