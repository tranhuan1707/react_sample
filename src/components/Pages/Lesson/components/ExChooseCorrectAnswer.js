import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import * as rsActions from '../../../../actions/result';

class ExChooseCorrectAnswer extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };

    state = {
        answer: null,
        answerAllready: false,
        answerResult: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    chooseAnswer(value) {
        if (this.state.answerAllready === true) { return; }

        let cardItmJson = this.props.cardItmData.json;
        let tempState   = {
            answer: false,
            answerAllready: true,
            answerResult: value,
            answerCorrect: null
        };

        // show button next
        $('.step-pane .ldtail-next').show();

        // it's Right
        if (value === cardItmJson.answer ) {
            tempState.answer = true;
            this.setState(tempState);
            
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);

            // turn on sound
            var vid = document.getElementById('record-true');
            vid.play();
        } else {
            // Wrong
            tempState.showHint = true;
            tempState.answerCorrect = cardItmJson.answer
            this.setState(tempState);
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            // let _this = this;
            // setTimeout( () => {
            //     _this.setState({
            //         answer: null,
            //         answerAllready: false,
            //         answerResult: null
            //     });
            // }, 1500);

            // turn on sound
            var vid = document.getElementById('record-false');
            vid.play();
        }
    }

    render() {
        const {cardItmData} = this.props;
        const {answer, answerResult, answerCorrect} = this.state;

        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                    <div className="saudio-word">

                        {/* 1.Question */}

                        {/* has sentence */}
                        {(cardItmData.json.sentence !== ""
                                && cardItmData.json.image === "") 
                                && <div className="saudio-sent text-center aud-play">
                            <div className="ssent-ct no-float">
                                <div className="sent" dangerouslySetInnerHTML={{__html: cardItmData.json.sentence}}></div>
                            </div>
                        </div>}

                        {/* has image */}
                        {(cardItmData.json.sentence === ""
                        && cardItmData.json.image !== "") 
                        && <div className="saudio-img">
                            <img src={cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>
                        </div>}

                        {/* 2. Show answer wrong */}
                        {answerResult !== null 
                        && answer === false
                        && <div className="answer_wrong_txt bt10">
                            {/* <p>Your first answer is "{answerResult}". It's wrong.</p> */}
                            <p className="answer_correct">
                                Answer Correctly: 
                                <span>{cardItmData.json.answer}</span>
                            </p>
                        </div>}

                        {/* 3. Answer Options */}
                        <div className="step-choices">
                            {/* options typeof array */}
                            {cardItmData.json.options !== null
                            && typeof cardItmData.json.options !== 'string'
                            && cardItmData.json.options.map((item, idx) => {
                                return(
                                    <div key={idx+1}
                                    onClick={e => this.chooseAnswer(item)}
                                    className={"step-choice fullwidth "
                                            + ( (item === answerResult && answer === true || answer === false && item === answerCorrect) ? 'true' : '')
                                            + ( (item === answerResult && answer === false) ? 'wrong' : '')
                                    }>
                                        {(item === answerResult && answer === true || answer === false && item === answerCorrect) 
                                            && <i className="fa fa-check"></i>}
                                        {item === answerResult &&
                                        answer === false &&
                                            <i className="fa fa-times"></i>}
                                        {item}
                                    </div>
                                )
                            })}

                            {/* options typeof string */}
                            {cardItmData.json.options !== null
                            && typeof cardItmData.json.options === 'string'
                            && JSON.parse(cardItmData.json.options).map((item, idx) => {
                                return(
                                    <div key={idx+1}
                                    onClick={e => this.chooseAnswer(item)}
                                    className={"step-choice "
                                            + ( (item === answerResult && answer === true) ? 'true' : '')
                                            + ( (item === answerResult && answer === false) ? 'wrong' : '')
                                    }>
                                        {item === answerResult &&
                                        answer === true &&
                                            <i className="fa fa-check"></i>}
                                        {item === answerResult &&
                                        answer === false &&
                                            <i className="fa fa-times"></i>}
                                        {item}
                                    </div>
                                )
                            })}

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
                        </div>
                    </div>
            </div>
        );
    }
}

export default withStyles(s)(ExChooseCorrectAnswer)