import React, { Component } from 'react';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from './navigation';
import Config from '../../container/config';




export default class Appheader extends Component {
    constructor(props){
        super(props);

    }
    state = {
        anchorEl: null,
      };

      handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
      };
    
      handleClose = () => {
        this.setState({ anchorEl: null });
      };

      checkProfile () {
        const { anchorEl } = this.state;
        let showProfile;
        if(this.props != undefined && this.props.showProfile !== undefined){
            showProfile = <div></div>
        }else {
            showProfile = <div className="profileSection">
                        <Button
                            aria-owns={anchorEl ? 'simple-menu' : null}
                            aria-haspopup="true" onClick={this.handleClick} >
                            <img src={Config.images + "icons/green/user.png"} width="36"/>
                        </Button>
                        <Menu id="simple-menu" anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={this.handleClose} >
                            <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                        </Menu>
                    </div>
        }
        return showProfile;
      }
    render() {        
        return (
            <Grid container className="headerContainer">
                <Grid className="headerLeftSection" item lg={2} md={2} sm={3} xs={12}>
                    <a href="/" >
                        <img src={Config.images + "logo.png"}/>
                    </a>
                </Grid>
                <Grid className="headerRightSection" item lg={10} md={10} sm={9} xs={12}>
                    {this.checkProfile()}                    
                </Grid>
            </Grid>
        );
    };
}