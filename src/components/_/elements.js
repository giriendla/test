import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from '@material-ui/core';

const Footer = () => {
    return (
        <Grid container className="footerContainer">
            <Grid item lg={12} md={12} sm={12} xs={12}>
                Copyrights 2018, Accushield,
            </Grid>
        </Grid>
    )
}

export {Footer}