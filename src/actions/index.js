import {ALL_USERS} from '../constants/action-types';
import axios from 'axios';
import {connect, dispatch } from 'react-redux';

export const getAllUsers = allUsers => ({
    type: ALL_USERS,
    users: allUsers
});
