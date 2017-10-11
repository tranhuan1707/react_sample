import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Lesson_Item.css';
import Link from '../../../Link';

// Import components
import SubLesson_Item from '../components/SubLesson_Item'

// jQuery Fx
// Click On Lesson
const clkOnLesson = () => {
    $('body').on('click', '.lesson', (e) => {
        //console.log($(e.currentTarget).offset().top);
        $('html, body').animate({
            scrollTop: $(e.currentTarget).offset().top - 70
        },{
            queue: false,
            duration: 600 + $(e.currentTarget).offset().top
        });
    });
}

class Lesson_Item extends React.Component {
    state = {
        levelCourse: null,
        userCode : null
    }

    componentDidMount() {
        // get level
        let levelCourse = JSON.parse(localStorage.getItem('levelCourse'));
        let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

        this.setState({levelCourse: levelCourse, userCode: this.props.lesson_level ? this.props.lesson_level : userInfo.level});

        let activeLesson = window.location.hash.slice(1, window.location.hash.length);

        clkOnLesson();
        if (activeLesson) {
            // console.log('#lesson-head-' + activeLesson);
            $('#lesson-head-' + activeLesson).click();
        }
    }

    render() {
        const {lessons} = this.props;
        const {levelCourse, userCode} = this.state;

        return (
            <div id="course" className="course tab-pane active">
                <div className="course-wrap">
                    <div className="course-ttl">
                        {levelCourse !== null
                        && levelCourse.map((item, idx) => {
                            return(
                                <span key={idx+1} 
                                className={(userCode !== null && userCode === item.code) ? 'txt' : 'hide'}>
                                    {item.name}
                                </span>
                            );
                        })} 
                        <span className="line"></span>
                    </div>
                    <div id="lesson-group" className="lessons">
                        {lessons.map((item, idx) => {
                            return(
                                <SubLesson_Item
                                key={item.id+1}
                                item={item}
                                idx={idx}
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

export default withStyles(s)(Lesson_Item);
