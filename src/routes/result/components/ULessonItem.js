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


class ULessonItem extends React.Component {

    render() {
        const { lesson_itm } = this.props;

        return(
            <div className="u-lesson-tbl">
                <div className="u-lesson-itm">
                    <div
                        style={{'backgroundColor': lesson_itm.color}}
                        className="lesson-icn">
                        <img src={lesson_itm.icon ? lesson_itm.icon : '/images/books.png'} alt="lesson"/>
                    </div>
                    <label className="lesson-ttl">
                        {lesson_itm.name}
                    </label>
                    <div className="lesson-result">
                    {lesson_itm.progress + '%'}
                    </div>
                </div>
                <table className="u-lesson-table table table-striped">
                    <tbody>
                        <tr>
                            <th>#</th>
                            <th className="text-center">Sections</th>
                            <th>Learned</th>
                            <th>Questions</th>
                            <th>Result</th>
                        </tr>
                        {lesson_itm.section && lesson_itm.section.length > 0 && lesson_itm.section.map((item, idx) => {
                            return(
                            <tr key={item.sectionId}>
                                <td>{idx+1}</td>
                                <td>{item.section}</td>
                                <td>{item.learned}</td>
                                <td>{item.questions}</td>
                                <td>{item.result}</td>
                            </tr>
                            )
                        })}
                    </tbody>
                </table>

            </div>
        );
    }
}

export default (withStyles(s)(ULessonItem));