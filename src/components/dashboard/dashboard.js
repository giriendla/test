import React, {Component, Fragment} from 'react';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import Dummy from '../_/dummyText';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import pieData from './data.json';
import pieDataSeries from './dataSeries.json';
import PieChart from './pieChart';
import DonutChart from './doNutChart';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: []
    }
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("All Props", this.props);
  }

  render() {
    return (
      <Fragment>
        <Grid container justify="stretch">
          <Grid container align="center" className="countSection">
            <Grid item sm={12} xs={12} md={4} lg={4}>
              {/* <PieChart data={pieData} series={pieDataSeries} /> */}
              <DonutChart data={10} label={"Total Employees"}/>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <DonutChart data={5} label={"Total Communities"}/>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <DonutChart data={1200} label={"Total Visits"}/>
            </Grid>
          </Grid>
          <Grid container>
            <Grid item>
              <Typography variant="title">
                Visits By Service Type
              </Typography>
            </Grid>
          </Grid>
        </Grid>

      </Fragment>
    );
  };
}