import React, { Component } from 'react';
import Config from '../../container/config';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";

export default class MainNav extends Component {
 

    render() {
        return (
            <div className="mainNavigation">
                <ul>
                    {Config.mainnav.map((n, i) => {
                        if(n.isLogin){
                            return <li key={i}>
                            <Link to={n.link}><img src={Config.images + "icons/white/" + n.icon} />{n.name}</Link>
                            </li>
                        }
                    })}
                </ul>
            </div>
        );
    };
}