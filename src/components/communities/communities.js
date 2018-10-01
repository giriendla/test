import React, { Component } from 'react';
import {
    Button,
    Grid,
    Menu,
    MenuList,
    MenuItem,
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
    ClickAwayListener
} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FilterListIcon from '@material-ui/icons/FilterList';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import { callUsers } from '../../actions';
import store from '../../store';
import { getAllUsers } from '../../actions';
import ListComponent from '../employees/list';

const options = [
    'None',
    'Atria',
    'Callisto',
    'Dione',
    'Ganymede',
    'Hangouts Call',
    'Luna',
    'Oberon',
    'Phobos',
    'Pyxis',
    'Sedna',
    'Titania',
    'Triton',
    'Umbriel'
];

const ITEM_HEIGHT = 48;

export default class Communities extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visitors: [],
            anchorEl: null,
            open: false
        }
        this.handleClick = this
            .handleClick
            .bind(this);
        this.handleClose = this
            .handleClose
            .bind(this);
        this.getCommunitiesList = this
            .getCommunitiesList
            .bind(this);
        this.handleToggle = this
            .handleToggle
            .bind(this);
    }
    componentWillMount() { }
    componentDidMount() {
        console.log("All Props", this.props);
        this.getCommunitiesList();
    }

    getCommunitiesList() {
        axios
            .get(axios.getEmployees())
            .then((response) => {
                // console.log("Employee Response", response);
                this.setState({ visitors: response.data });
                // console.log("At First Response", this.state.visitors);
                store.dispatch(getAllUsers(response.data));
            })
            /* .then(allUsers =>
                  dispatch({
                    type: ALL_USERS,
                    users: allUsers
                  })
                ) */
            .catch(function (error) {
                console.log("At First Error", error);
            });
    }

    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleToggle = () => {
        this.setState(state => ({
            open: !state.open
        }));
    };

    handleClose = event => {
        if (this.anchorEl.contains(event.target)) {
            return;
        }

        this.setState({ open: false });
    };
    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <Grid container>
                <Grid container>
                    <Grid item sm={6}>
                        <Typography className="pageTitle titleSection" variant="title" gutterBottom>
                            Communities Page
                        </Typography>
                    </Grid>
                    <Grid item sm={6} align="right">
                        <Button
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            aria-owns={open
                                ? 'menu-list-grow'
                                : null}
                            aria-haspopup="true"
                            onClick={this.handleToggle}>
                            <FilterListIcon />
                        </Button>
                        <Popper
                            open={this.state.open}
                            anchorEl={this.anchorEl}
                            transition
                            disablePortal
                            style={{
                                zIndex: 9999
                            }}>
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    id="menu-list-grow"
                                    style={{
                                        transformOrigin: placement === 'bottom'
                                            ? 'center top'
                                            : 'center bottom'
                                    }}>
                                    <Paper>
                                        <ClickAwayListener onClickAway={this.handleClose}>
                                            <MenuList>
                                                <MenuItem
                                                    onClick={(event) => {
                                                        this.handleClose(event);
                                                        this.handleToggle();
                                                    }}>Search</MenuItem>
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                </Grid>
                <Grid item sm={12}>
                    <ListComponent
                        {...this.props}
                        data={this.state.visitors}
                        header={["id", "name", "username", "email", "phone"]} />
                </Grid>
            </Grid>
        );
    };
}