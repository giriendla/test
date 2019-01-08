import React, { Component, Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Grid,
    TableHead,
    TableRow,
    TableCell,
    TextField,
    Tooltip,
    TableSortLabel,
    IconButton,
    Modal,
    Slide,
    FormGroup,
    FormControl,
    FormLabel,
    FormControlLabel,
    FormHelperText,
    Typography,
    Hidden,
    Select,
    Menu,
    MenuList,
    MenuItem,
    ClickAwayListener,
    Input,
    InputLabel
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import Done from '@material-ui/icons/Done';
import Info from '@material-ui/icons/Info';
import Clear from '@material-ui/icons/Clear';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import { callUsers } from '../../actions';
import store from '../../store';
import { getAllUsers } from '../../actions';
import ListCompanyComponent from './listCompany';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import CommonService from '../../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import ModalDialog from '../_/modal';


const ITEM_HEIGHT = 48;
function Transition(props) {
    return <Slide direction="up" {...props} />;
}

export default class Company extends Component {
    constructor(props) {
        super(props);

        this.state = {
            companies: [],
            companiesFilterArr: [],
            anchorEl: null,
            loader: false,
            fitlerOpen: false,
            filter: {
                search: "",
                showNoData: false
            },
            doRedirect: false,
            redirectUrl: null,
            modalOpen: false,
            modalValue: false,
            modalData: {
                title: null,
                body: "",
            }
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.getCompaniesList = this.getCompaniesList.bind(this);
        this.handleToggle = this.handleToggle.bind(this);
        this.handleModalClose = this.handleModalClose.bind(this);
    }
    componentWillMount() { }
    componentDidMount() {
        console.log("All Props", this.props);
        this.getCompaniesList();
    }

    addProfilePic(data) {
        // console.log("Add Profile", data);
        for (let i = 0; i < data.length; i++) {
            let item = data[i];
            let id = i % 10;
            item.image = Config.images + "profiles/" + (id + 1) + ".jpeg";
        }
        console.log("Data", data);
        return data;
    }

    getCompaniesList() {
        let that = this;
        axios
            .get(axios.getCompanies())
            .then((response) => {
                // this.setState({loader: false});
                /* toast.success("Employees List! Successfully...", {
                  position: toast.POSITION.TOP_CENTER
                }); */
                // debugger;
                let company = (response.child_companies.length > 0) ? response.child_companies : [];
                // company = response.child_companies;
                company.unshift(response.parent_company);
                this.setState({
                    companies: company,
                    companiesFilterArr: company
                });
                console.log("Company list Response", response, this.state.companies);

            })
            .catch(function (error) {
                // that.setState({loader: false});
                /* toast.error(error.response.data.message, {
                  position: toast.POSITION.TOP_CENTER
                }); */
                console.log("At First Error", error);
            });        
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleToggle = () => {
        this.setState(state => ({
            fitlerOpen: !state.fitlerOpen
        }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) { return; }
        this.setState({ open: false });
    };
    toggleFilter = () => {
        let state = this.state;
        state.fitlerOpen = !state.fitlerOpen
        if (state.fitlerOpen == false) {
            state.filter.search = "";
        }
        this.setState(state);
    }

    renderFilter = () => {
        if (this.state.fitlerOpen) {
            return (
                <Fragment>
                    Rendering Filter
        </Fragment>
            )
        }
    }
    updateFilterField = (event, field) => {
        // console.log("Updating Field", field, event);

        let state = this.state;
        state.filter[field] = event.target.value;
        this.setState(state)
    }
    doSearch = event => {
        event.preventDefault();
        event.stopPropagation()
        let searchKey = this.state.filter.search;
        let obj = this.state.companies;
        let arr = {};
        let finalObj = [];
        if (searchKey !== "") {
            for (var i = 0; i < obj.length; i++) {
                var row = obj[i];
                for (var key in row) {
                    var item = row[key];
                    // console.log("key", key, item);
                    if (typeof item == "string") {
                        item = item.toLowerCase();
                        searchKey = searchKey.toLowerCase();
                        if (item.indexOf(searchKey) > -1) {
                            arr[i] = i;
                            // console.log("\n\ni am string\n", i, key, item, "\nArr : ", arr);
                        }
                    }
                }
            }
            for (var key in arr) {
                finalObj.push(obj[key]);
            }
            this.setState({ companiesFilterArr: finalObj });
        } else {
            this.setState({ companiesFilterArr: this.state.companies });
        }
    }

    showListMessage = (data) => {
        if (data != undefined && data.length == 0) {
            return (
                <div>
                    <h3>No Records to show</h3>
                </div>
            )
        }
    }
    createCompany = () => {
        this.setState({
            doRedirect: true,
            redirectUrl: '/company/create/'
        });
    }
    handleModalClose = event => {
        this.setState({
            modalOpen: false,
            modalValue: false,
            modalData: { body: "" },
            dispute: { id: "", reason: "" },
            disputeData: {}
        });
    }
    handleModalOk = event => {
        event.preventDefault();
        let state = this.state;
        state['modalOpen'] = false;
        state['modalValue'] = true;
        this.setState(state);
    }
    editRow = (data) => {
       console.log("At Edit Row in Companies", data);
    }

    render() {
        const {
            anchorEl,
            loader,
            showNoData,
            doRedirect,
            redirectUrl,
            modalOpen,
            modalValue,
            modalData,
            companies,
            companiesFilterArr } = this.state;
        const open = Boolean(anchorEl);

        if (doRedirect) {
            return <Redirect to={redirectUrl} />;
        }



        return (
            <Grid container>
                <Grid container>
                    <Grid item xs={4} sm={4}>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                                Companies
                        </Typography>
                    </Grid>
                    <Grid item xs={8} sm={8} align="right">
                        <Button className="btn btn-primary btn-round"
                            onClick={this.createCompany}>Create</Button>
                        <Button buttonRef={node => { this.anchorEl = node; }}
                            aria-owns={open ? 'menu-list-grow' : null}
                            aria-haspopup="true"
                            onClick={(event) => {
                                this.handleClose(event);
                                this.handleToggle();
                                this.toggleFilter();
                            }}>
                            <FilterListIcon />
                        </Button>
                    </Grid>
                    <Grid item sm={12} className={(this.state.fitlerOpen)
                        ? "filterContainer active"
                        : "filterContainer inactive"}>
                        <Grid item className="filterContent">
                            {/* <div className="filterHeading">
                                <b>Filter</b>
                            </div> */}
                            <div className="filterFields">
                                <form className="commentForm" onSubmit={this.doSearch}>
                                    <div className="filterItem">
                                        <label>Search</label>
                                        <input
                                            type="text"
                                            placeholder="Search"
                                            value={this.state.filter.search}
                                            onChange={event => {
                                                this.updateFilterField(event, 'search');
                                            }} />
                                    </div>
                                    <span className="submitFilterInline">
                                        <button type="submit" className="btn btn-primary">Search</button>
                                    </span>
                                </form>
                            </div>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <ListCompanyComponent
                        {...this.props}
                        data={companiesFilterArr}
                        view="company"
                        rowEdit={this.editRow}
                        header={["name", "email", "phone", "service", "status"]} />
                    {
                        (showNoData) ? (<div><h3>No records to show!</h3></div>) : null
                    }
                </Grid>
                {CommonService.renderLoader(loader)}
                {/* <ToastContainer autoClose={5000} /> */}
            </Grid>
        );
    };
}