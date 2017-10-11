/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */
/* global $, jQuery */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './MenuMobile.css';
import Link from '../../Link';
import history from '../../../history';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/user';

// Import Component
import SubMenu from '../../Sidebar/SubMenu';

// 9. Menu mobile
function menuMob() {
    // if(!$('.mnav-btn').length) { return; }

    $('.mnav-btn').on('click', function(e) {
        e.preventDefault();
        var $parent = $('.mob-nav');
        if($parent.hasClass('active')) {
            $('.mnav-ct').animate({
                opacity: 0
            }, 150, 'swing', function() {
                $parent.removeClass('active');
                $('body').removeClass('bodyover');
                $('.mnav-ct').css({'opacity': ''});
            });
        } else {
            $parent.addClass('active');
            $('body').addClass('bodyover');
        }
    });
}

function submenuSidebarMB(_this) {

  $('.mob-nav .has-sub-menu > a').on('click', (e) => { 
    e.preventDefault();
    var $parent = $(this).closest('li');
    if($parent.hasClass('open')) {
      $parent.removeClass('open');
    } else {
      $parent.addClass('open');
    }
  });
}


class MenuMobile extends React.Component {
    componentDidMount() {
        menuMob();
        submenuSidebarMB();
    }

    async logoutUser() {
        const logoutUser = await this.props.logoutUser();

        if (logoutUser) {
            localStorage.removeItem('user_access')
            history.push('/login')
        }
    }

    closeMenu() {
        $('.mnav-ct').animate({
            opacity: 0
        }, 150, 'swing', function() {
            $('.mob-nav').removeClass('active');
            $('body').removeClass('bodyover');
            $('.mnav-ct').css({'opacity': ''});
        });
    }

    render() {

        return (
            <div className="mob-nav f-r">
                <span className="mnav-btn">
                    <i className="fa fa-bars"></i>
                    <i className="fa fa-times"></i>
                </span>
                <div className="mnav-ct">
                    <ul>
                    <li><Link onClick={() => this.closeMenu()} to={"/" }><i className="fa fa-home"></i>Home</Link></li>
                    <li><Link onClick={() => this.closeMenu()} to="/profile"><i className="fa fa-user-o"></i>My profile</Link></li>
                    <li className="has-sub-menu">
                        <Link  to="#mnav1">
                        <i className="fa fa-cog"></i>Courses
                        <span className="arrow">
                            <i className="fa fa-angle-down"></i>
                            <i className="fa fa-angle-up"></i>
                        </span>
                        </Link>
                        <ul id="mnav1" className="sub-menu">
                            <SubMenu/>
                        </ul>
                    </li>
                    <li><Link onClick={() => this.closeMenu()} to={"/result"}><i className="fa fa-list"></i>Result</Link></li>
                    <li><span 
                            className={s.linkLogout}
                            onClick={e => this.logoutUser(e)}>
                            <i className="fa fa-sign-out"></i>Log out</span></li>
                    </ul>
                </div>
            </div>
        );
    }
}

//export default withStyles(s)(MenuMobile);

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { user } = state.user;
  return {
    user
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {

    return {
        logoutUser: bindActionCreators(actions.logoutUser, dispatch)
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(MenuMobile));
