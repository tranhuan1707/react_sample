import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './VideoCardItem.css';
import Link from '../../../../Link';
import * as rsActions from '../../../../../actions/result';

// import component
import VideoPlayer from '../VideoPlayer.js'
import AudioPlayer from '../AudioPlayer.js';

class VideoCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };


    constructor(props) {
        super(props);
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

    render() {
        const {cardItmData} = this.props;
        return(
            <div className={"step-content "
                    + ((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '')? 'has-video ' : '')}>
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                    <div className="saudio-word">
                        <div className="saudio-img">

                            {/* video player */}
                            {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                            || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                            && <VideoPlayer
                            videoId={'video-player-' + cardItmData.id}
                            hideVideo={() => this.hideVideo()}
                            poster="/images/poster.jpg"
                            srcVideo={cardItmData.json.video}/>}

                            {/* audio player */}
                            {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <img src={cardItmData.json.image ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>}
                            {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <AudioPlayer
                            audioId={'audio-player-' + cardItmData.id}
                            hideVideo={() => this.hideVideo()}
                            srcVideo={cardItmData.json.audio}/>}

                        </div>

                        {/* video player */}
                        {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                        && <div
                        id={'video-player-' + cardItmData.id}
                        className="sword-ct vd-play">
                            <span className="saudio-play play"></span>
                            <span className="saudio-play stop"></span>
                            {/*<div className="word">man</div>
                            <div className="pron">man</div>*/}
                        </div>}

                        {/* audio player */}
                        {cardItmData.json.video === ''
                        && cardItmData.json.audio !== ''
                        && <div
                        id={'audio-player-' + cardItmData.id}
                        className={"aud-play " + s.lword}>
                            {/* icons */}
                            <span
                            className="saudio-play f-l play"></span>
                            <span
                            className="saudio-play f-l stop"></span>

                            {/* words */}
                            <div className={"sword-ct " + s.new_word}>
                            </div>
                        </div>}
                    </div>
            </div>
        );
    }
}

export default withStyles(s)(VideoCardItem);