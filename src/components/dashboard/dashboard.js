import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';

export default class Dashboard extends Component {
    render() {        
        return (
            <Grid container>
                Dashboard Page
            </Grid>
        );
    };
}