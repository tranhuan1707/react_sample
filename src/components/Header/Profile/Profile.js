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
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Profile.css';
import Link from '../../Link';
import history from '../../../history';
// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/user';
import * as actionsProfile from '../../../actions/profile';
import Auth from '../../../routes/modules/Auth';

/* jQ FrontEnd Fn --- */
// 3. Show Profile popup
function showPrf () {
    // if(!$('.user-nav').length) { return; }

    $('.user-nav').on('click', function(e) {
        if($(this).hasClass('active')) {
            $(this).removeClass('active')
        } else {
            $(this).addClass('active')
        }
    });

    $('.user-nav').on('clickoutside', function(e) {
        $(this).removeClass('active');
    });
}


class Profile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            profileAvatar: '/images/no-avatar.png'
        }
    }

    componentDidMount() {
        showPrf ();
        let token = Auth.getToken();

        let params = {};
        params.token = token;
        if (localStorage.getItem('infoProfile') && localStorage.getItem('infoProfile') != 'null') {
            this.setState({
                profileAvatar: !JSON.parse(localStorage.getItem('infoProfile')) ? './images/no-avatar.png' : JSON.parse(localStorage.getItem('infoProfile')).avatar
            });
        }
    }

    // logout user
    async logoutUser() {
        const logoutUser = await this.props.logoutUser();

        if (logoutUser) {
            // sessionStorage.removeItem('user_access');
            localStorage.clear();
            history.push('/login')
        }
    }


  render() {
    return (
        <div className="user-nav f-r">
            <div className="unav-profile">
                <figure style={{backgroundImage: `url("${this.state.profileAvatar}")`}}
                    className="unav-img"></figure>
            </div>
            <ul className="dropdown-menu">
                <li><Link to="/profile"><i className="fa fa-user-o"></i>My profile</Link></li>
                <li><span
                        className={s.linkLogout}
                        onClick={e => this.logoutUser(e)}
                    ><i className="fa fa-sign-out"></i>Log out</span></li>
            </ul>
        </div>
    );
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { user } = state.user;
  const { profile } = state.profile;
  return {
    user,
    profile
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    logoutUser: bindActionCreators(actions.logoutUser, dispatch),
    getProfile: bindActionCreators(actionsProfile.getProfile, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Profile));
