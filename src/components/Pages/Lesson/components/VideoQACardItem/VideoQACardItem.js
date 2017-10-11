import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoQACardItem.css';
import Link from '../../../../Link';
import * as rsActions from '../../../../../actions/result';

// import component
import AudioPlayer from '../AudioPlayer.js';
import HintVideo from '../HintVideo';

class VideoQACardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };


    state = {
        answer: null,
        answerAllready: false,
        answerResult: null,

        showHint: false
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
            showHint: false
        };

        // it's Right
        if (value === cardItmJson.answer ) {
            tempState.answer = true;
            this.setState(tempState);
            // show button next
            $('.step-pane .ldtail-next').show();
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            // Wrong
            tempState.showHint = true;
            this.setState(tempState);
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
            // Wait 150ms
            // reset State.
            let _this = this;
            setTimeout( () => {
                _this.setState({
                    answer: null,
                    answerAllready: false,
                    answerResult: null
                });
            }, 1500);
        }
    }

    render() {
        const {cardItmData} = this.props;
        const { answer, answerResult, showHint} = this.state;

        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                    <div className="saudio-word">

                        {/* 1. Audio Question */}
                        {(cardItmData.json.audio_question !== '') &&
                        <div className="saudio-img">
                            {cardItmData.json.audio_question !== '' 
                            && <AudioPlayer
                            audioId={'audio-player-' + cardItmData.id}
                            srcVideo={cardItmData.json.audio_question}/>}
                        </div>
                        }
                        <div 
                        id={'audio-player-' + cardItmData.id}
                        className="saudio-sent aud-play">

                            {/* icons */}
                            {(cardItmData.json.audio_question !== '') &&
                            <span
                            className="saudio-play f-l play"></span>
                            }
                            {(cardItmData.json.audio_question !== '') &&
                            <span
                            className="saudio-play f-l stop"></span>
                            }

                            {/* question */}
                            <div className="ssent-ct">
                                <div className="sent"
                                dangerouslySetInnerHTML={{__html: cardItmData.json.question}}></div>
                            </div>
                        </div>

                        {/* 2. Get Hint */}
                        {(showHint === true && cardItmData.json.video)
                        && <HintVideo
                        cardItmData={cardItmData}
                        timeVideo={cardItmData.json.time}
                        hasVideo={cardItmData.json.video ? true : false}
                        srcVideo={cardItmData.json.video ? cardItmData.json.video : cardItmData.json.audio}/>}

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
                        </div>


                    </div>
            </div>
        );
    }
}

export default withStyles(s)(VideoQACardItem);