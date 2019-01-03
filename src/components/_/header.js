import React, {Component, Fragment} from 'react';
import {
  Button,
  Grid,
  Menu,
  MenuItem,
  MenuList,
  Grow,
  ClickAwayListener,
  Popper,
  Paper,
  Hidden,
  withWidth
} from '@material-ui/core';
import compose from 'recompose/compose';
import {withStyles} from '@material-ui/core/styles';
import {Scrollbars} from 'react-custom-scrollbars';
import MainNav from './navigation';
import Config from '../../container/config';
import MenuIcon from '@material-ui/icons/Menu';
import {toggleMobileMenu} from '../../actions';
import store from '../../store';
import CommonService from '../../service/commonServices';
// import NewsTicker from 'deku-news-ticker';
import Marquee from 'react-text-marquee';

const styles = theme => ({
  root: {
    display: 'flex'
  },
  paper: {
    marginRight: theme.spacing.unit * 2
  }
});

class Appheader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      news: [],
      showNews: false
    };
  }
  componentWillMount() {
    this.newsScroll();
  }
  
  newsScroll = () => {
    let localStore = CommonService.localStore.get("userData");
    let { news } = this.state;
    
    let userObj = JSON.parse(localStore.userData);
    news = userObj.hasOwnProperty("news") ? userObj.news : [];
    this.setState({ news });
    console.log("Header is at Header Section", news);

    if (news.length > 0) {
      this.setState({ showNews: true });
      console.log("News Scrolling");
    } else {
      this.setState({ showNews: false });
    }
  };
  toggleMobileMenu = () => {
    let currentMenuSate = store.getState().default.mobileMenu;
    currentMenuSate = !currentMenuSate;
    store.dispatch(toggleMobileMenu(currentMenuSate));
  };

  handleToggle = () => {
    this.setState(state => ({
      open: !state.open
    }));
  };

  handleClose = event => {
    if (this.anchorEl.contains(event.target)) {
      return;
    }
    this.setState({ open: false });
  };
  handleProfile = event => {
    window.location.pathname = "/profile";
  };
  redirectTo = event => {
    if (event) {
      window.location.pathname = event;
    } else {
      return;
    }
  };
  logoutUser() {
    setTimeout(() => {
      window.localStorage.clear();
      window.location.pathname = "/login";
    }, 1000);
  }
  goToHome = () => {
    let userData = CommonService.getToken();
    if (userData != null) {
      window.location.href = "/dashboard";
    } else {
      window.location.href = "/";
    }
  };

  checkProfile() {
    const { classes } = this.props;
    const { open } = this.state;
    const { anchorEl } = this.state;
    let showProfile;
    if (this.props != undefined && this.props.showProfile !== undefined) {
      showProfile = "";
    } else {
      showProfile = (
        <div className="profileSection">
          <Button
            buttonRef={node => {
              this.anchorEl = node;
            }}
            aria-owns={open ? "menu-list-grow" : null}
            aria-haspopup="true"
            onClick={this.handleToggle}
          >
            <img src={Config.images + "icons/green/user.png"} width="36" />
          </Button>
          <Popper
            open={open}
            anchorEl={this.anchorEl}
            transition
            disablePortal
            className="profileDropdown"
            style={{
              zIndex: 9999
            }}
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                id="menu-list-grow"
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom"
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={this.handleClose}>
                    <MenuList>
                      {/* <MenuItem
                      onClick={(event) => {
                      this.redirectTo('/profile');
                      this.handleClose(event);
                    }}>Profile</MenuItem>
                    <MenuItem
                      onClick={(event) => {
                      this.redirectTo('/profile/changepassword');
                      this.handleClose(event);
                    }}>Changepassword</MenuItem> */}
                      <MenuItem
                        onClick={event => {
                          this.handleClose(event);
                          this.logoutUser();
                        }}
                      >
                        Logout
                      </MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </div>
      );
    }
    return showProfile;
  }
  newsRender = news => { 
    let newsString = [];
    for(let i = 0; i < news.length; i++){
      let item = news[i];
      newsString.push((i+1) + ", " + item + " ");
    }

    console.log("News String", newsString);

    return (
      <div className="news">
        <div>
          <Marquee 
              title=""
              text={newsString.join("   ")}
              loop={true}
              hoverToStop={true}
              leading={10}
              trailing={10} />
        </div>
      </div>
    )
  };
  render() {
    const { news, showNews } = this.state;
    return (
      <Grid container className="headerContainer">
        <Grid className="headerLeftSection" item lg={2} md={2} sm={3} xs={6}>
          <a href="javascript:void(0)" onClick={this.goToHome}>
            <img src={Config.images + "logo.png"} />
          </a>
        </Grid>
        <Hidden only={["sm", "md", "lg", "xl"]}>
          {/* Mobile */}
          <Grid
            className="headerRightSection mobileNavigation"
            item
            lg={10}
            md={10}
            sm={9}
            xs={6}
          >
            {this.checkProfile()}
            <div>
              <MenuIcon
                className="mobileMenuIcon"
                onClick={this.toggleMobileMenu}
              />
            </div>
          </Grid>
        </Hidden>
        <Hidden only={["xs"]}>
          {/* Desktop */}
          <Grid
            className="headerRightSection"
            item
            lg={10}
            md={10}
            sm={9}
            xs={6}
          >
            <Grid container>
              <Grid
                item
                xs={10}
                sm={10}
                md={10}
                lg={10}
                className="newsSection"
              >
                { (showNews) ? this.newsRender(news) : "" }
              </Grid>
              <Grid item xs={2} sm={2} md={2} lg={2} className="profileMenu">
                {this.checkProfile()}
              </Grid>
            </Grid>
          </Grid>
        </Hidden>
      </Grid>
    );
  }
}

export default compose(withWidth())(Appheader);