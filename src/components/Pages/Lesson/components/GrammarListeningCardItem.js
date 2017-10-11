import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import * as rsActions from '../../../../actions/result';

// import component
import AudioPlayer from './AudioPlayer.js';

class GrammarListeningCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };
    state = {
        showMean: false
    }

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    // show vietnamese
    clickShowMean() {
        this.setState({showMean: true});
    }

    render() {
        const {cardItmData} = this.props;
        const {showMean} = this.state;

        return(
            <div className="step-content lesson-grammar">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                <div className="saudio-word">

                    {/* 1. Audio */}
                    <div className="saudio-img">
                        <div className={"sword-ct " + s.new_word}>
                            <div className={s.wordmeans}>
                                <div className="sent" dangerouslySetInnerHTML={{__html: cardItmData.json.grammar}}></div>
                                <div dangerouslySetInnerHTML={{__html: cardItmData.json.description}}></div>
                            </div>
                        </div>
                        {(cardItmData.json.audio !== '') &&
                        <AudioPlayer
                        audioId={'audio-player-' + cardItmData.id}
                        hideVideo={() => this.hideVideo()}
                        srcVideo={cardItmData.json.audio}/>
                        }
                    </div>
                    <div 
                    id={'audio-player-' + cardItmData.id}
                    className={"aud-play " + s.lword}>
                        {/* icons */}
                        {(cardItmData.json.audio !== "") &&
                        <span
                        className="saudio-play f-l play"></span>
                        }
                        {(cardItmData.json.audio !== "") &&
                        <span
                        className="saudio-play f-l stop"></span>
                        }

                        {/* words */}
                        <div className={"sword-ct " + s.new_word}>
                            <div className={s.wordmeans}>
                                <div className="sent" 
                                dangerouslySetInnerHTML={{__html: cardItmData.json.sentence}}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(GrammarListeningCardItem)