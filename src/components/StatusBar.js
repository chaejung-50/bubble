import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';

const StatusBar = () => {
    let d = new Date;
    let day = d.getUTCDay();
    let minutes = d.getUTCHours() * 60 + d.getUTCMinutes();
    const [marketStatus, setMarketStatus] = useState('');

    const timer = () => {
        if(day > 0 && day < 6 ){
            if(minutes >= 810 && minutes < 1200){
                setMarketStatus('open');
            }
        }
        //else
            setMarketStatus('closed');
    }

    useEffect(() => {
        timer();
    },[]);

    return(
        <Grid item sm={12}>
            <p>Market is currently {marketStatus}</p>
        </Grid>
    );
};

export default StatusBar;