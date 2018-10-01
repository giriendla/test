import {ALL_USERS, Mobile_Menu} from '../constants/action-types';
import axios from 'axios';
import {connect, dispatch } from 'react-redux';

export const getAllUsers = allUsers => ({
    type: ALL_USERS,
    users: allUsers
});

export const toggleMobileMenu = mobileMenu => ({
    type: Mobile_Menu,
    mobileMenu: mobileMenu
})