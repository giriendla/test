import React, { Component } from 'react';
import SingleRouteView from './singleView';

export default class LoadSinglePage extends Component{
    constructor(props) {
        super(props);
    };
    render() {
        const path = this.props.location.pathname;
        if(path.indexOf('/forgotpassword') !== -1){
            return (<div><SingleRouteView view="Forgotpassword" /></div>);
        }
    }
}
