import React, { Component, Fragment } from 'react';
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
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import Config from '../../container/config';
import { callUsers } from '../../actions';
import store from '../../store';
import { getAllUsers } from '../../actions';
import ListCompanyComponent from './listCompany';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import { matchPath } from 'react-router-dom';
import './company.scss';

const ITEM_HEIGHT = 48;

export default class CompanyCreate extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loader: false,
            employee: {},
            serviceTypes: [],
            emailPattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
            companyData: {
                "phone_mobile": "",
                "company_name": "",
                "company_address": "",
                "company_city": "",
                "company_state": "",
                "company_zip": "",
                "company_contact_mail": "",
                "contact_name": "",
                "service_label": ""
            },
            companyError: {},
            doRedirect: false,
            redirectUrl: null,
            us_states: []
        }
    }
    componentWillMount() {
        this.getStates();
        this.getServiceTypes();
    }
    componentDidMount() {
        console.log("All Props", this.props);
    }

    getStates = () => {
        axios
        .get(axios.getStateData())
        .then((response) => {
            console.log("States Response", response);
            this.setState({us_states : response.us_states});
            // let employees = response.employees;
            // let services = JSON.parse(response.service_labels);
            // this.setState({
            //     serviceTypes: services
            // });
        })
        .catch(function (error) {
            // that.setState({loader: false});
            /* toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER
            }); */
            console.log("At First Error", error);
        });
    }
    getServiceTypes = () => {
        axios
        .get(axios.getServiceTypes())
        .then((response) => {
            
            console.log("States Response ServiceTypes", response);
            response.service_labels = (typeof response.service_labels === "string" ? JSON.parse(response.service_labels) : response.service_labels);
            this.setState({serviceTypes : response.service_labels});
            // let employees = response.employees;
            // let services = JSON.parse(response.service_labels);
            // this.setState({
            //     serviceTypes: services
            // });
        })
        .catch(function (error) {
            // that.setState({loader: false});
            /* toast.error(error.response.data.message, {
              position: toast.POSITION.TOP_CENTER
            }); */
            console.log("At First Error", error);
        });
    }

    emailValidation = (data, key) => {
        let {companyData, companyError, emailPattern} = this.state;        
    // debugger;
        if(data === ""){
            companyError[key] = null;
            companyError[key+"_Message"] = "Email is required";
            this.setState({companyError});
          }else{
            if(emailPattern.test(data)){
                companyError[key] = "";
                companyError[key+"_Message"] = "";                
            }else{
                companyError[key] = null;
                companyError[key+"_Message"] = "Invalid Email";
            }
            this.setState({companyError});
          }
      }
    


    handleFormChange = name => event => {
        //   debugger;
        let state = this.state;
        if(name === "company_contact_mail"){
            this.emailValidation(event.target.value, name);
        state.companyData[name] = event.target.value;
            // state.companyError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
        }else{
            state.companyData[name] = event.target.value;
        state.companyError[name] = (event.target.value !== null && event.target.value !== '') ? '' : null;
        }
        this.setState(state);
    }
    handleRadioChange = event => {
        // debugger;      
        var state = this.state;
        state.companyData.service_label = event.target.value;
        if (state.companyData.service_label !== "") {
            state.companyError.service_label = "";
        } else {
            state.companyError.service_label = null;
        }
        this.setState(state);
    }
    cancelCreate = event => {
        this.setState({
            doRedirect: true,
            redirectUrl: "/company"
        })
    }


    getCompaniesList() {
        axios
            .get(axios.getCompanies())
            .then((response) => {
                console.log("Employee Response", response);
                let services = JSON.parse(response.service_labels);
                this.setState({
                    serviceTypes: services
                });
            })
            .catch((error) => {
                // that.setState({loader: false});
                /* toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER
                }); */
                console.log("At First Error", error);
            });
    }
    submitEmployeeForm = () => {
        // debugger;
        console.log("Employee Creation Submitted", this.state.companyData);

        let { companyError, companyData} = this.state;


        if (companyData.company_name === "") {
            companyError.company_name = null;
            this.setState({ companyError })
        } else {
            companyError.company_name = "";
            this.setState({ companyError })
        }

        if (this.state.companyData.company_address === "") {
            companyError.company_address = null;
            this.setState({ companyError })
        } else {
            companyError.company_address = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.company_city === "") {
            companyError.company_city = null;
            this.setState({ companyError })
        } else {
            companyError.company_city = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.company_state === "") {
            companyError.company_state = null;
            this.setState({ companyError })
        } else {
            companyError.company_state = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.company_zip === "") {
            companyError.company_zip = null;
            this.setState({ companyError })
        } else {
            companyError.company_zip = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.phone_mobile === "") {
            companyError.phone_mobile = null;
            this.setState({ companyError })
        } else {
            companyError.phone_mobile = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.contact_name === "") {
            companyError.contact_name = null;
            this.setState({ companyError })
        } else {
            companyError.contact_name = "";
            this.setState({ companyError })
        }
        if (this.state.companyData.service_label === "") {
            companyError.service_label = null;
            this.setState({ companyError })
        } else {
            companyError.service_label = "";
            this.setState({ companyError })
        }
        if (companyData.company_contact_mail === "" || companyError.company_contact_mail_Message !== "") {
            companyError.company_contact_mail = null;
            this.setState({ companyError })
        } else {
            companyError.company_contact_mail = "";
            this.setState({ companyError })
        }

        if (companyData.company_name !== ""
            && companyData.company_address !== ""
            && companyData.company_city !== ""
            && companyData.company_state !== ""
            && companyData.company_zip !== ""
            && companyData.phone_mobile !== ""
            && companyData.contact_name !== ""
            && companyError.company_contact_mail !== null
            && companyData.service_label !== ""
        ) {
            this.setState({ loader: true });
            axios
                .post(axios.createCompany(), this.state.companyData)
                .then((response) => {
                    this.setState({
                        loader: false,
                        companyData: {
                            "phone_mobile": "",
                            "company_name": "",
                            "company_address": "",
                            "company_city": "",
                            "company_contact_mail": "",
                            "service_label": ""
                        }
                    });
                    toast.success(response.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    this.setState({
                        doRedirect: true,
                        redirectUrl: "/company"
                    });
                    console.log("Company Create Response", response);
                })
                .catch((error) => {
                    this.setState({ loader: false });
                    toast.error(error.response.data.message, {
                        position: toast.POSITION.TOP_CENTER
                    });
                    console.log("At First Error", error);
                });
        } else {
            return false;
        }
    }


    render() {
        const { loader, employee, companyData, companyError, serviceTypes, redirectUrl, doRedirect, emailPattern } = this.state;
        if (doRedirect) {
            return <Redirect to={redirectUrl} />;
        }
        return (
            <Grid container>
                <Grid container className="header" justify="space-between" >
                    <Grid item>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom align="left">
                            Company Create
                </Typography>
                    </Grid>
                </Grid>
                <Grid container spacing={32}>
                    <Grid item xs={12} sm={12}>
                        <TextField
                            label="Company Name"
                            value={companyData.company_name}
                            onChange={this.handleFormChange('company_name')}
                            placeholder="First Name"
                            type="text"
                            fullWidth
                            margin="normal"
                            helperText={(companyError.company_name !== null) ? "" : "First Name field required."}
                            error={(companyError.company_name !== null)
                                ? false
                                : true} />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            id="company_address"
                            label="Address"
                            margin="normal"
                            value={companyData.company_address}
                            onChange={this.handleFormChange('company_address')}
                            fullWidth
                            helperText={(companyError.company_address !== null) ? '' : 'Address field required'}
                            error={(companyError.company_address !== null) ? false : true} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            // id="company_contact_mail"
                            label="City"
                            defaultValue={undefined}
                            value={companyData.company_city}
                            onChange={this.handleFormChange('company_city')}
                            margin="normal"
                            fullWidth
                            helperText={(companyError.company_city !== null) ? "" : "City field is requied"}
                            error={(companyError.company_city !== null) ? false : true} />
                    </Grid>


                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <FormControl xs={12} style={{ 'width': "100%" }} className="inputSelect">
                            <InputLabel
                                htmlFor="state"
                                style={{ 'color': (companyError.company_state === null) ? '#f44336' : '#00000088' }}>
                                State
                            </InputLabel>
                            <Select
                                name="company_state"
                                className="company_state"
                                value={companyData.company_state}
                                onChange={this.handleFormChange('company_state')}
                                input={<Input id="company_state" />}>
                                <MenuItem value="">
                                    <em>-State-</em>
                                </MenuItem>
                                {this.state.us_states.map((n, i) => {
                                    if (n !== null) {
                                        return (
                                            <MenuItem value={n.sugar_id} key={i}>
                                                {CommonService.toTitleCase(n.name)}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                            {(companyError.company_state === null)
                                ? <FormHelperText style={{ 'color': '#f44336' }}>State is required!</FormHelperText>
                                : ""}
                        </FormControl>
                    </Grid>


                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            id="company_zip"
                            label="Zip"
                            value={companyData.company_zip}
                            onChange={this.handleFormChange('company_zip')}
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^\d]/g, "");
                                e.target.value = (e.target.value == "NaN") ? null : e.target.value;
                            }}
                            margin="normal"
                            fullWidth
                            helperText={(companyError.company_zip !== null) ? "" : 'Zip field required'}
                            error={(companyError.company_zip !== null) ? false : true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            label="Contact Name"
                            value={companyData.contact_name}
                            onChange={this.handleFormChange('contact_name')}
                            placeholder="First Name"
                            type="text"
                            fullWidth
                            margin="normal"
                            helperText={(companyError.contact_name !== null) ? "" : "Contact Name field required."}
                            error={(companyError.contact_name !== null)
                                ? false
                                : true} />
                    </Grid>

                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            id="company_contact_mail"
                            label="Contact Email"
                            value={companyData.company_contact_mail}
                            onChange={this.handleFormChange('company_contact_mail')}
                            margin="normal"
                            fullWidth
                            helperText={companyError.company_contact_mail_Message}
                            error={(companyError.company_contact_mail !== null) ? false : true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6}>
                        <TextField
                            label="Contact Phone"
                            defaultValue={undefined}
                            value={companyData.phone_mobile}
                            onChange={this.handleFormChange('phone_mobile')}
                            margin="normal"
                            onInput={(e) => {
                                e.target.value = e.target.value.replace(/[^\d]/g, " ");
                                e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 10);
                                e.target.value = (e.target.value == "NaN") ? "" : e.target.value;
                            }}
                            fullWidth
                            helperText={(companyError.phone_mobile !== null) ? "" : "Contact Phone field is requied"}
                            error={(companyError.phone_mobile !== null) ? false : true} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={6} lg={6} className="serviceTypeContainer1 margin-top-20">
                    <FormControl xs={12} style={{ 'width': "100%" }}>
                            <InputLabel
                                htmlFor="service type"
                                style={{ 'color': (companyError.service_label === null) ? '#f44336' : 'currentColor' }}>
                                Service Type
                            </InputLabel>
                            <Select
                                name="serviceType"
                                className="serviceType"
                                value={companyData.service_label}
                                onChange={this.handleRadioChange}
                                input={<Input id="serviceType" />}>
                                <MenuItem value="">
                                    <em>-Service Type-</em>
                                </MenuItem>
                                {serviceTypes.map((n, i) => {
                                    if (n !== null) {
                                        return (
                                            <MenuItem value={n} key={i}>
                                                {CommonService.toTitleCase(n)}
                                            </MenuItem>
                                        )
                                    }
                                })}
                            </Select>
                            {(companyError.service_label === null)
                                ? <FormHelperText style={{ 'color': '#f44336' }}>Service type is required!</FormHelperText>
                                : ""}
                        </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={32} className="margin-top-20 text-right">
                    <Grid item xs={12} sm={12}>
                        <Button
                            onClick={this.cancelCreate}
                            className="btn btn-secondary">
                            Cancel
                        </Button>
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
                {CommonService.renderLoader(loader)}
                <ToastContainer autoClose={5000} />
            </Grid>
        );
    };
}