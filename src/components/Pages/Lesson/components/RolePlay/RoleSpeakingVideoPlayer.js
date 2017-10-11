import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import videojs from 'video.js'

// import helper
import {isMobile} from '../../../../../helper/IsMobile';
import Auth from '../../../../../routes/modules/Auth';

class RoleSpeakingVideoPlayer extends React.Component {
    constructor(props) {
        super(props)
    }
    componentDidMount() {
        this.videoInit();
    }

    // destroy player on unmount
    componentWillUnmount() {
        if (this.player) {
            this.player.dispose()
        }
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.playerTime && nextProps.playerTime !== null) {
            
            if(nextProps.stopVideo !== true) {
                // console.log('nextProps.playerTime', nextProps.playerTime);
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end: this.player.duration() ;
                
                // start time
                this.player.currentTime(time_start);
                this.player.play();
                this.player.volume(1);

                // change icon
                $('#' + this.props.audioId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.vd-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if($('#' + this.props.audioId + '.vd-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            }
        }

        // get next item
        if(nextProps.sentencesList !== this.props.sentencesList) {
            if(nextProps.sentencesList !== undefined) {
                let senIdx   = 0;

                let time_start = nextProps.sentencesList[senIdx].time_start;
                this.player.endTime = nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end ? nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end: this.player.duration() ;
            
                this.player.newSentencesList = nextProps.sentencesList;
                this.player.newIndex = 0;

                // start time
                this.player.currentTime(time_start);
                // this.player.play();

                // change icon
                $('#' + this.props.audioId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.vd-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if($('#' + this.props.audioId + '.vd-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            }
        }
    }

    videoInit() {
        // instantiate video.js
        let _thisComp = this.props;

        this.player = videojs(this.videoNode, {
                        autoplay: false,
                        controls: true,
                        sources: [{
                            src: this.props.srcVideo + '&access_token=' + Auth.getToken(),
                            type: 'video/mp4'
                        }]
                    }, function onPlayerReady() {
            // console.log('onPlayerReady', this)

            // autoplay on mobile
            if(isMobile.any()) {
                setTimeout(() => {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').click();
                }, 200);
            }

            // end time
            this.endTime = 0;
            this.senIdx   = 0;
            this.newSentencesList = null;
            this.newIndex = 0;
            this.startRecord = false;
            this.lastRecord = false;


            // * Watch Duration of Media Playing.
            this.on('timeupdate', function() {
                if(this.endTime === 0 ) {
                    // console.log('Chay 0', this.senIdx );
                    // console.log('length',  _thisComp.userSpeaker);
                    
                    if (this.senIdx <  _thisComp.sentencesList.length) {
                        //Stop when go to next sen
                        if(this.currentTime() >= (_thisComp.sentencesList[this.senIdx].time_start - 0.55)) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    } else {
                        // tat audio theo tung doan data
                        
                        //Stop when go to last item
                        if(this.currentTime() >= (_thisComp.sentencesList[_thisComp.sentencesList.length - 1].time_end - 0.55)) {
                            this.pause();

                            // this.endTime = 0;
                            this.senIdx = 0;
                            this.currentTime(_thisComp.sentencesList[this.senIdx].time_start);
                            
                            $('#' + _thisComp.audioId + '.vd-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                            // icon pause for role 2
                            if($('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').length) {
                                $('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').css('display', 'none');
                            }
                            setTimeout(function() {
                                if(_thisComp.hideVideo) {
                                    _thisComp.hideVideo();
                                }
                            }, 0);
                        }
                    }
                    return;
                }

                // next Item
                if(this.newSentencesList !== null 
                    && this.currentTime() >= this.newSentencesList[0].time_start
                    && this.currentTime() <= this.endTime) {
                        if (this.newIndex <  this.newSentencesList.length) {
    
                            //Stop when go to next sen
                            if(this.currentTime() >= (this.newSentencesList[this.newIndex].time_start - 0.55)) {
                                
                                _thisComp.onStartPlay(this.newIndex);
                                this.newIndex++;
                            }
                        } else {
                            // tat audio theo tung doan data
                            //Stop when go to last item
                            if(this.currentTime() >= (this.newSentencesList[this.newSentencesList.length - 1].time_end - 0.55 )) {
                                let _timeout = (this.newSentencesList[this.newSentencesList.length - 1].time_end  - this.currentTime())*1000 - 50;
                                let _thisPlayer = this;
                            
                                setTimeout(() => {
                                    _thisPlayer.pause();
    
                                    // reset startRecord
                                    _thisPlayer.startRecord = false;
    
                                    _thisPlayer.newIndex = 0;
                                    _thisPlayer.currentTime(_thisPlayer.newSentencesList[_thisPlayer.newIndex].time_start);
    
                                    $('#' + _thisComp.audioId + '.vd-play .saudio-play.stop').css('display', 'none');
                                    $('#' + _thisComp.audioId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                                    // icon pause for role 2
                                    if($('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').length) {
                                        $('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').css('display', 'none');
                                    }
    
                                    setTimeout(function() {
                                        if(_thisComp.hideVideo) {
                                            _thisComp.hideVideo();
                                        }
                                    }, 0);
                                }, _timeout);
                            }
                        }
                    }

                    if(this.currentTime() >= this.endTime) {
                        let _timeout    = (this.time_end  - this.currentTime())*1000 - 50;
                        let _thisPlayer = this;
    
                        setTimeout(() => {
                            _thisPlayer.pause();
                            this.endTime = 0;
                            this.senIdx = 0;
                            _thisPlayer.currentTime(0);
    
                            // change icon
                            $('#' + _thisComp.audioId + '.vd-play .saudio-play.stop').css('display', 'none');
                            $('#' + _thisComp.audioId + '.vd-play .saudio-play.play').css('display', 'inline-block');
    
                            // icon pause for role 2
                            if($('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').length) {
                                $('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').css('display', 'none');
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

                        // set time
                        this.currentTime(timeVideo[0]);
                        // change icon
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                            $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                        }
                    }
                });
            }

            // change icon
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
            // icon pause for role 2
            if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
            }

            let _this = this;
            // click play
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').on('click', function(e) {
                _this.play();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').on('click', function(e) {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                }
                _thisComp.resetStatus();
            });
            
            // click pause
            if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').on('click', function(e) {
                    _this.pause();

                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                    // icon pause for role 2
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                });
            }

            //finished video
            this.on('ended', function() {
                _this.senIdx = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                // update props
                if(_thisComp.hideVideo) {
                    _thisComp.hideVideo();
                }
            });
        });


    }

    render() {
        const { poster} = this.props;

        return (
            <div data-vjs-player>
                <video poster={poster} ref={ node => this.videoNode = node} className="video-js vjs-default-skin"></video>
            </div>
        );
  }
}

export default withStyles(s)(RoleSpeakingVideoPlayer);
