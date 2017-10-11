import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import * as rsActions from '../../../../actions/result';

// import component
import AudioPlayer from './AudioPlayer.js';

class WordOnlyCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };
    state = {
        showMean: false
    }
    constructor(props) {
        super(props)
    }
    // show vietnamese
    clickShowMean() { 
        this.setState({showMean: true});
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();

        // show vietnamese when level = Beginner
        if(this.props.level === 'B') {
            this.setState({showMean: true});
        }
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }
    render() {
        const {cardItmData} = this.props;
        const {showMean} = this.state;
        
        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                <div className="saudio-word">

                    {/* 1. Audio */}
                    <div className="saudio-img">
                        <img src={cardItmData.json.example_image} alt=""/>
                        {cardItmData.json.example_audio !== '' 
                        && <AudioPlayer
                        audioId={'audio-player-' + cardItmData.id}
                        hideVideo={() => this.hideVideo()}
                        srcVideo={cardItmData.json.example_audio}/>}
                    </div>
                    <div 
                    id={'audio-player-' + cardItmData.id}
                    className={"aud-play " + s.lword}>
                        {/* icons */}
                        <span
                        className="saudio-play f-l play"></span>
                        <span
                        className="saudio-play f-l stop"></span>

                        {/* words */}
                        <div className={"sword-ct " + s.new_word}>
                            <div className={s.wordmeans}
                            onClick={e => this.clickShowMean()}>
                                <div className="sent">{cardItmData.json.example}</div>
                            </div>
                            {showMean === true 
                            && cardItmData.json.example_vi !== 'đang cập nhật'
                            && <div className="pron">{cardItmData.json.example_vi}</div>}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(WordOnlyCardItem)