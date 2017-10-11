import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lesson_Cards.css';
import Link from '../../../../Link';
import axios from 'axios';

//import helper
import { ENGTOWN_API} from '../../../../../helper/constant/Site';
import Auth from '../../../../../routes/modules/Auth';
import ApiRx from '../../../../../helper/ApiRx';

// function js tooltip
function showTool () {
    if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }
    // if(!$('.sub-lesson .pathway-circle').length) { return; }

    $('.sub-lesson .pathway-circle').tooltip({
        title: function() {
            var html = `<div class="tooltip-body">
                            <div class="tooltip-ttl">${$(this).data('title')}</div>
                            <div class="tooltip-desc">${$(this).data('desc')}</div>
                        </div>
                        <div class="tooltip-footer">Click to start</div>`
            return html
        },
        html: true
    });
}

class Lesson_Cards extends React.Component {
    static propTypes = {
        saveInfoLesson: PropTypes.func
    };

    state = {
        subLesson : null,
        isMounted: false,
        arrTypeName: ['Listening', 'Vocabulary', 'Expression', 'Grammar / Structure', 'Role play']
    }

    constructor (props) {
        super(props)
        this.getSubLessonDone = this.getSubLessonDone.bind(this)
        this.getSubLessonFail = this.getSubLessonFail.bind(this)
        // console.log(props);
    }

    componentDidMount() {
        // remove localStrorage info lesson
        localStorage.removeItem('infoLesson');
        sessionStorage.removeItem('user_speaker');
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.lesson_id !== this.props.lesson_id) {
            this.getApiSubLesson(nextProps.lesson_id);
        }
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
        if (this.state.isMounted) {
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
            this.setState({subLesson: data, defaultLevel : userInfo.level});
        }
        // js hover tooltip
        showTool();
    }

    // get lesson failed
    getSubLessonFail(error) {
        console.log('error', error);
    }

    // save info lesson to localStorage
    saveInfoLesson(cardPosition, dataLessons) {
        let lessonObj = {
            cardNext: dataLessons[cardPosition]
        };
        // console.log('lessonObj', lessonObj);
        localStorage.setItem('infoLesson', JSON.stringify(lessonObj));
        return false;
    }

    render() {
        const {subLesson, arrTypeName} = this.state;

        return (
            <div>
                {subLesson
                && subLesson.data
                && subLesson.data !== false
                && <div className="lbody-wrap">
                    <div className="sub-lessons">
                        {arrTypeName.map((itmType, pos) => {
                            return(
                                <div key={pos+1}
                                className="sub-lesson"
                                /*className={(subLesson.data[pos+1][0].active === 1 ? "sub-lesson" : "")}*/>
                                    {subLesson.data[pos+1]
                                    /*&& subLesson.data[pos+1][0].active === 1 */
                                    && <div>
                                        {/*subLesson.data[pos+1][0].active === 1
                                        &&*/ <div className="sl-ttl">{itmType}</div>}
                                        <ul className="pathway">
                                            {subLesson.data[pos+1].map((item ,idx) => {
                                                return(
                                                    <li className={"pathway-itm "
                                                        /*+ (item.active !== 1 ? 'pathway-hide' : '') */}
                                                    key={idx+1}>
                                                        <Link to={"/lesson/" + item.id
                                                                + "/level/" + (this.context.level ? this.context.level : this.state.defaultLevel)
                                                                + "/" + this.props.lesson_id}
                                                        onClick={() => this.saveInfoLesson(pos+2, subLesson.data)}>
                                                            <span style={{'backgroundImage': 'url('+ item.icon +')'}}
                                                                data-title={item.title} data-desc={item.description}
                                                                className={"pathway-circle "
                                                                    + (item.type === 4 ? 'gramma' : '')}></span>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </div>}
                                </div>
                            )
                        })}
                        {/* END BLOCK*/}

                        {/* Table Result */}
                        {/* <table className="table table-striped">
                            <tbody>
                                <tr>
                                    <th>#</th>
                                    <th>Sections</th>
                                    <th>Learned</th>
                                    <th>Questions</th>
                                    <th>Result</th>
                                </tr>
                                <tr>
                                    <td>1</td>
                                    <td>Listening</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9/10</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Vocabulary</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9/10</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Expression</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9/10</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Grammar / Structure</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9/10</td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Role play</td>
                                    <td>10</td>
                                    <td>10</td>
                                    <td>9/10</td>
                                </tr>
                            </tbody>
                        </table> */}
                    </div>
                </div>}
            </div>
        );
    }
}

Lesson_Cards.contextTypes = {
  level: PropTypes.string
};
export default withStyles(s)(Lesson_Cards);
