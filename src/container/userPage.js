import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import compose from 'recompose/compose';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  Hidden,
  withWidth
} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';

import MainNav from '../components/_/navigation';
import MobileNav from '../components/_/mobileNavigation';
import Header from '../components/_/header';
import {Footer} from "../components/_/elements";
import "../scss/userStyles.scss";

import Dashboard from '../components/dashboard/dashboard';
import Visit from '../components/visits/visit';
import Employees from '../components/employees/employees';
import EmployeeCreate from '../components/employees/employee-create';
import EmployeesEdit from '../components/employees/employee-edit';
import Account from '../components/account/account';
import AccountForm from '../components/account/accountform';
import Profile from '../components/profile/profile';
import ChangePassword from '../components/profile/changePassword';
import EditProfile from '../components/profile/editprofile';
import Communites from '../components/communities/communities';
import CommonService from '../service/commonServices';
import { ToastContainer, toast } from 'react-toastify';
import Company from '../components/companies/company';
import CompanyCreate from '../components/companies/company-create';
import CompanyEdit from '../components/companies/company-edit';


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary
  }
});

class userPage extends Component {
  constructor(props) {
    super(props);
  };
  loadComponent = () => {
    const path = this.props.location.pathname;
    console.log("Current Location", path);
    if (path.indexOf('/dashboard') !== -1) {
      return (
        <div><Dashboard {...this.props}/></div>
      );
    } else if (path.indexOf('/visit') !== -1) {
      return (
        <div><Visit {...this.props}/></div>
      );
    } else if (path.indexOf('/communities') !== -1) {
      return (
        <div><Communites {...this.props}/></div>
      );
    } else if (path.indexOf('/employees') !== -1) {
      var employee = path.split('/');
      if (employee.length > 2) {
        switch (employee[2]) {
          case "edit":
            return (
              <div><EmployeesEdit {...this.props}/></div>
            );
            break;
          case "create":
            return (
              <div><EmployeeCreate {...this.props}/></div>
            );
            break;
          default:
            return false;
        }
      } else {
        return (
          <div><Employees {...this.props}/></div>
        );
      }
    } else if (path.indexOf('/account') !== -1) {
      var account = path.split('/');
      if (account.length > 2) {
        switch (account[2]) {
          case "edit":
            return (
              <div><AccountForm {...this.props}/></div>
            );
            break;
          default:
            return false;
        }
      } else {
        return (
          <div><Account {...this.props}/></div>
        );
      }
    } else if (path.indexOf('/company') !== -1) {
      var company = path.split('/');
      if (company.length > 2) {
        switch (company[2]) {
          case "edit":
            return (
              <div><CompanyEdit {...this.props} /></div>
            );
            break;
          case "create":
            return (
              <div><CompanyCreate {...this.props} /></div>
            );
            break;
          default:
            return false;
        }
      } else {
        return (
          <div><Company {...this.props} /></div>
        );
      }
    } else if (path.indexOf('/profile/edit') !== -1) {
      return (
        <div><EditProfile {...this.props}/></div>
      );
    } else if (path.indexOf('/profile/changepassword') !== -1) {
      return (
        <div><ChangePassword {...this.props}/></div>
      );
    } else if (path.indexOf('/profile') !== -1) {
      return (
        <div><Profile {...this.props}/></div>
      );
    } else if (path.indexOf('/') !== -1) {
      return (
        <div><Dashboard {...this.props}/></div>
      );
    }
  }


  render() {
    return (
      <div>
        <Header {...this.props} />
        <Grid container className="bodyContainer">

          <Hidden only={['sm', 'md', 'lg', 'xl']}>
            <Grid className="navMobileContainer" item lg={12} md={12} sm={12} xs={12}>
              <MobileNav {...this.props} />
            </Grid>
          </Hidden>
          <Hidden only={['xs']}>
            <Grid className="navContainer" item lg={2} md={2} sm={3} xs={12}>
              <MainNav {...this.props}/>
            </Grid>
          </Hidden>
          <Grid className="bodyContent" item lg={10} md={10} sm={9} xs={12}>
            <Scrollbars
              autoHeightMin={100}
              renderTrackVertical={props => <div {...props} className="track-vertical"/>}>
              <div className="bodySection">
                {this.loadComponent()}
              </div>
            </Scrollbars>
          </Grid>
        </Grid>
        <Footer/>
        <ToastContainer autoClose={8000} />
      </div>
    );
  }
}

export default compose(withStyles(styles), withWidth(),)(userPage);
