import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import videojs from 'video.js'

// import helper
import {isMobile} from '../../../../../helper/IsMobile';
import Auth from '../../../../../routes/modules/Auth';

class VideoNoAutoplay extends React.Component {
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
                let time_start = nextProps.playerTime.time_start;
                this.player.endTime = nextProps.playerTime.time_end ? nextProps.playerTime.time_end: this.player.duration() ;
                //console.log('time_start', time_start);
                // start time
                this.player.currentTime(time_start);
                this.player.play();

                // change icon
                $('#' + this.props.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
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


            // * Watch Duration of Media Playing.
            this.on('timeupdate', function() {
                //console.log('this.currentTime()', this.currentTime());
                if(this.endTime === 0 ) {
                    //console.log('Chay 0', this.senIdx );
                    if (this.senIdx <  _thisComp.sentencesList.length) {

                        // if(this.senIdx > (_thisComp.countSentence + 1)) {
                        //     this.pause();
                        //     this.endTime = 0;
                        //     this.senIdx = 0;
                        //     this.currentTime(0);

                        //     $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                        //     // icon pause for role 2
                        //     if($('#' + _thisComp.videoId + '.aud-play .saudio-play.pause').length) {
                        //         $('#' + _thisComp.videoId + '.aud-play .saudio-play.pause').css('display', 'none');
                        //     }

                        //     if(_thisComp.hideVideo) {
                        //         _thisComp.hideVideo();
                        //     }

                        //     return;
                        // }

                        //Stop when go to next sen
                        if(this.currentTime() >= (_thisComp.sentencesList[this.senIdx].time_start - 0.55)) {
                            _thisComp.onStartPlay(this.senIdx);
                            this.senIdx++;
                        }
                    }
                    return;
                }

                if(this.currentTime() >= this.endTime) {
                    this.pause();
                    this.endTime = 0;
                    this.senIdx = 0;
                    this.currentTime(0);

                    // change icon
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

                    // icon pause for role 2
                    if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                    }

                    setTimeout(function() {
                        if(_thisComp.resetStatus) {
                            _thisComp.resetStatus();
                        }
                    }, 100);
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
                        $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if($('#' + _thisComp.videoId + '.aud-play .saudio-play.pause').length) {
                            $('#' + _thisComp.videoId + '.aud-play .saudio-play.pause').css('display', 'none');
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
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                // update props
                setTimeout(function() {
                    if(_thisComp.hideVideo) {
                        _thisComp.hideVideo();
                    }
                }, 100);
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

export default withStyles(s)(VideoNoAutoplay);
