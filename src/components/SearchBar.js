import React, { useState, useEffect, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core';
import { TextField } from '@material-ui/core';
require('dotenv').config();

const useStyles = makeStyles((theme) => ({
    form: {
        width: '50%', 
        position: 'relative'
    }, 
    input: {
        color: 'gray',
        border: '0.5px solid white',
        height: 50,
    },
    elementColor: {
        color: 'gray',
    },
}));


const SearchBar = () =>{
    
    const classes = useStyles();
    const IE_API_KEY = process.dotenv.REACT_APP_IEX_API_KEY_ONE;
    const API_CALL_ = `https://cloud.iexapis.com/beta/ref-data/symbols?token=${IE_API_KEY}`;
    //for the search bar data to show 
    const [list, setList] = useState([]);

    const [display, setDisplay] = useState(false);
    const [search, setSearch] = useState('');
    const [ticker, setTicker] = useState('')
    const [name, setName] = useState('');
    const wrapperRef = useRef(null);

    const setDex = (poke, pokie) => {
        setSearch(poke);
        setDisplay(false);
        setTicker(pokie);
        handleRedirect(pokie);
    }

    //======== for localstorage
    useEffect(() =>{
        localStorage.setItem('contacts', JSON.stringify(list));
    });

    useEffect(() => {
        const data = localStorage.getItem('contacts');
        if(data){
            console.log(JSON.parse(data));
            setList(JSON.parse(data));
        }
        setSearchBarArray();

        console.log(list);
    },[]);
    //==============


    const setSearchBarArray = () => {
        fetch(API_CALL_)
        .then(res => res.json())
        .then(data => {
            const tempArray = [];
            data.forEach(element => {
                tempArray.push({
                    label: `${element.symbol} (${element.name})`, 
                    value: element.symbol
                });
            });
            setList(tempArray);
        })
        .catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        window.addEventListener("mousedown", handleClickOutside);
        return () => {
          window.removeEventListener("mousedown", handleClickOutside);
        };
    });
    
    const handleClickOutside = event => {
        const { current: wrap } = wrapperRef;
        if (wrap && !wrap.contains(event.target)) {
          setDisplay(false);
        }
    };

    let history = useHistory();
    const handleRedirect = (pokie) => {
        try {
            history.push({
                pathname: '/stockInfo',
                search: `?query=${pokie}`,
                state: {
                    key: pokie,
                    name: name
                }
            });
        }
        catch (err){
            console.log(err);
        }
    }

    return(
        <>
        <form ref={wrapperRef} className={classes.form}>
            <TextField
                variant="outlined"
                width="50%"
                name="search"
                id="search"
                value={search}
                label="Search"
                onChange={(e) => {setSearch(e.target.value); setDisplay(true); setTicker(e.target.value)}}
            />
            {display && (
                <div className="searchBarDropdown">
                    {list.filter(name => {
                        const regex = new RegExp(`^${search}`, 'gi');
                        return name.label.match(regex)
                    })
                    .map((v, i) => {
                        return(
                        <div
                            key={i}
                            onClick={(e) => {setDex(v.label, v.value);}}
                            className="searchBarContent"
                        >
                            <span>{v.label}</span>
                        </div>
                        )
                    })
                    }
                </div>
            )}
        </form>
        </>
    );
}

export default SearchBar;