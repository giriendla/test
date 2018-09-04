import React, { Component } from 'react';
import { Button,Grid, Menu, MenuItem } from '@material-ui/core';
import { Scrollbars } from 'react-custom-scrollbars';
import MainNav from '../components/_/navigation';
import Dummy from '../components/_/dummyText';
import Header from '../components/_/header';
import { Footer } from "../components/_/elements";

import Forgotpassword from '../components/forgotpassword/forgotpassword';

export default class LoadSinglePage extends Component{
    constructor(props) {
        super(props);
    };
    checkView() {
        const path = this.props.location.pathname;
        if(path.indexOf('/forgotpassword') !== -1){
            return (<div><Forgotpassword /></div>);
        }
    }
    render() {
        return(
            <div>
                <Header showProfile={false} />
                <Grid container className="bodyContainer">                                
                    <Grid className="bodyContent forgotPassword" item lg={10} md={10} sm={9} xs={12}>
                        {this.checkView()}
                    </Grid>
                </Grid>
                <Footer />
            </div>
        )
    }
}
