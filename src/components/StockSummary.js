import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
require('dotenv').config();

const StockSummary = (props) => {

    let [summary, setSummary] = useState('')
    let [profileDataObj, setProfileDataObj] = useState({})
    let [stockDataObj, setStockDataObj] = useState({})

    const IE_API_KEY = process.env.REACT_APP_IEX_API_KEY_TWO;

    const API_CALL_STOCK = `https://cloud.iexapis.com/stable/stock/${props.searchedTicker}/quote?token=${IE_API_KEY}`
    const API_CALL_PROFILE = `https://cloud.iexapis.com/stable/stock/${props.searchedTicker}/company?token=${IE_API_KEY}`
 

    const getProfileData = () => {
        fetch(API_CALL_PROFILE)
        .then(res => res.json())
        .then(data => {
            setSummary(data.description)
            setProfileDataObj({
                'Exchange': data.exchange,
                'Industry': data.industry,
                'CEO': data.CEO,
                'Employees': data.employees,
            })
        })
    }

    const getStockData = () => {
        fetch(API_CALL_STOCK)
        .then(res => res.json())
        .then(data => {
            setStockDataObj({
                'Volume': data.latestVolume,
                'Open': data.open,
                '52 Week High': data.week52High,
                '52 Week Low': data.week52Low,
                '52 Week Range': data.week52Low + '-' + data.week52High,
                'Market Cap': data.marketCap,
                'Previous Close': data.previousClose,
                'P/E Ratio': data.peRatio,
            });
        })
    }

    useEffect(() => {
        getProfileData(); getStockData();
    },[props.searchedTicker])

    return(
        <>
        <Grid container spacing={4}>
            <Grid item sm={6}>
                <Grid>
                    <p>Profile</p>
                    <p>{summary}</p>
                </Grid>
                <Grid item className='row' style={{flexWrap: 'wrap', paddingRight: '3vw'}}>
                    {Object.entries(profileDataObj).map(([key, value]) => (
                        <div style={{ direction: 'flex', width: '20vw'}}>
                        <p className='bolder'>{key}</p>
                        <p>{value}</p>
                        </div>
                    ))}

                </Grid>
            </Grid>
            <Grid item sm={6}>
                <Grid className='row' style={{flexWrap: 'wrap', paddingTop: '4vh', paddingLeft: '5vw'}}>
                    {Object.entries(stockDataObj).map(([key, value]) => (
                        <div style={{ direction: 'flex', width: '20vw'}}>
                            <p className='bolder'>{key}</p>
                            <p>{value}</p>
                        </div>
                    ))}

                </Grid>
            </Grid>
        </Grid>

        </>
    );
};

export default StockSummary;