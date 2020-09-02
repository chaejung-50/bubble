import React from 'react';
import Grid from '@material-ui/core/Grid';
import StockChart from '../components/StockChart';
import StockSummary from '../components/StockSummary';
import Navbar from '../components/Navbar';
import StatusBar from '../components/StatusBar';

const StockInfoPage = (props) => {
    const passedTicker = props.location.state.key;
    const passedName = props.location.state.name;
    
    return(
        <div style={{ width: '95vw', height: '100vh'}}>
            <Grid container spacing={4}>
                <Navbar/>

                <Grid container spacing={4}>
                    <StatusBar />
                </Grid>

                <Grid item sm={12}>
                    <StockChart 
                    searchedTicker={passedTicker} 
                    searchedName={passedName}
                    />
                </Grid>

                <Grid item sm={12}>
                    <StockSummary 
                    searchedTicker={passedTicker} 
                    />
                </Grid>

            </Grid>
        </div>
    );
};

export default StockInfoPage;