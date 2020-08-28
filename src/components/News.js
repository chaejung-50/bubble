import React, { useState, useEffect } from 'react';

import NewsItem from './NewsItem';

const News = () => {

    const [array, setArray] = useState([])
    const getNews = () => {
        const IE_API_KEY = 'pk_ffeccaa1c6b7449a9b120b12aabb1512'
        let ticker = 'GOOGL'
        const API_CALL_NEWS = `https://cloud.iexapis.com/stable/stock/${ticker}/news?token=${IE_API_KEY}`;

        fetch(API_CALL_NEWS)
        .then(
            function(res){
                console.log(res)
                return res.json();
                
            }
        )
        .then(result => {
            let newsArray = result.slice(0, 3);
            setArray(newsArray);
        })
    }
    console.log(array)

    useEffect(() => {
        getNews();
    },[])
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
