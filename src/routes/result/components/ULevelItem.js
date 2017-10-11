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

import ULessonItem from './ULessonItem.js'


class ULevelItem extends React.Component {

    render() {
        const { level_itm } = this.props;

        return(
           <div className="u-level-itm">
                <h4 className="u-level">{level_itm.level}</h4>
                <div className="row lessons-in-lvl">
                    {level_itm && level_itm.lessons.length > 0 && level_itm.lessons.map((item, idx) => {
                            return(
                            <div key={item.id+1} className="col-md-6">
                                <ULessonItem
                                key={item.id+1}
                                lesson_itm={item}
                                idx={idx}
                                />
                            </div>
                            )
                        })}
                </div>
            </div>
        );
    }
}

export default (withStyles(s)(ULevelItem));