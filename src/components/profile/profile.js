import React, {Component} from 'react';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import './profile.scss';

export default class Profile extends Component {
  render() {
    return (
      <Grid container>
        <Grid item sm={12} md={12} lg={12} xs={12} xl={12}>
          <Typography className="pageTitle titleSection" variant="title" gutterBottom>
            Profile
          </Typography>
        </Grid>
        <Grid container>
            <Grid item sm={4} md={4} lg={4} xs={12} xl={4}>
                <div className="profilePic imgRound">
                    <img src={Config.images + "profilePic.jpg"} />
                </div>
            </Grid>
            <Grid item sm={8} md={8} lg={8} xs={12} xl={8}>Name</Grid>
        </Grid>
      </Grid>
    );
  };
}