import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import * as rsActions from '../../../../actions/result';

// import component
import AudioPlayer from './AudioPlayer.js';

class ExpressionCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };
    state = {
        showTranslate: false
    }

    constructor(props) {
        super(props)
    }
    
    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();

        // show vietnamese when level = Beginner
        if(this.props.level === 'B') {
            this.setState({showTranslate: true});
        }
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    // event show vietnamese
    clickShowVN() {
        this.setState({showTranslate: true})
    }

    render() {
        const {cardItmData} = this.props;
        const {showTranslate} = this.state;

        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                <div className="saudio-word">

                    {/* 1. Audio */}
                    <div className="saudio-img">
                        <img src={cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>
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
                                <div className="sent">
                                    {cardItmData.json.expression}
                                </div>
                            </div>
                            {cardItmData.json.situation
                            && <div className={s.wordmeans + " pron"}
                            onClick={e => this.clickShowVN()}
                            dangerouslySetInnerHTML={{__html: cardItmData.json.situation}}>
                            </div>}

                            {showTranslate === true 
                            && cardItmData.json.vietnamese
                            && cardItmData.json.vietnamese !== ""
                            && <div className="pron">{cardItmData.json.vietnamese}</div>} 
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(ExpressionCardItem)