import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './FinishCardItem.css';
import Link from '../../../../Link';

// import helper
import MHelper from '../../../../../helper/MHelper.js';
import * as rsActions from '../../../../../actions/result';
import history from '../../../../../history';
import Auth from '../../../../../routes/modules/Auth';

// redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

class FinishCardItem extends React.Component {
    state = {
        userProfile: null,
        nextId: null,
        hasNextCard: false,
        isPass: false,
        correctAnswer: 0,
        totalAnswer: 0
    }
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // get profile
        let userProfile = JSON.parse(localStorage.getItem('infoProfile'));
        this.setState({userProfile: userProfile});

        // count correct answers then check test isPass or not
        let correctAnswer = rsActions.countAnswer(this.props.level, this.props.lessonId, this.props.cardId, 1);
        let wrongAnswer = rsActions.countAnswer(this.props.level, this.props.lessonId, this.props.cardId, 0);
        let totalAnswer = correctAnswer + wrongAnswer;

        this.setState({correctAnswer: correctAnswer});
        this.setState({totalAnswer: totalAnswer});
        let percentCorrect = correctAnswer/totalAnswer;
        if(percentCorrect >= 0.8){
            // only pass when percent correct >= 80%
            this.setState({isPass: true});
        }

        // get lessons
        let lessonInfo = JSON.parse(localStorage.getItem('infoLesson'));
        if(lessonInfo.cardNext) {
            this.setState({
                nextId: lessonInfo.cardNext[0].id,
                hasNextCard: true
            });
        }

    }

    nextLession(){
        //hasNextCard
        let url = '/lesson/' + this.state.nextId + '/level/' + this.context.level + '/' + this.context.lessonId;
        let learn_result = rsActions.getLearnResult(this.context.level, this.context.lessonId);
        if(learn_result !== null){
            let params = {};
            params.learn_result = learn_result;
            params.access_token = Auth.getToken();
            let userInfo = JSON.parse(localStorage.getItem('infoProfile'));
            params.user_id = userInfo.id;
            this.props.postUserResult(params, url);
        }
    }

    tryAgain(){
        //rsActions.resetCard(this.props.level, this.props.lessonId, this.props.cardId);
        //let url = '/lesson/' + this.props.lesson.card[0].id + '/level/' + this.context.level + '/' + this.context.lessonId;
        //history.pushState(null, url);
        window.location.reload();
    }

    render() {
        const {lesson} = this.props;
        const {userProfile, nextId, hasNextCard, isPass, correctAnswer} = this.state;

        return(
            <div className={s.finish_wrap}>
                <div className={s.result_circle}>
                    <div className={s.result_star}>
                        <span className={s.icon}>
                            <svg id="icon_stars" viewBox="0 0 345 215" width="100%" height="100%">
                                <title>Artboard 1</title>
                                <path d="M285.788 40l-5.692 11.52L268 53.68l7.827 9.36L274.404 76l11.384-5.76L298.596 76l-2.846-13.68 9.25-8.64-12.808-2.16L285.788 40zM26.173 76l-2.615 5.44L18 82.46l3.596 4.42-.654 6.12 5.231-2.72L32.058 93l-1.308-6.46L35 82.46l-5.885-1.02L26.173 76zm64.942-1l-7.077 14.4L69 92.1l9.73 11.7-1.768 16.2 14.153-7.2 15.923 7.2-3.538-17.1L115 92.1l-15.923-2.7L91.115 75zm25.308-50l-4.615 9.28L102 36.02l6.346 7.54L107.192 54l9.231-4.64L126.808 54 124.5 42.98l7.5-6.96-10.385-1.74-5.192-9.28zM53.077 133l-7.385 15.04L30 150.86l10.154 12.22L38.308 180l14.769-7.52L69.692 180 66 162.14l12-11.28-16.615-2.82L53.077 133zM230.615 8l-3.077 6.4L221 15.6l4.23 5.2-.768 7.2 6.153-3.2 6.923 3.2L236 20.4l5-4.8-6.923-1.2-3.462-6.4zM199 32l-8 16-17 3 11 13-2 18 16-8 18 8-4-19 13-12-18-3-9-16zm110 97l-8 16.32-17 3.06 11 13.26-2 18.36 16-8.16 18 8.16-4-19.38 13-12.24-18-3.06-9-16.32zm-2.712-41l-1.692 3.52-3.596.66 2.327 2.86-.423 3.96 3.384-1.76 3.808 1.76-.846-4.18 2.75-2.64-3.808-.66-1.904-3.52z" ></path>
                            </svg>
                        </span>
                    </div>
                    <div className={s.result_status}>
                        <div className={s.score}>
                            <span>{this.state.correctAnswer}</span>out of {this.state.totalAnswer}
                        </div>
                    </div>
                </div>
                <h1 className={s.result_title}>
                    {isPass?'Fantastic work!':'Nearly there!'} {userProfile && userProfile.name}
                </h1>
                <h2 className={s.result_subtitle}>
                    {
                        isPass?"You’re ready for the next unit!":"You just need a bit more practice with this unit!"
                    }
                </h2>
                <div className={s.button_wrap}>
                    {/* has next card */}
                    {hasNextCard === true && isPass === true
                    && 
                        <span className="btn" onClick={() => this.nextLession()}>Continue</span>
                    }

                    {/* don't has next card */}
                    {hasNextCard === false && isPass === true
                    && 
                        <span className="btn" onClick={() => this.nextLession()}>Finish</span>
                    }

                    {/* try again */}
                    {isPass === false
                    && 
                        <span className="btn" onClick={() => this.tryAgain()}>Try Again</span>
                    }
                </div>
            </div>
        );
    }
}

FinishCardItem.contextTypes = {
  level: PropTypes.string,
  lessonId: PropTypes.string,
};

// Get return data, must register in reducer
function mapStateToProps(state) {
  const { result } = state.result;
  return {
    result
  }
}

// Get action to action from action creater
function mapDispatchToProps(dispatch) {
  return {
    postUserResult: bindActionCreators(rsActions.postUserResult, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(s)(FinishCardItem));