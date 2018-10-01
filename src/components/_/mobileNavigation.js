import React, {Component, Fragment} from 'react';
import Config from '../../container/config';
import CSSTransitionGroup from 'react-transition-group';
import {Link} from "react-router-dom";
import store from '../../store';
import {toggleMobileMenu} from '../../actions';

export default class MobileNav extends Component {
  constructor(props) {
    super(props);
    this.state = {}

    console.log("At Constructore", props, store.getState());
    console.log("At Navighation STate", this.state);
  }

  toggleMenu = () => {
    let currentMenuSate = store
      .getState()
      .default
      .mobileMenu;
    currentMenuSate = !currentMenuSate;
    store.dispatch(toggleMobileMenu(currentMenuSate));
  }

  delayRedirect = event => {
    const { history: { push } } = this.props;
    /* event.preventDefault(); */
    setTimeout((to)=>push(to), 1000);
  }

  // "menuHolder showMenu"
  showMobileMenu = () => {
    const currentUrl = this.props.match.url;
    return (
      <div
        className={(store.getState().default.mobileMenu)
        ? "menuHolder"
        : "menuHolder showMenu"}>
        <div className="mask"></div>
        <div className="menuControls">
          <a href="javascript:void(0)" onClick={this.toggleMenu}>X</a>
        </div>
        <ul>
          {Config
            .mainnav
            .map((n, i) => {
              if (n.isLogin && !n.hasOwnProperty('child')) {
                return <li key={i}>
                  <Link
                    to={n.link}
                    onClick={() => {
                      this.toggleMenu();
                      this.delayRedirect();
                    }}
                    className={(n.link === currentUrl)
                    ? "active"
                    : ""}>
                    <img src={Config.images + "icons/white/" + n.icon}/>
                    <span>{n.name}</span>
                  </Link>
                </li>
              }
            })}
        </ul>
      </div>
    )
  }
  render() {
    return (
      <Fragment>
        <div className="mainMobileNavigation">
          {/* <div className="toggleMenu" onClick={this.toggleMenu}>Show Menu</div> */}
          {this.showMobileMenu()}
        </div>
      </Fragment>
    );
  };
}