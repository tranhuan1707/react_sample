/*
* Copyright © 2014-present Kriasoft, LLC. All rights reserved.
*
* This source code is licensed under the MIT license found in the
* LICENSE.txt file in the root directory of this source tree.
*/

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Result.css';

import ULevelItem from './ULevelItem.js'

class UCourseItem extends React.Component {

    render() {
        const { course_itm } = this.props;
        return(
           <div className="course-itm">
                <h3 className="u-course">{course_itm.courseName}</h3>
                <div className="u-course-ct">
                    {course_itm && course_itm.levels.length > 0 && course_itm.levels.map((item, idx) => {
                            return(
                                <ULevelItem
                                key={item.id+1}
                                level_itm={item}
                                idx={idx}
                                />
                            )
                        })}
                </div>
            </div>
        );
    }
}

export default (withStyles(s)(UCourseItem));