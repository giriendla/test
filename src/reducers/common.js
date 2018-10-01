import {
    Mobile_Menu
} from '../constants/action-types';

const initialState = {
    mobileMenu: true
};

export default function (state = initialState, action) {
    switch (action.type) {
        case Mobile_Menu:
            return { ...state,
                mobileMenu: action.mobileMenu
            };
        default:
            return state;
    }
}