import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import videojs from 'video.js'

// import helper
import {isMobile} from '../../../../../helper/IsMobile';

class RoleplayAudioPlayer extends React.Component {
    constructor(props) {
        super(props);

    }

    componentDidMount() {
        this.audioInit();
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.playerTime && nextProps.playerTime !== null) {

            if(nextProps.stopVideo !== true) {
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end: this.player.duration() ;
                console.log('endTime', this.player.endTime );
                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
                $('#' + this.props.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
            }
        }
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

            // end time
            this.endTime = 0;
            this.senIdx   = 0;

            // * Watch Duration of Media Playing.
            this.on('timeupdate', function() {
                //console.log('this.currentTime()', this.currentTime());
                if(this.endTime === 0 ) {
                    //console.log('Chay 0', this.senIdx );
                    if (this.senIdx <  _thisComp.sentencesList.length) {

                        //Stop when go to next sen
                        if(this.currentTime() >= (_thisComp.sentencesList[this.senIdx].time_start - 0.55)) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    }
                    return;
                }

                if(this.currentTime() >= (this.endTime - 0.55)) {
                    let _this = this;
                    let _timeout = (this.endTime  - this.currentTime())*1000 - 55;

                    setTimeout(function() {
                        _this.pause();
                        _this.endTime = 0;
                        _this.senIdx = 0;
                        _this.currentTime(0);
    
                        // change icon
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
    
                        // icon pause for role 2
                        if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        }
    
                        setTimeout(function() {
                            if(_thisComp.resetStatus) {
                                _thisComp.resetStatus();
                            }
                        }, 0);
                    }, _timeout);
                }
            });

            // set start and end video
            if(_thisComp.timeVideo) {
                let timeVideo =  _thisComp.timeVideo;

                // start time
                this.currentTime(timeVideo[0]);

                // end time
                this.on('timeupdate', function() {
                    if(this.currentTime() > timeVideo[1]) {
                        this.pause();

                        // change icon
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').on('click', function(e) {
                //this.currentTime(0);
                _this.play();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').on('click', function(e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }
                setTimeout(function() {
                    _thisComp.resetStatus();
                }, 100);
            });

            // click pause
            if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').on('click', function(e) {

                    _this.pause();
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function() {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.audioId + '.aud-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').length) {
                    $('#' + _thisComp.audioId + '.aud-play .saudio-play.pause').css('display', 'none');
                }

                // update props
                setTimeout(function() {
                    if(_thisComp.hideVideo) {
                        _thisComp.hideVideo();
                    }
                }, 100);
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

export default withStyles(s)(RoleplayAudioPlayer);
