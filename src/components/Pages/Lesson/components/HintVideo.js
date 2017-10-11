import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';

// import component
import VideoPlayer from './VideoPlayer.js'
import AudioPlayer from './AudioPlayer.js';

class HintVideo extends React.Component {
    state = {
        hideHint: false
    }

    constructor(props) {
        super(props)
    }

    // fucntion click show video & reset answer
    clickShowHint() {
        if(this.state.hideHint == false) {
            this.setState({
                hideHint: true
            });
        } else {
            this.setState({
                hideHint: false
            });
        }

    }

    render() {
        const { timeVideo, srcVideo, hasVideo, cardItmData} = this.props;
        const {hideHint} = this.state;

        return (
            <div>
                <div className={s.hideHint}>
                    {/* onClick getHint*/}
                    <span
                    onClick={e => this.clickShowHint()}
                    className={s.hintTitle}>
                        {hideHint === false ? 'Click here to get hint' : 'Hide Hint'}
                    </span>

                    <i className={"fa " + s.hintIcon + ' '
                                + (hideHint === false ? 'fa-angle-down ' : '')
                                + (hideHint === true ? 'fa-angle-up ' : '')}></i>
                </div>
                
                {/* Suggest Answer */}
                {hideHint === true
                && <div className={s.hintAnswer}>
                    <div className="guide_txt_mb">Click play to listen</div>
                    {/* video player */}
                    {hasVideo === true
                    && <div>
                        <div className="saudio-img">
                            <VideoPlayer
                            videoId={'hint-video-player-' + cardItmData.id}
                            timeVideo={timeVideo}
                            poster="/images/poster.jpg"
                            srcVideo={srcVideo}/>
                        </div>
                        <div 
                        id={'hint-video-player-' + cardItmData.id}
                        className="hint-box sword-ct vd-play">
                            <span className="saudio-play play"></span>
                            <span className="saudio-play stop"></span>
                        </div>
                    </div>}

                    {/* audio player */}
                    {hasVideo === false
                    && <div>
                        <div className="saudio-img">
                            <img src='/images/poster.jpg' alt=""/>
                            <AudioPlayer
                            audioId={'hint-audio-player-' + cardItmData.id}
                            timeVideo={timeVideo}
                            srcVideo={srcVideo}/>
                        </div>
                        <div 
                        id={'hint-audio-player-' + cardItmData.id}
                        className={"aud-play hint-box " + s.lword}>
                            {/* icons */}
                            <span className="saudio-play f-l play"></span>
                            <span className="saudio-play f-l stop"></span>

                            {/* words */}
                            <div className={"sword-ct " + s.new_word}></div>
                        </div>
                    </div>}
                </div>}
            </div>
        );
  }
}

export default withStyles(s)(HintVideo);
