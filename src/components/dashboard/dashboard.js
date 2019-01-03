import React, {Component, Fragment} from 'react';
import {Redirect} from 'react-router-dom';
import {Button, Grid, Menu, MenuItem, Typography} from '@material-ui/core';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import {toastNotify} from '../../actions';
import store from '../../store';
// import {connect, dispatch  } from 'react-redux';
import {getAllUsers} from '../../actions';
import DonutChart from './doNutChart';
import BarGraph from './visitGraph';
// import BarChart from './bc';
// import BarGraph from './barGraph';
import barGraphData from './data';
import CommonService from './../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import {Bar} from 'react-chartjs-2';
import { AutoComplete } from 'material-ui';

const bData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Number of Visits',
      backgroundColor: 'rgba(255,99,132,0.5)',
      borderColor: 'rgba(255,99,132,1)',
      borderWidth: 1,
      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
      hoverBorderColor: 'rgba(255,99,132,1)',
      data: [65, 59, 80, 81, 56, 55, 40]
    }
  ]
};

export default class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      totalCommunities: 0,
      totalEmployees: 0,
      totalVisits: 0,
      graphData: [],
      actualData: {},
      loader: false,
      doRedirect: false,
      redirectUrl: null,
      graphDataSize: 0
    }
  }
  componentWillMount() {
    console.log("Component Will Mount");
    this.getDashboard();
  }
  componentDidMount() {
    console.log("componentDidMount ", this.props);
  }

  getDashboard = () => {
    this.setState({loader: true});
    axios
      .get(axios.getDashboardData())
      .then((response) => {
        this.setState({loader: false});
        toast.success(response.message, {
          position: toast.POSITION.TOP_CENTER
        });
        console.log("Dashboard Response", response, response.chart_data.data.length);
        if(response !== undefined){
          let gd = ""; 
          if(response.chart_data.data.length > 0){
            gd = this.buildGraphData(response.chart_data);
          }
          // response.chart_data["data"] = [];
          console.log("Dashboard Response", response, response.chart_data.data.length);
          this.setState({
            totalCommunities: response.total_communities,
            totalEmployees: response.total_employees,
            totalVisits: response.total_vists,
            graphData: gd,
            actualData: response.chart_data,
            graphDataSize: response.chart_data.data.length
          })
        }
      })
      .catch(error => {
        this.setState({loader: false});
        /* toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        }); */
        console.log("At First Error", error);
      });
  }

  /* buildGraphData = data => {
    const colors = ["#e28699", "#dde269", "#dd6868", "#57a396", "#4d3193", "#d35ea4", "#bf5585", "#e55597", "#39a851", "#6c5e8e"];
    let result = [];
    let count = 0;
    let labels = "index" + "\t" + "label" + "\t" + "frequency" + "\t" + "color";
    result.push(labels);
    for(let i = 0; i<data.data.length; i++){
      count++;
      let row = count + "\t" + data.labels[i] + "\t" + data.data[i] + "\t" + colors[i];
      result.push(row);
    }
// debugger;
    if(result.length < 8){
      for(let i=0; i<8; i++){
        count++;
        result.push(count + "\t" + "" + "\t" + 0 + "\t" + "#fff");
      }
    }
    console.log("Graph dat generated", data, "\n", result.join("\n"));
    return result.join("\n");  
  } */

  buildGraphData = data => {
    /* if(data.data.length < 8){
      for(let i; i<8;i++){
        data.data.push(0);
        data.labels.push(".");
      }
    } */
    if(data.data.length < 4){
      for(let i=0; i<4; i++){
        let item = data.data[i];
        // data.data.push((i+1)*Math.random());
        data.data.push(0);
        let space = [];
        space.push(" ");
        data.labels.push(space.join(""));
      }
    }
    console.log("AT Build Graph", data);
    return {
      labels: data.labels,
      datasets: [
        {
          label: 'Number of Visits',
          backgroundColor: [
            "rgba(226,134,153,0.5)", 
            "rgba(221,226,105,0.5)",
            "rgba(221,104,104,0.5)",
            "rgba(87,163,150,0.5)",
            "rgba(77,49,147,0.5)",
            "rgba(211,94,164,0.5)",
            "rgba(191,85,133,0.5)",
            "rgba(229,85,151,0.5)",
            "rgba(57,168,81,0.5)",
            "rgba(108,94,142,0.5)"
          ],
          borderColor: 'rgba(255,99,132,0.4)',
          borderWidth: 1,
          hoverBackgroundColor: [
            "rgba(226,134,153,1)",
            "rgba(221,226,105,1)",
            "rgba(221,104,104,1)",
            "rgba(87,163,150,1)",
            "rgba(77,49,147,1)",
            "rgba(211,94,164,1)",
            "rgba(191,85,133,1)",
            "rgba(229,85,151,1)",
            "rgba(57,168,81,1)",
            "rgba(108,94,142,1)"
          ],
          hoverBorderColor: 'rgba(255,99,132,1)',
          data: data.data
        }
      ]
    }
  }



  render() {
    const {
      loader,
      doRedirect,
      redirectUrl,
      totalCommunities,
      totalEmployees,
      totalVisits,
      graphData,
      graphDataSize,
      actualData
    } = this.state;
    if (doRedirect) {
      return <Redirect to={redirectUrl}/>;
    }
    return (
      <Fragment>
        <Grid container justify="space-between" >
          <Grid container align="center" className="countSection">
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <DonutChart data={totalEmployees} label={"Total Employees"}/>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <DonutChart data={totalCommunities} label={"Total Communities"}/>
            </Grid>
            <Grid item sm={12} xs={12} md={4} lg={4}>
              <DonutChart data={totalVisits} label={"Total Visits"}/>
            </Grid>
          </Grid>
          <Grid container className="mar-large-top">
            <Grid container >
              <Typography variant = "title"
              className = "pageTitle titleSection margin-top-20" >
                Visits By Service Type
              </Typography>
            </Grid>
            <Grid container >
              {/* <BarGraph className="barGraph" {...this.props} graphData={graphData} actualData={actualData} /> */}
              {/* <BarChart data={[5,10,1,3]} size={[500,500]} /> */}
              {
                (graphDataSize === 0) 
                      ? <img style={{width: "100%", height: "100%"}} src="/assets/images/noDataGraph_text.jpg" /> 
                      : <Bar
                            data={graphData}
                            width={500}
                            height={200}
                            options={{
                              maintainAspectRatio: true,
                              legend: {
                                display: false,
                                labels: {
                                  fontColor: 'rgb(255, 99, 132)'
                                }
                              }
                            }}
                          />
                // (actualData.data === []) ? "We have data to show " + (JSON.stringify(actualData.data)) : "no data to show" + (JSON.stringify(actualData.data))
              }
              
            </Grid>
          </Grid>
        </Grid>

        {CommonService.renderLoader(loader)}
        {/* <ToastContainer autoClose={50000} /> */}
      </Fragment>
    );
  };
}