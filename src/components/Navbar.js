import React from 'react';
import { useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import app from '../helpers/useFirebase';
import SearchBar from '../components/SearchBar';

const Navbar = () => {
    let history = useHistory();

    const toHome = () => {
        try{
            history.push('/userPage');
        }
        catch(err){
            console.log(err);
        }
    }

    const signOut = () => app.auth().signOut();

    return(
        <>
                <Grid item sm={3} onClick={toHome} className="logo">
                    BUBBLE
                </Grid>
                <Grid item sm={7} >
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
        </>
    );
};

export default Navbar;
