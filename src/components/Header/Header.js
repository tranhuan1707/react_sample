/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $ */
import React from 'react';
import ReactDOM from 'react-dom';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Header.css';
import Link from '../Link';
import Navigation from '../Navigation';

// import component
import Profile from './Profile';
import MenuMobile from './MenuMobile';
import Course from './Course';

/* jQ FrontEnd Fn --- */
// Click hide logo & leftsidebar
function hideLogoAndLeftSb() {
    //if(!$('.mn-close').length) { return; }
    // console.log($('.mn-close'));
    $('.header').on('click', '.mn-close', (e) => {
        // console.log($('.mn-close'));
        e.preventDefault();

        let $a_click        =   $('.mn-close'),
            $logo           =   $('.logo'),
            $logo_wrap      =   $a_click.closest('.logo-wrap'),
            $header_menu    =   $logo_wrap.siblings('.header-inner'),
            $header         =   $a_click.closest('.header'),
            $sidebar_wrap   =   $header.siblings('.wrapper');

        if($a_click.hasClass('active')) {
            $a_click.removeClass('active');
            $logo.show();
            $logo_wrap.removeClass('off');
            $header_menu.removeClass('add');

            // sidebar
            $sidebar_wrap.removeClass('lsbar-closed');
            setTimeout(function(e) {
                $('.sidebar-nav > ul > li > a').find('.title').show();
            }, 300)
        } else {
            $a_click.addClass('active');
            $logo.hide();
            $logo_wrap.addClass('off');
            $header_menu.addClass('add');

            // sidebar
            $sidebar_wrap.addClass('lsbar-closed');
            $('.sidebar-nav > ul > li > a').find('.title').hide();
        }
    });
}

/* MAIN CLASS */
class Header extends React.Component {

  constructor(props) {
      super(props);

      this.state = {
          authenticated : true,
          hasProfile: true
      }
  }

  componentDidMount() {
    hideLogoAndLeftSb();
    this.setState({
      hasProfile: JSON.parse(localStorage.getItem('infoProfile')) === null ? false : true,
    })
  }

  render() {
    const {authenticated, userLevel} = this.state;
    return (
      <div className="header">
        {authenticated && <div className="header-wrap">
          <div className="logo-wrap">
            <span className="mn-close"><i className="fa fa-bars"></i></span>
            <Link className="logo" to={"/"}>
              <img src='/images/logo-full.png' alt="English Town"/>
            </Link>
          </div>
          {/* END LOGO*/}
          <div className="header-inner">
            <div className="header-top clearfix">
                <Profile/>
                <MenuMobile/>
            </div> {/* END HEADER TOP*/}
            <Course lesson_level={this.props.lesson_level}/> {/* END HEADER NAV*/}
          </div>
        </div>}
      </div>
    );
  }
}

export default withStyles(s)(Header);
