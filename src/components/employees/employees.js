import React, {Component} from 'react';
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
import {Scrollbars} from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import Dummy from '../_/dummyText';
import {callUsers} from '../../actions';
import store from '../../store';
import {getAllUsers} from '../../actions';
import ListComponent from './list';

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

export default class Employees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employees: [],
      anchorEl: null,
      open: false
    }
    this.handleClick = this
      .handleClick
      .bind(this);
    this.handleClose = this
      .handleClose
      .bind(this);
    this.getEmpoyeesList = this
      .getEmpoyeesList
      .bind(this);
    this.handleToggle = this
      .handleToggle
      .bind(this);
  }
  componentWillMount() {}
  componentDidMount() {
    console.log("Al                                                                                                                                                               l Props", this.props);
    this.getEmpoyeesList();
  }

  addProfilePic(data) {
    // console.log("Add Profile", data);
    for(let i = 0; i< data.length; i++){
      let item = data[i];
      let id = i % 10;
      item.image = Config.images + "profiles/" + (id+1) + ".jpeg";      
    }
    console.log("Data", data);
    return data;
  }

  getEmpoyeesList() {
    axios
      .get(axios.getEmployees())
      .then((response) => {
        // console.log("Employee Response", response);
        this.setState({employees: this.addProfilePic(response.data)});
        // console.log("At First Response", this.state.employees);
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
    this.setState({anchorEl: event.currentTarget});
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

    this.setState({open: false});
  };
  render() {
    const {anchorEl} = this.state;
    const open = Boolean(anchorEl);
    return (
      <Grid container>
        <Grid container>
          <Grid item sm={6}>
            <Typography className="pageTitle titleSection" variant="title" gutterBottom>
              Employees
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
              {({TransitionProps, placement}) => (
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
            data={this.state.employees}
            header={["name", "username", "email", "phone"]}/>
        </Grid>
      </Grid>
    );
  };
}