/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import history from '../../../history';
import s from './Profile.css';

import Auth from '../../modules/Auth';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/profile';

class Profile extends React.Component {
    state = {
        authenticated:true,
        profileData: null
    };

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // get info Profile
        let profileData = JSON.parse(localStorage.getItem('infoProfile'));

        // set item num for active title link
        this.setState({
            profileData
        });
    }

    render() {
        const {authenticated} = this.state;
        
        return (
            <div className="main-wrap">
                {authenticated && 
                    <div className="profile-wrap">
                        <div className="profile-inner clearfix">
                            <div className="prof-img" style={{backgroundImage:`url('${this.state.profileData === null || !this.state.profileData.avatar.length ? './images/no-avatar.png' : this.state.profileData.avatar}')`}}></div>
                            <div className="prof-detail">
                                <h3 className="prof-ttl">{this.state.profileData && this.state.profileData.name}</h3>
                                <div className="prof-info">
                                    <div className="prof-info-itm">
                                        <div className="prof-info-box">
                                            <i className="fa fa-birthday-cake"></i>
                                            {this.state.profileData && this.state.profileData.birthday}
                                        </div>
                                    </div>
                                    <div className="prof-info-itm">
                                        <div className="prof-info-box">
                                            <i className="fa fa-map-marker"></i>
                                            {this.state.profileData && this.state.profileData.address} 
                                        </div>
                                        <div className="prof-info-box">
                                            <i className="fa fa-phone"></i>
                                            {this.state.profileData && this.state.profileData.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>}
            </div>
        );
    }
}

export default withStyles(s)(Profile);
