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
    constructor(props){
        super(props);
        console.log("At Navigation", props);
    }

    render() {
        const currentUrl = this.props.match.url;
        return (
            <div className="mainNavigation">
                <ul>
                    {Config.mainnav.map((n, i) => {
                        if(n.isLogin){
                            return <li key={i}>
                            <Link to={n.link} className={(n.link === currentUrl) ? "active": ""}>
                                <img src={Config.images + "icons/white/" + n.icon} />
                                <span>{n.name}</span>
                            </Link>
                            </li>
                        }
                    })}
                </ul>
            </div>
        );
    };
}