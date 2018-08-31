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
    navItems = [
        {name: "Dashboard", link: "/dashboard", icon: "dashboard.png", isLogin: true},
        {name: "Visit", link: "/visit", icon: "visitor.png", isLogin: true},
        {name: "Communites", link: "/communites", icon: "communites.png", isLogin: true},
        {name: "Employees", link: "/employees", icon: "employees.png", isLogin: true},
        {name: "Account", link: "/account", icon: "account.png", isLogin: true},
        {name: "Profile", link: "/profile", icon: "profile.png", isLogin: true}
    ];  

    render() {
        return (
            <div className="mainNavigation">
                <ul>
                    {this.navItems.map((n, i) => {
                        return <li key={i}>
                            <Link to={n.link}><img src={Config.images + "icons/white/" + n.icon} />{n.name}</Link>
                        </li>
                    })}
                </ul>
            </div>
        );
    };
}