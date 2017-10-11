import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import videojs from 'video.js'

// import helper
import {isMobile} from '../../../../helper/IsMobile';

class AudioPlayer extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.audioInit();
    }

    audioInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = videojs(this.nodePlayer, {
                            autoplay: true,
                            controls: true,
                            sources: [{
                                src: this.props.srcVideo,
                                type: 'audio/mp3'
                            }]
                        }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile

            if(isMobile.any()) {
                setTimeout(() => {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').click();
                }, 200);
            }

            // set start and end video
            if(_thisComp.timeVideo) {
                let timeVideo =  _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function() {

                    if(this.currentTime() >= (timeVideo[1] - 0.5)) {
                        let _timeout    = (timeVideo[1] - this.currentTime())*1000 - 50;
                        let _thisPlayer = this;
                        
                        setTimeout(() => {
                            _thisPlayer.currentTime(timeVideo[0]);
                            _thisPlayer.pause();

                            // change icon
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        }, _timeout);

                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function(e) {
                _this.play();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            });
            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function(e) {
                _this.pause();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
            });

            //finished video
            this.on('ended', function() {

                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if(_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });
    }
    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    render() {
        return (
            <div data-vjs-player>
                <audio  ref={ n => this.nodePlayer = n} className="video-js vjs-default-skin audio-js"></audio>
            </div>
        );
    }
}

export default withStyles(s)(AudioPlayer);
