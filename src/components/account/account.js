import React, { Component } from 'react';
import { TextField, Button, Typography, Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';

import "./account.scss";

export default class Account extends Component {
    render() {        
        return (
            <Grid container className="accountBlock" >
                <Grid container className="header" justify="space-between" >
                    {/* <Grid item xs={12} sm={6} md={6} > */}
                    <Grid>
                        <Typography className="Heading" variant="title" gutterBottom align="center">
                            Account
                        </Typography>
                    </Grid>
                    <Grid className="text-right" >
                        <Button variant="outlined" className="outlinedButton" >
                            Edit
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
        );
    };
}