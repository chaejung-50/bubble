import React, { useState } from 'react';
import Grid from '@material-ui/core/Grid';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { makeStyles } from '@material-ui/core/styles';
import Portfolio from '../components/Portfolio';
import News from '../components/News';
import Highlights from '../components/Highlights';
import Watchlist from '../components/Watchlist';
import HighlightsItem from '../components/HighlightsItem';
import Navbar from '../components/Navbar';
import StatusBar from '../components/StatusBar';
import PortfolioModal from '../components/PortfolioModal';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    }, 
    icon: {
        fontSize: "large",
        color: "disabled", 
        cursor: "pointer",
    },
}));

const UserPage = () => {
    const classes = useStyles();
    const [modalStatus, setModalStatus] = useState(false);
    const toggleModal = () => {
        setModalStatus(!modalStatus);
    }

    return(
        <div style={{ width: '95vw', height: '100vh'}}>
            <Grid container spacing={4}>
                <Navbar />
                <Grid container spacing={4}>
                    <Grid item sm={6}>
                        <StatusBar />
                    </Grid>
                </Grid>

                <Grid item sm={8}>
                    Portfolio
                    <AddCircleIcon onClick={() => toggleModal()}/>
                    <PortfolioModal modalStatus={modalStatus} toggleModal={toggleModal}/> 
                    <Grid container spacing={4}>
                        <Grid item sm={12} style={{ height: '45vh'}}>
                        <div className="scrollingPaper">
                            <Portfolio />
                        </div>
                        </Grid>
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