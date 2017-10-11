import React from 'react';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';

// import component
import MHelper from '../../../../helper/MHelper.js';
import AudioPlayer from './AudioPlayer.js';
import * as rsActions from '../../../../actions/result';


class FillBlankCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };

    state = {
        answer: null,
        answerAllready: false,
        answerResult: null,
        answerCorrect: null,
        arrAnswer: [],

        showHint: false
    }

    constructor(props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const {cardItmData} = this.props;
        // hide button next
        $('.step-pane .ldtail-next').hide();

        // disable button submit
        // $('#btn-submit').attr('disabled','disabled');

        // explode answer to array
        let subStr = MHelper.explode('___', cardItmData.json.sentence);
        this.setState({answerCorrect: subStr});
        
        if(cardItmData.json.sentence) {
            // focus input
            setTimeout(function() {
                $('.ipt_answer').eq(0).focus();
            }, 500);
        }

        let _this = this;
        cardItmData.json.answer.map((item, idx) => {
            _this.state.arrAnswer.push({
                originalAnswer: item,
                userAnswer: null,
                validate: null
            })
        });
    }

    async handleChange(event) {
        this.setState({
            answerResult: event.target.value.trim()
        });
        let idxBlank = MHelper.explode('ipt_answer_', event.target.id)[1];
        
        await this.setState(update(this.state, {
            // 1. state: arrAnswer
            arrAnswer: {
                [idxBlank]: {
                    userAnswer: {
                        $set: event.target.value.trim().toLowerCase(),
                    },
                    validate: {
                        $set: event.target.value.trim().length > 0 ? event.target.value.trim().toLowerCase() === this.state.arrAnswer[idxBlank].originalAnswer.toLowerCase() ? true : false : null
                    }
                },
            }
        }));
    }

    handleSubmit(event) {
        event.preventDefault();

        if (this.state.answerAllready === true
        ) { return; }

        let cardItmJson = this.props.cardItmData.json;
        let tempState   = {
            answer: false,
            answerAllready: true,
            // answerResult: this.state.answerResult,
            showHint: true
        };
        
        // check user enter input
        let idxUserAnswer = _.findIndex(this.state.arrAnswer, (i) => { return i.validate == null });
        
        if(idxUserAnswer === -1) {
            // show button next
            $('.step-pane .ldtail-next').show();
            
            // check answer correct/incorrect
            let idxAnswerWrong = _.findIndex(this.state.arrAnswer, (i) => { return i.validate == false });

            if(idxAnswerWrong !== -1) {
                // it's wrong
                this.setState(tempState);
                rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);

                // turn on sound
                var vid = document.getElementById('record-false');
                vid.play();
            } else {
                // it's right
                tempState.answer = true;
                this.setState(tempState);

                rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);

                // turn on sound
                var vid = document.getElementById('record-true');
                vid.play();
            }
        } else {
            $('.ipt_answer').eq(idxUserAnswer).focus();
            alert('Vui lòng nhập từ bạn chọn!');
        }
    }

    render() {
        const {cardItmData} = this.props;
        const {answer, showHint, answerAllready, answerCorrect} = this.state;

        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                    <div className="saudio-word">
                        <form className={s.fill_answer}
                            onSubmit={this.handleSubmit}
                                >

                            {/* 1. Audio Question */}
                            {answerAllready === false
                            && <div className="saudio-img">
                                {cardItmData.json.audio !== ""
                                && <AudioPlayer
                                audioId={'audio-player-' + cardItmData.id}
                                srcVideo={cardItmData.json.audio}/>}
                            </div>}

                            {answerAllready === false
                            && <div 
                            id={'audio-player-' + cardItmData.id}
                            className="saudio-sent text-center aud-play">
                                {/* icons */}
                                {(cardItmData.json.audio !== "") &&
                                <span
                                className="saudio-play no-float play"></span>
                                }
                                {(cardItmData.json.audio !== "") &&
                                <span
                                className="saudio-play no-float stop"></span>
                                }

                                {/* question */}
                                {answerCorrect && <div className="ssent-ct no-float">

                                        <div className="sent t-l">
                                            {answerCorrect
                                            && answerCorrect.map((item, idx) => {
                                                return(
                                                    <span key={idx+1}>
                                                        <span dangerouslySetInnerHTML={{__html: item}}></span>

                                                        {/* input */}
                                                        {idx < cardItmData.json.answer.length
                                                        && <input type="text"
                                                        className={s.ipt + ' ipt_answer'}
                                                        id={"ipt_answer_" + idx}
                                                        ref={"ipt_answer_" + idx}
                                                        key={idx}
                                                        value={this.state.value}
                                                        placeholder="Fill your words ..."
                                                        onChange={this.handleChange} />}
                                                    </span>
                                                )
                                            })}
                                        </div>

                                </div>}
                            </div>}

                            {/* 2. Show Answer */}
                            {showHint === true
                            && answerCorrect
                            && <div className={'answer_hint ' + s.hintFillAnswer}>

                                {/* Answer Right */}
                                {answerAllready === true &&
                                (answer === true || answer === false )
                                && <span className={s.msg_blk}>
                                    
                                    {answerCorrect
                                    && answerCorrect.map((item, idx) => {
                                        return(
                                            <span key={idx+1}>
                                                <span dangerouslySetInnerHTML={{__html: item}}></span>

                                                {/* input */}
                                                {idx < cardItmData.json.answer.length
                                                && <i className="fa fa-check"></i>}
                                                {idx < cardItmData.json.answer.length
                                                && <span className={s.txt_right}>
                                                    {this.state.arrAnswer[idx].originalAnswer}
                                                </span>}
                                            </span>
                                        )
                                    })}
                                </span>}

                                {/* Answer wrong */}
                                {answerAllready === true &&
                                answer === false
                                && <span className={s.msg_blk}>
                                    {answerCorrect
                                    && answerCorrect.map((item, idx) => {
                                        return(
                                            <span key={idx+1}>
                                                <span dangerouslySetInnerHTML={{__html: item}}></span>

                                                {/* input */}
                                                {idx < cardItmData.json.answer.length
                                                && <i className={this.state.arrAnswer[idx].validate === false ? "fa fa-times" : "fa fa-check"}></i>}
                                                {idx < cardItmData.json.answer.length
                                                && <span className={this.state.arrAnswer[idx].validate === false ? s.txt_wrong : s.txt_right}>
                                                    {this.state.arrAnswer[idx].userAnswer}
                                                </span>}
                                            </span>
                                        )
                                    })}
                                </span>}

                            </div>}

                            {/* 3. Button submit */}
                            {answerAllready === false
                            && <div className="step-choices">
                                <p className="text-center">
                                    <input
                                    id="btn-submit"
                                    className="btn"
                                    type="submit"
                                    value="Submit" />
                                </p>
                            </div>}

                            {/* 4. Audio Sound */}

                            {/* fail sound */}
                            <audio key={'audio-wrong'} 
                            //autoPlay 
                            ref="audioRecord" 
                            controls="controls" 
                            className="hidden"
                            id="record-false"
                            src={'/uploads/audio/Fail-sound.mp3'}></audio>
    
                            {/* correct sound */}
                            <audio key={'audio-true'} 
                            id="record-true"
                            //autoPlay 
                            ref="audioRecord" 
                            controls="controls" 
                            className="hidden"
                            src={'/uploads/audio/Correct-answer.mp3'}></audio>
                        </form>
                    </div>
            </div>
        );
    }
}

export default withStyles(s)(FillBlankCardItem)