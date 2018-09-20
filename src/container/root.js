import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link,
    Redirect,
    withRouter
  } from "react-router-dom";
import UserPage from './userPage';
import LoadSinglePage from './singlePage';
import BeforeLoginPage from './loginPage';
import Config from './config';

const Root = () => {
    return (
        <div className="root">        
            {
                Config.mainnav.map((n, i) => {
                    if(n.isLogin){
                        // After Login
                        return (
                            <Route path={n.link} component={UserPage} key={i} />
                        )
                    }else{
                        // Before Login
                        if(n.template == 'single'){
                            return (
                                <Route path={n.link} exact component={LoadSinglePage} key={i}  />
                            )
                        }else if(n.template == 'beforeLogin'){
                            return (
                                <Route path={n.link} exact component={BeforeLoginPage} key={i}  />
                            )
                        }
                    }
                })
            } 
            <Route path="/" exact component={BeforeLoginPage} />           
        </div>
    );
};

export default Root;