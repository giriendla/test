import React from 'react';
import axios from "axios";
import Config from "../container/config";
import CommonService from './commonServices';
import { ToastContainer, toast } from 'react-toastify';

// Add a request interceptor
axios.interceptors.request.use(
  config => {
    // debugger;
      console.log("at interceptors request\n", config);
      if(config.method === 'get'){
        let userData = CommonService.getToken()
        if(userData != null){
          // config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzM3MiIsImV4cCI6MTU0MjEwNjg5M30.QXVK-0AIOXs9ys54SvY0LJPyhaPS5_R7-IsGAlhG7qU";
          config.headers['Authorization'] = userData;
        }
      }else if(config.method === 'post'){
        if(config != undefined && config.data.service === undefined && config.data.service != "login"){
          let userData = CommonService.getToken()
          if(userData != null){
            // config.headers['Authorization'] = "eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiMzM3MiIsImV4cCI6MTU0MjEwNjg5M30.QXVK-0AIOXs9ys54SvY0LJPyhaPS5_R7-IsGAlhG7qU";
            config.headers['Authorization'] = userData;
          }
        }
        if(config.data.hasOwnProperty('service')){
          delete config.data.service;
        }
      }
    // Do something before request is sent
    return config;
  },
  error => {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axios.interceptors.response.use(
  response => {
    // debugger;
      console.log("At Interceptors response\n", response);
    // Do something with response data
    return response.data;
  },
  error => {
    // debugger;
    if(error !== undefined && error.response !== undefined && error.response.data.message === "Signature has expired"){      
      toast.error(error.response.data.message, {
        position: toast.POSITION.TOP_CENTER
      });
      window.location.href = "/login";
      window.localStorage.clear();
    }
    // debugger;
    // Do something with response error
    return Promise.reject(error);
  }
);

axios.getEmployees = () => {
  return Config.baseUrl + Config.api.employees.list.url;
};
axios.getEmployeeById = (id) => {
  return Config.baseUrl + Config.api.employees.employee.url + id;
};
axios.createEmployee = () => {
  return Config.baseUrl + Config.api.employees.create.url;
};
axios.editEmployee = () => {
  return Config.baseUrl + Config.api.employees.edit.url;
};
axios.disputeEmployee = id => {
  return Config.baseUrl + Config.api.employees.dispute.url + id;
};
axios.getPosts = () => {
  return Config.baseUrl + Config.api.posts.url;
};
axios.registerUser = () => {
  return Config.baseUrl + Config.api.register.register.url;
};
axios.fetchCompanyDetails = id => {
  return Config.baseUrl + Config.api.register.fetchCompanyDetails.url + id;
};
axios.login = () => {
  return Config.baseUrl + Config.api.login.url;
};
axios.getDashboardData = () => {
  return Config.baseUrl + Config.api.dashboard.url;
};
axios.getCommunitiesList = () => {
  return Config.baseUrl + Config.api.commounities.list.url;
};
axios.getStateData = () => {
  return Config.baseUrl + Config.api.company.states.url;
};
axios.getCompanies = () => {
  return Config.baseUrl + Config.api.company.list.url;
};
axios.createCompany = () => {
  return Config.baseUrl + Config.api.company.create.url;
};
axios.getServiceTypes = () => {
  return Config.baseUrl + Config.api.serviceTypes.url;
};

export default axios;
