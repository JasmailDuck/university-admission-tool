import React, { Component } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Routes, Route, Link, Navigate, Outlet, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

import navbarClasses from "./css/Navbar.module.css";
import footerClasses from "./css/Footer.module.css";
import Programs from "./Pages/Programs";
import Signup from "./Pages/Signup";
import UserProfile from "./Pages/profile/UserProfile";
import ADMINUSERMANAGEMENT from "./Pages/admin-userManagement/adminUserManagement";
import ADMIN from "./Pages/admin/admin";
import LOGIN from "./Pages/FrontEndLogIn";
import { logout } from "./actions/auth";
import { history } from "./helpers/history";
import Consultants from "./Pages/Consultants";
import USERPROFILEEDITORADMIN from "./Pages/admin-userManagement/cmpnts/userProfileEditorAdmin";
import ADMINFILEMANAGEMENT from "./Pages/admin-userFileManagement/adminFileManagement";
import FILEVIEW from "./Pages/admin-userFileManagement/cmpnts/fileView";
import logoIMG from "./images/testIcon.png";

import styled, { keyframes } from "styled-components";
import { fadeIn } from "react-animations";
const FadeInUpAnimation = keyframes`${fadeIn}`;
const FadeInUpDiv = styled.div`
  animation: 3s ${FadeInUpAnimation};
`;


class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      currentUser: undefined,
      userRole: undefined,
    };
  }

  // gets invoked right after first render() lifecyle of React component
  componentDidMount() {
    const user = this.props.user;

    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  logOut() {
    this.props.dispatch(logout());
    this.setState({
      currentUser: undefined,
    });
    window.location.reload(false);
  }

  // This method stops a user from using the back button on the website to get to login page
  // while logged in. also stops user from typing in a url to a page they cannot get to.
  // Used in render, and parent of routes that require user to be logged in.
  RequireAuth = () => {
    let location = useLocation();
  
    if (!this.state.currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/login" state={{ from: location }} />;
    }
  
    return <Outlet />;
  }

    NotRequireAuth = () => {
    let location = useLocation();
  
    if (this.state.currentUser) {
      // Redirect them to the /login page, but save the current location they were
      // trying to go to when they were redirected. This allows us to send them
      // along to that page after they login, which is a nicer user experience
      // than dropping them off on the home page.
      return <Navigate to="/userProfile" state={{ from: location }} />;
    }
  
    return <Outlet />;
  }

  render() {
    const { currentUser } = this.state;

    const defaultRoute = () => {
      if (currentUser) {
        return <Route path="*" element={<Navigate to="/userProfile" />} />;
      } else {
        return <Route path="*" element={<Navigate to="/login" />} />;
      }
    };

    //all the pages that are in the website. Each has a different route leads to
    //a page guided by the nav bar.
    return (
      <BrowserRouter location={history.location} navigator={history}>
        {currentUser && (  
          <div className={navbarClasses.Nav}>
            <div className={navbarClasses.navLogo}>
              <Link
                className={navbarClasses.NavLinkLogo}
                to="/programs"
                activestyle="true"
              >
                <img className={navbarClasses.logoIMG} src={logoIMG} alt="logo pic"/>
              </Link>
            </div>

            <div className={navbarClasses.navMenu}>
              <Link
                className={navbarClasses.NavLink}
                to="/programs"
                activestyle="true"
              >
                Programs
              </Link>

              <Link
                className={navbarClasses.NavLink}
                to="/Consultants"
                activestyle="true"
              >
                Consultants
              </Link>

              <Link
                  className={navbarClasses.NavBtnLink}
                  to="/login"
                  onClick={this.logOut}
                >
                  Log out
              </Link>

              <Link className={navbarClasses.NavBtnLink} to="/adminDashboard">
                  Admin Tools Icon
              </Link>

              <Link to="/userProfile">
                  <FaUserCircle className={navbarClasses.Profile} />
              </Link>
            </div>
          </div>
        )}

        {/* Footer will go below this point! */}
        <FadeInUpDiv>
        <footer  className={footerClasses.footer}>
          <div className={footerClasses.links}>
            <p>
              <a href="?">Terms of Use</a>
            </p>
            <p>|</p>
            <p>
              <a href="?">Privacy</a>
            </p>
            <p>|</p>
            <p>
              <a href="?">Accessibility</a>
            </p>
            <p>|</p>
            <p>
              <a href="?">Support</a>
            </p>
            <p>|</p>
            <p>
              Copyright &#169; 2022 <a href="?">Shirah</a> All rights reserved.
            </p>
          </div>
        </footer>
        </FadeInUpDiv>
        

        <div>
            <Routes>
              <Route element={<this.NotRequireAuth />}>
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<LOGIN />} />
              </Route>
              <Route element={<this.RequireAuth />}>
                <Route path="/programs" element={<Programs />} />
                <Route path="/userProfile" element={<UserProfile />} />
                <Route path="/admin/usermanagement" element={<ADMINUSERMANAGEMENT />} />
                <Route path="/adminDashboard" element={<ADMIN />} />
                <Route path="/consultants" element={<Consultants />} />
                <Route path="/admin/usermanagement/userEditor" element={<USERPROFILEEDITORADMIN/>} />
                <Route path="/admin/filemanagement" element={<ADMINFILEMANAGEMENT/>} />
                <Route path="/admin/filemanagement/view" element={<FILEVIEW/>} />
              </Route>
              {defaultRoute()}
            </Routes>
        </div>
      </BrowserRouter>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(App);
