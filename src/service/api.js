import React, {
    Component
} from 'react';
import axios from 'axios';
import Config from '../container/config';


axios.getEmployees = () => {
    return Config.baseUrl + Config.api.users.url
};


export default axios;