import React, { Component } from 'react';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import axios from 'axios';
import MainNav from '../_/navigation';
import Config from '../../container/config';
import Dummy from '../_/dummyText';
import {callUsers} from '../../actions';
import store from '../../store';
import {
    getAllUsers
} from '../../actions';


export default class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: []
        }
    }
    componentWillMount() {
        
        
    }
    componentDidMount() {        
        this.getEmpoyeesList();        
    }

    getEmpoyeesList() {
        axios
        .get(axios.getEmployees())
        .then((response) => {
            // console.log("Employee Response", response);
            this.setState({employees: response.data});            
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

    
    render() {        
        return (
            <Grid container>
                Dashboard Page
                {
                    this.state.employees.map((n, i) => {
                        return(
                            <div key={i}>
                                {JSON.stringify(n)}
                            </div>
                        )
                    })
                }
            </Grid>
        );
    };
}