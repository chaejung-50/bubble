import React from 'react';

const NewsItem = (props) => {
    let cutSummary = props.summary;
    if (cutSummary.length > 100) cutSummary = cutSummary.substring(0, 100) + '...';

    let cutHeadline = props.headline;
    if (cutHeadline.length > 100) cutHeadline = cutHeadline.substring(0, 100) + "...";
    
    return(
        <>
            <div className="newsImageHolder">
                <img src={props.src} className="newsImg"></img>
            </div>
            <div>
                <p style={{ fontWeight: 'bolder'}}>{cutHeadline}</p>
                <p>{cutSummary}</p>
            </div>
        </>
    );
};


export default NewsItem;