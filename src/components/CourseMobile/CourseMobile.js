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
import s from './CourseMobile.css';

import Auth from '../../routes/modules/Auth';
import history from '../../history';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions/levelMobile';

class CourseMobile extends React.Component {
  state = {
    value: ''
  }

  constructor(props) {
    super(props);

    
  }

  componentDidMount() {
    // get level
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
    let token = Auth.getToken();

    let params = {};
    params.token = token;
    params.course_id = userInfo.course_id;
    params.user_id = userInfo.id;

    this.setState({value: this.props.lesson_level ? this.props.lesson_level : userInfo.level});

    this.props.getLevelMobile(params);
  }

  componentWillReceiveProps(nextProps) {
    let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

    if(nextProps.lesson_level !== this.props.lesson_level) {
      if(nextProps.lesson_level !== this.props.lesson_level) {
        this.setState({value: nextProps.lesson_level ? nextProps.lesson_level : userInfo.level});
      }
    }
  }

  change(event){
    this.setState({value: event.target.value});

    history.push('/lessons/'+ event.target.value);
  }

  render() {
    const {levelMobile} = this.props;

    return (
      <div className="mob-courses">
            <select name="mob-courses" 
            onChange={this.change.bind(this) } 
            value={this.state.value}
            className="form-control mob-courses-sl">
              {levelMobile && levelMobile.map((item, idx) => {
                return(
                  <option 
                  key={idx+1} 
                  disabled={item.active === 0}
                  value={item.code}>{item.name}</option>
                );
              })} 
            </select>
        </div>
    );
  }
}

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { levelMobile } = state.levelMobile;
  
  return {
    levelMobile
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLevelMobile: bindActionCreators(actions.getLevelMobile, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(CourseMobile));
