/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lesson.css';
import history from '../../../history';
import Link from '../../../components/Link';
import _ from 'lodash';

import Auth from '../../modules/Auth';

// Redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../../actions/lesson';

// import component
import Card_Item from '../../../components/Pages/Lesson/Card_Item';

// import helper
import ApiRx from '../../../helper/ApiRx';

// js hover tooltip
function showToolDetail(arrayTool) {
    if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }

    arrayTool.forEach(function(item) {
        $(item).tooltip();
    });
}

function updateToolDetail(itmTooltip, arrTitle) {

    if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }

    $(itmTooltip).tooltip('hide')
    .attr('data-original-title', arrTitle);
}

class Lesson extends React.Component {
    static propTypes = {
        lesson_id: PropTypes.string.isRequired,
        onClickGetCardItem: PropTypes.func
    };

    state = {
        cateName: '',
        per: 0,
        lessonItemNum: 0,
        isMounted: false,
    }

    constructor(props) {
        super(props);

        this.getSubLessonDone = this.getSubLessonDone.bind(this);
        this.getSubLessonFail = this.getSubLessonFail.bind(this);
    }

    componentDidMount() {
        const {lesson_id, lessonId} = this.props;
        this.getCardItem();

        $(document).keypress((e) => {
            if(e.which == 13) {
                if ($('.step-pane .ldtail-next').length) {
                    if ($('.step-pane .ldtail-next').is(':visible')) {
                        $('.step-pane .ldtail-next').click();
                    }
                }
            }
        });
    }

    async getApiSubLesson(lesson_id) {
        // const {lesson_id} = this.props;

        let token = Auth.getToken();
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

        let params = {};
        params.token = token;
        params.lesson_id = lesson_id;
        params.user_id = userInfo.id;

        await ApiRx.getSubLesson(params, this.getSubLessonDone, this.getSubLessonFail);
        this.setState({isMounted: true});
    }

    // get lesson succedd
    getSubLessonDone(data) {
        let _this = this;
        if (this.state.isMounted) {
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

            if(data.data) {
                let curCardIdx = -1;
                $.each(data.data, function(index, item) {

                    let idxCard = _.findIndex(item, (itm) => {
                        return itm.id == parseInt(_this.props.lesson_id);
                    });

                    if (idxCard >= 0) {
                        curCardIdx = parseInt(index);
                        let lessonObj = {
                            cardNext: data.data[parseInt(curCardIdx+1)],
                        };
                        localStorage.setItem('infoLesson', JSON.stringify(lessonObj));
                    }
                })
            }
        }
    }

    // get lesson failed
    getSubLessonFail(error) {
        console.log('error', error);
    }

    getChildContext() {
        return {
            level: this.props.levelId,
            lessonId: this.props.lessonId,
        };
    }

    // get api card item
    getCardItem(id) {
        const {lesson_id} = this.props;

        let token = Auth.getToken();

        let params = {};
        params.token = token;
        if(id) {
            params.card_id = id;
        } else {
            params.card_id = lesson_id;
        }


        this.props.getLesson(params);
    }


    // click get card item
    onClickGetCardItem(id, index) {
        // set item num for active title link
        this.setState({ lessonItemNum: index});
        this.getCardItem(id);
    }

    componentWillReceiveProps(nextProps) {
        let _this = this;
        const {lesson_id, lessonId} = this.props;

        if(nextProps.lesson !== null) {
            // count percent
            if(nextProps.lesson
            && nextProps.lesson.items
            && nextProps.lesson.items.length) {
                this.setState({
                    per: (100 / nextProps.lesson.items.length)
                })
            }

            let card_position = _.findIndex(nextProps.lesson.card, (i) => { return i.id == lesson_id; });

            this.setState({
                cateName: nextProps.lesson.lesson_name,
                cardItmData : nextProps.lesson,
                lessonItemNum: card_position
            });

            // call js
            setTimeout(function() {
                showToolDetail(['.ldtail-guide .pathway-circle', '.ldtail-down', '.ldtail-next']);
            }, 500);

            // save new localStorage   
            this.getApiSubLesson(lessonId);
        }

        // get next lesson
        if(nextProps.lesson_id !== this.props.lesson_id) {
            let lesson_id = parseInt(nextProps.lesson_id);
            this.getCardItem(lesson_id);
        }
    }

    render() {
        const {lesson, lesson_id} = this.props;
        const {cateName, per, cardItmData, lessonItemNum} = this.state;

        return (
            <div className="main-wrap">
                {lesson == null && <div className={s.loading}>
                    <i style={{fontSize: 30}} className="fa fa-circle-o-notch fa-spin "></i>
                </div>}
                {lesson !== null && <div className="courses tab-content">
                    <div className="lesson-detail">
                        <div className="ldtail-txt">
                            <Link to={'/lessons/' + this.props.levelId + '#' + this.props.lessonId }>
                            {cateName}
                            </Link>
                        </div>

                        <div className="ldtail-guide clearfix">
                            <ul className="pathway f-l">
                                {lesson
                                && lesson.card
                                && lesson.card.length !== 0
                                && lesson.card.map((item, idx) => {
                                    return(
                                        <li key={idx+1}
                                            className={"pathway-itm "
                                                + (idx === lessonItemNum ? 'active ' : '')
                                                /*+ (item.active !== 1 ? 'pathway-hide' : '')*/}>
                                            {/* <span
                                            onClick={() => this.onClickGetCardItem(item.id, idx)}>   */}
                                            <Link to={"/lesson/" + item.id + '/level/' + this.props.levelId + '/' + this.props.lessonId}>
                                                 <span style={{'backgroundImage': 'url('+ item.icon +')'}}
                                                data-title={item.title}
                                                data-desc={item.description}
                                                className={"pathway-circle "
                                                    + (item.type === 4 ? 'gramma' : '')}></span>
                                            </Link>
                                            {/* </span>   */}
                                        </li>
                                    )
                                })}

                            </ul>
                            {/*{lesson
                                && lesson.items
                                && lesson.items.length !== 0
                                && <div className="ldtail-info f-r">
                                    <Link to="javscript:;"
                                    data-title="Download"
                                    className="ldtail-arrow ldtail-down">
                                    <i className="fa fa-download"></i>
                                </Link>
                            </div>}*/}
                        </div>
                        <Card_Item
                        cardId={this.props.lesson_id}
                        cardItmData={cardItmData}
                        lesson={lesson}
                        lessonItemNum={lessonItemNum}
                        onClickGetCardItem={(id, idx) => this.onClickGetCardItem(id, idx)}
                        per={per}/>
                        {/* END : CARD ITEM*/}
                        </div>
                </div>}
            </div>
        );
    }
}

Lesson.childContextTypes = {
  level: PropTypes.string,
  lessonId: PropTypes.string
};

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { lesson } = state.lesson;
 //console.log('lesson', lesson);
  return {
    lesson
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    getLesson: bindActionCreators(actions.getLesson, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(Lesson));
