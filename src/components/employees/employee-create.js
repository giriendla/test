import React, {Component, Fragment} from 'react';
import { Redirect } from 'react-router-dom';
import {
  Button,
  Grid,
  Menu,
  MenuList,
  MenuItem,
  FormControl, 
  FormHelperText,
  Select,
  TableHead,
  TableRow,
  TableCell,
  Tooltip,
  TableSortLabel,
  Typography,
  IconButton,
  Popper,
  Grow,
  Paper,
  ClickAwayListener,
  Radio,
  RadioGroup,
  TextField,
  Input,
  InputLabel
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import Config from '../../container/config';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from './list';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import { matchPath } from 'react-router-dom';
import './employee.scss';

const ITEM_HEIGHT = 48;

export default class EmployeeCreate extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      employee: {},
      serviceTypes: [],
      employeeData: {
        "phone_mobile": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "service_label": ""
      },
      employeeError: {},
      doRedirect: false,
      redirectUrl: null
    }
    this.getEmpoyeesList = this.getEmpoyeesList.bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("All Props", this.props);    
    this.getEmpoyeesList();
  }


  handleFormChange = name => event => {
    //   debugger;
    let state = this.state;
    state.employeeData[name] = event.target.value;
    state.employeeError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
    this.setState(state);
  }
  handleRadioChange = event => {
    // debugger;      
    var state = this.state;
    state.employeeData.service_label = event.target.value;
    if(state.employeeData.service_label !== ""){
      state.employeeError.service_label = "";
    }else{
      state.employeeError.service_label = null;
    }
    this.setState(state);
  }
  cancelCreate = event => {
    this.setState({
      doRedirect: true,
      redirectUrl: "/employees"
    })
  }


  getEmpoyeesList() {
    let that = this;
    /* this.setState({
        serviceTypes: CommonService.localStore.get("service_label")
    });  */
    // this.setState({loader: true});
    axios
      .get(axios.getEmployees())
      .then((response) => {
        // this.setState({loader: false});
        /* toast.success("Employees List! Successfully...", {
          position: toast.POSITION.TOP_CENTER
        }); */
        // debugger;
        console.log("Employee Response", response);
        let employees = response.employees;
        let services = JSON.parse(response.service_labels);
        this.setState({
            serviceTypes: services
        });        
      })
      .catch(function (error) {
        // that.setState({loader: false});
        /* toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_CENTER
        }); */
        console.log("At First Error", error);
      });
  }
  submitEmployeeForm = () => {
    // debugger;
    
    console.log("Employee Creation Submitted", this.state.employeeData);
    let that = this;
    debugger;
    // "phone_mobile": "",
    //     "first_name": "",
    //     "last_name": "",
    //     "email": "",
    //     "service_label": ""
    let employeeError = this.state.employeeError;
    let employeeData = this.state.employeeData;
    if(employeeData.first_name.trim() === ""){
      employeeError.first_name = null;
      this.setState({employeeError})
    }else{
      employeeError.first_name = "";
      this.setState({employeeError})
    }

    if (employeeData.last_name.trim() === ""){
      employeeError.last_name = null;
      this.setState({employeeError})
    }else{
      employeeError.last_name = "";
      this.setState({employeeError})
    }
    if (employeeData.phone_mobile.trim() === ""){
      employeeError.phone_mobile = null;
      this.setState({employeeError})
    }else{
      employeeError.phone_mobile = "";
      this.setState({employeeError})
    }
    if (employeeData.service_label.trim() === ""){
      employeeError.service_label = null;
      this.setState({employeeError})
    }else{
      employeeError.service_label = "";
      this.setState({employeeError})
    }
    if (employeeData.email.trim() === ""){
      employeeError.email = null;
      this.setState({employeeError})
    }else{
      employeeError.email = "";
      this.setState({employeeError})
    }

    if(employeeData.first_name.trim() !== "" 
      && employeeData.last_name.trim() !== "" 
      && employeeData.phone_mobile.trim() !== ""
      && employeeData.email.trim() !== ""
      && employeeData.service_label.trim() !== ""){
          this.setState({loader: true});
          axios
            .post(axios.createEmployee(), this.state.employeeData)
            .then((response) => {

              this.setState({loader: false,
                employeeData: {
                    "phone_mobile": "",
                    "first_name": "",
                    "last_name": "",
                    "email": "",
                    "service_label": ""
                  }});
                toast.success(response.message, {
                position: toast.POSITION.TOP_CENTER
                });
                console.log("Employee Create Response", response);
                    this.setState({
                        doRedirect: true,
                        redirectUrl: '/employees'
                    });              
            })
            .catch(function (error) {
              that.setState({loader: false});
              toast.error(error.response.data.message, {
                position: toast.POSITION.TOP_CENTER
              });
              console.log("At First Error", error);
            });                       
        }else{
          return false;
        }
  }
            

  render() {
    const {loader, employee, employeeData, employeeError, serviceTypes, redirectUrl, doRedirect} = this.state;
    if (doRedirect) {
      return <Redirect to={redirectUrl}/>;
    }
    return (
      <Grid container>
        <Grid container className="header" justify="space-between" >
            <Grid item>
                <Typography className="pageTitle titleSection" variant="title" gutterBottom align="left">
                    Employee Create
                </Typography>
            </Grid>
        </Grid>
        <Grid container spacing={32}>
        {/* "phone_mobile": "",
        "first_name": "",
        "last_name": "",
        "email": "",
        "service_label": "" */}
            <Grid item xs={12} sm={6}>
                <TextField
                    label="First Name"
                    value={employeeData.first_name}
                    onChange={this.handleFormChange('first_name')}
                    placeholder="First Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={(employeeError.first_name !== null) ? "" : "First Name field required."}
                    error={(employeeError.first_name !== null)
                    ? false
                    : true}/>
            </Grid>
            <Grid item xs={12} sm={6}>
                <TextField
                    label="Last Name"
                    value={employeeData.last_name}
                    onChange={this.handleFormChange('last_name')}
                    placeholder="Last Name"
                    type="text"
                    fullWidth
                    margin="normal"
                    helperText={(employeeError.last_name !== null) ? "" : "Last Name field required."}
                    error={(employeeError.last_name !== null)
                    ? false
                    : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                label="Phone"
                defaultValue = {undefined}
                value={employeeData.phone_mobile}
                onChange={this.handleFormChange('phone_mobile')}
                margin="normal"
                onInput = {(e) =>{
                  e.target.value = e.target.value.replace(/[^\d]/g, " ");
                  e.target.value = Math.max(0, parseInt(e.target.value) ).toString().slice(0,10);
                  e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                }}
                fullWidth
                helperText={(employeeError.phone_mobile !== null) ? "" : "Phone field is requied"}
                error={(employeeError.phone_mobile !== null) ? false : true}/>
            </Grid>
            <Grid item xs={12} sm={6} md={6} lg={6}>
              <TextField
                id="email"
                label="Email"
                value={employeeData.email}
                onChange={this.handleFormChange('email')}
                margin="normal"
                fullWidth
                helperText={(employeeError.email !== null) ? "" : "Email field is required"}
                error={(employeeError.email !== null) ? false : true}/>
            </Grid>
            <Grid item  xs={12} sm={6} md={6} lg={6} className="serviceTypeContainer1 margin-top-20">
              <FormControl xs={12} style={{'width': "100%"}}>
                <InputLabel 
                      htmlFor="service type" 
                      style={{'color': (employeeError.service_label === null) ? '#f44336': 'currentColor'}}>
                      Service Type
                </InputLabel>
                <Select
                  name="serviceType"
                  className="serviceType"
                  value={employeeData.service_label}
                  onChange={this.handleRadioChange}
                  input={<Input id="serviceType" />}>
                  <MenuItem value="">
                    <em>-Service Type-</em>
                  </MenuItem>
                  {serviceTypes.map((n, i) => {
                        if(n !== null){
                          return (
                            <MenuItem value={n} key={i}>
                              {CommonService.toTitleCase(n)}
                            </MenuItem>                            
                          )}
                    })}
                </Select>
                {(employeeError.service_label === null) 
                    ? <FormHelperText style={{'color': '#f44336'}}>Service type is required!</FormHelperText>
                    : ""}
              </FormControl>
            </Grid>
        </Grid>
        
        <Grid container>
          <Grid container spacing={16} justify="left" className="margin-top-20">
              <Grid item>
                  <Button
                      onClick={this.cancelCreate}
                      className="btn btn-secondary">
                      Cancel
                  </Button>
                </Grid>
                <Grid item>
                  <Button
                      type="submit"
                      onClick={this.submitEmployeeForm}
                      variant="contained"
                      color="primary"
                      className="btn btn-primary">
                      Create
                  </Button>
              </Grid>
          </Grid>
        </Grid>
        {CommonService.renderLoader(loader)}
        <ToastContainer autoClose={5000} />
      </Grid>
    );
  };
}