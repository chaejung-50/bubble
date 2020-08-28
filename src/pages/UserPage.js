import React from 'react';

import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';

import app from '../helpers/useFirebase';

import SearchBar from '../components/SearchBar';
import Card from '../components/Card';

import Portfolio from '../components/Portfolio';
import News from '../components/News';
import Highlights from '../components/Highlights';
import Watchlist from '../components/Watchlist';
import HighlightsItem from '../components/HighlightsItem';


const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }, 
    icon: {
        fontSize: "large",
        color: "disabled", 
        cursor: "pointer",
    }

}));

const UserPage = () => {
    const classes = useStyles();

    const signOut = () => app.auth().signOut();

    return(
        <div style={{ width: '95vw', height: '100vh'}}>
            <Grid container spacing={4}>
                <Grid item sm={1}>
                    Logo
                </Grid>
                <Grid item sm={10}>
                    <SearchBar />
                </Grid>
                <Grid item sm={1}>
                    <ExitToAppIcon 
                        fontSize="large"
                        color="disabled"
                        cursor="pointer"
                        onClick={signOut}
                    />
                </Grid>

                <Grid container spacing={4}>
                    <Grid item sm={2}>
                        Market is closed
                    </Grid>
                </Grid>

                <Grid item sm={8}>
                    Portfolio
                    <AddCircleIcon />
                    <Grid container spacing={4}>
                        <Grid item sm={12} style={{ height: '40vh'}}>
                        <div className="scrollingPaper">
                            <Portfolio />
                        </div>
                        </Grid>
                        {/* <Grid item sm={12} style={{ height: '40vh'}}>
                            Highlights
                            <Highlights />

                        </Grid> */}
                        <Grid container spacing={4} direction="row">
                            <Grid item sm={6}>
                                Highlights
                                <Highlights />
                            </Grid>
                            <Grid item sm={6}>
                                Watchlist
                                <HighlightsItem />

                            </Grid>

                        </Grid>

                    </Grid>

                </Grid>

                <Grid item sm={3} style={{ marginLeft: '5vw'}}>
                    News
                    <News />
                </Grid>

            </Grid>
        </div>
    );
};

export default UserPage;