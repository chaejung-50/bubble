import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { Button, Container, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { AccountCircle, Visibility, VisibilityOff } from '@material-ui/icons';
import app from '../helpers/useFirebase';
import LoginTitle from './LoginTitle';

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
        color: 'gray',
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

const LoginForm = ({history}) => {
    const [ values, setValues ] = React.useState({
        password: '', 
        showPassword: false,
    });
    const handleChange = (prop) => (e) => {
        setValues({ ...values, [prop]: e.target.value });
    };
    const handleShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    const handleMouseDownPassword = (e) => {
        e.preventDefault();
    };

    const classes = useStyles();

    const [username, setUsername] = useState('');
    const handleLogin = async(e) =>{
        e.preventDefault();
        const { email, password } = {email: username, password: values.password};
        try{
            await app.auth().signInWithEmailAndPassword(email, password);
            history.replace('/userPage');
        } catch(err){
            alert(err);
        }
    };

    return(
        <Container component="main" maxWidth="xs">
            <LoginTitle />
            <form className={classes.form} onSubmit={handleLogin}>
                <TextField
                    onChange={(e) => {setUsername(e.target.value)}}
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="username"
                    id="username"
                    value={username}
                    label="Username"
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="start">
                                <AccountCircle />
                            </InputAdornment>
                        ),
                        className: classes.input,
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    id="password"
                    label="Password"
                    type={values.showPassword ? 'text' : 'password'}
                    value={values.password}
                    onChange={handleChange('password')}
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
                <Button
                    variant="contained"
                    type="submit"
                    fullWidth
                    className={classes.submit}>
                        Sign In
                </Button>
            </form>
        </Container>
    );
};

export default withRouter(LoginForm);


