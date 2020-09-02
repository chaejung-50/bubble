import React, { useState, useEffect } from 'react';
import {Line} from "react-chartjs-2";

import Grid from '@material-ui/core/Grid';
import StockStatusBar from './StockStatusBar';

require('dotenv').config();

const StockChart = (props) => {
    const ticker = props.searchedTicker;

    const options = {
        responsive: true, 
        maintainAspectRatio: false,
        legend: {
            display: false
        },
        elements: {
            point: {
                radius: 0,
                hitRadius: 10, 
                hoverRadius: 5
            }
        },
        hover: {
            mode: 'index',
            intersect: false
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        autoSkip: true, 
                        maxTicksLimit: 200, 
                        beginAtZero: false
                    }, 
                    gridLines: {
                        display: false, 
                    }
                }
            ], 
            xAxes: [
                {
                    display: false
                }
            ]}
    }

    const IE_API_KEY = process.env.REACT_APP_IEX_API_KEY_SEVEN;
    const alpha_API_KEY = process.env.REACT_APP_ALPHA_API_KEY;

    const API_CALL_INTRADAY = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=1min&apikey=${alpha_API_KEY}`;
    const API_CALL_MONTH = `https://cloud.iexapis.com/beta/stock/${ticker}/batch?token=${IE_API_KEY}&types=chart,quote&range=1m`;
    const API_CALL_YTD = `https://cloud.iexapis.com/beta/stock/${ticker}/batch?token=${IE_API_KEY}&types=chart,quote&range=ytd`;
    const API_CALL_ONEY = `https://cloud.iexapis.com/beta/stock/${ticker}/batch?token=${IE_API_KEY}&types=chart,quote&range=1y`;
    const API_CALL_TWOY = `https://cloud.iexapis.com/beta/stock/${ticker}/batch?token=${IE_API_KEY}&types=chart,quote&range=2y`;

    const tickerValue = useState([]);
    const tickerDate = useState([]);
    //const tickerTime = useState ([])
    const [data, setData] = useState([]);
    const [chartData, setChartData] = useState({});
    //const [lata, setLata] = useState({});

    const [latestPrice, setLatestPrice] = useState(0);
    const [change, setChange] = useState(0);
    const [changePercent, setChangePercent] = useState(0);

    const getChart = (API_CALL) => {
        //e.preventDefault();

        fetch(API_CALL)
        .then(res => res.json())
        .then(data => {
            setData(prob => data)
            for(let i = 0; i < data.chart.length; i++){
                tickerValue.push(data.chart[i].open);
                tickerDate.push(data.chart[i].date);
            }
            setLatestPrice(data.quote.latestPrice);
            setChangePercent(data.quote.changePercent);
            setChange(data.quote.change);
            setChartData({
                labels: tickerDate, 
                datasets: [
                    {
                        fill: false, 
                        data: tickerValue, 
                        background: 'red', 
                        broderWidth: 4,
                    }
                ]
            });
        });
    }

    useEffect(() => {
        getChart(API_CALL_TWOY);
    },[]);


    const [color, setColor] = useState('gray');
    let convertedChangePercentage = changePercent * 100
    
    const colorChange  = (num) => {
        if (num > 0){
            setColor('#638b27')
        }
        else if (num < 0){
            setColor('#CC0000')
        }
    }

    useEffect(() => {
        colorChange(convertedChangePercentage)
    });

    return(
        <>
        <Grid container className='stockChart'>
            <Grid container spacing={2}>
                <Grid item sm={6}>
                    <p>{ticker}</p>
                    <p className='bolder' style={{fontSize: '30px'}}>{latestPrice}</p>
                    <p><span style={{color: color}}>{change}</span><span style={{color: color}}>{convertedChangePercentage + '%'}</span></p>
                </Grid>
                <Grid item sm={6}>
                    <StockStatusBar 
                    searchedTicker={ticker}
                    latestPrice={latestPrice}
                    />
                </Grid>

            </Grid>
            <Grid item sm={12} id='chartResize' style={{height: '30vh'}}> 

                <Line 
                options={options}
                data={chartData}
                />
            </Grid>

            <Grid item sm={12} className='row bolder'>
                <div className='buttonSm' onClick={() => getChart(API_CALL_INTRADAY)}>1D</div>
                <div className='buttonSm' onClick={() => getChart(API_CALL_MONTH)}>1M</div>
                <div className='buttonSm' onClick={() => getChart(API_CALL_YTD)}>YTD</div>
                <div className='buttonSm' onClick={() => getChart(API_CALL_ONEY)}>1Y</div>
                <div className='buttonSm' onClick={() => getChart(API_CALL_TWOY)}>2Y</div>
            </Grid>
        </Grid>
        </>

    )
}

export default StockChart;
