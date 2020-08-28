import React from 'react';

const HighlightsItem = (props) => {
    return(
        <div className="card">
            <p>Cryptocurrency</p>
            <p>{props.title}</p>
            <p>{props.price}</p>
        </div>
    );
};

export default HighlightsItem;