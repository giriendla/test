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
        this.state = {
            doRedirect: false,
            redirectUrl: null
        }
    }
    redirect = (event, link) => {
        event.preventDefault();
        console.log("Redirecting to", event, link); 
        this.setState({
            doRedirect: true,
            redirectUrl: link.link
        });
        // onClick={(event) => {this.redirect(event, n)}} 
    }

    render() {
        const currentUrl = this.props.match.url;
        const {doRedirect, redirectUrl} = this.state;

        /* if (doRedirect) {
            return <Redirect to={redirectUrl}/>;
        } */
        
        return (
            <div className="mainNavigation">
                <ul>
                    {Config.mainnav.map((n, i) => {
                        if(n.isLogin && !n.hasOwnProperty('child')){
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