import React from 'react';

import { makeStyles } from '@material-ui/core';
import { InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

const useStyles = makeStyles((theme) => ({
    form: {
        width: '50%', 
    }, 
    input: {
        color: 'white',
        border: '0.5px solid white',
        height: 50,
    },
    elementColor: {
        color: 'white',
    },
}));


const SearchBar = () =>{
    
    const classes = useStyles();

    return(
            <TextField
            variant="outlined"
            required
            width="50%"
            name="username"
            id="username"
            // value={username}
            label="Search"
            InputProps={{
                endAdornment: (
                    <InputAdornment position="start">
                        <AccountCircle />
                    </InputAdornment>
                ),
                className: classes.input,
            }}
            />

    );
}

export default SearchBar;