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
import s from './Lessons.css';
import history from '../../../history';

import Auth from '../../modules/Auth';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/lessons';

// import component
import Lesson_Item from '../../../components/Pages/Lessons/Lesson_Item';

class Lessons extends React.Component {
    state = {
        authenticated:true
    };

    constructor(props) {
        super(props);
    }

    getChildContext() {
        let level = this.props.lesson_level;
        return {level: level};
    }



    componentDidMount() {
        this.getLessons(this.props.lesson_level);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.lesson_level !== this.props.lesson_level) {
            // console.log('nextProps.lesson_level', nextProps.lesson_level);
            // console.log('this.props.lesson_level', this.props.lesson_level);
            this.getLessons(nextProps.lesson_level);
        }
    }

    getLessons(levelId) {

        let token = Auth.getToken();
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
        let params = {};
        params.token = token;
        params.course_id = userInfo.course_id;
        params.user_id = userInfo.id;

        if(levelId) {
            params.level = levelId;
        } else {
            params.level = userInfo.level ;
        }

        this.props.getLessons(params);
    }

    render() {
        const {authenticated} = this.state;
        const {lessons, lesson_level} = this.props;

        return (
            <div className="main-wrap">
                {authenticated && <div className="courses tab-content">
                    {lessons == null && <div className={s.loading}>
                        <i style={{fontSize: 30}} className="fa fa-circle-o-notch fa-spin "></i>
                    </div>}
                    {lessons
                    && lessons.items
                    && <Lesson_Item lesson_level={lesson_level} lessons={lessons.items}/>}
                </div>}
            </div>
        );
    }
}

// Context
Lessons.childContextTypes = {
  level: PropTypes.string
};

Lessons.contextTypes = {
    storeSubscription: PropTypes.object
};

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { lessons } = state.lessons;

  return {
    lessons
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLessons: bindActionCreators(actions.getLessons, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Lessons));
