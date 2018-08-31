import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from './navigation';
import Config from '../../container/config';




export default class Appheader extends Component {
    state = {
        anchorEl: null,
      };

      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };
    render() {
        const { anchorEl } = this.state;
        return (
            <Grid container className="headerContainer">
                <Grid className="headerLeftSection" item lg={2} md={2} sm={3} xs={12}>
                    <a href="/" >
                        <img src={Config.images + "logo.png"}/>
                    </a>
                </Grid>
                <Grid className="headerRightSection" item lg={10} md={10} sm={9} xs={12}>
                    <div className="profileSection">
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true" onClick={this.handleClick} >
                            <img src={Config.images + "icons/green/user.png"} width="36"/>
                        </Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
                </Grid>
            </Grid>
        );
    };
}