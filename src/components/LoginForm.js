import React from 'react';

import { makeStyles } from '@material-ui/core';
import { Button, Container, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';


// style props
const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex', 
        flexDirection: 'column', 
        align: 'center',
        color: 'white',
    }, 
    form: {
        width: '100%', 
        marginTop: theme.spacing(5),
    }, 
    input: {
        color: 'white',
        border: '0.5px solid white',
    },
    elementColor: {
        color: 'white',
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)', 
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        color: 'white',
        padding: '0, 50px',
        height: 48,
    }
}));



export default function LoginForm(){

    const [ values, setValues ] = React.useState({
        password: '', 
        showPassword: false,
    });
    
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    
    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    }
    
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    }


    const classes = useStyles();

    return(

            <Container component="main" maxWidth="xs">
                {/* <CssBaseline /> */}
                <div className={classes.paper}>
                    <form className={classes.form}>
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Username"
                            InputLabelProps={{
                                className: classes.elementColor,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                                className: classes.input,
                                //make sure to figure out how to inherit this to lessen code
                            }}
                        />

                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="password"
                            label="Password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            InputLabelProps={{
                                className: classes.elementColor,
                            }}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton
                                        onClick={handleShowPassword}
                                        onMouseDown={handleMouseDownPassword}>
                                            {values.showPassword ? <Visibility className={classes.elementColor} /> : <VisibilityOff className={classes.elementColor} /> }
                                        </IconButton>
                                    </InputAdornment>
                                ),
                                className: classes.input,
                            }}
                        />
                        
                    </form>

                    <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    className={classes.submit}>
                        Sign In
                    </Button>
                </div>


            </Container>



    );
}




