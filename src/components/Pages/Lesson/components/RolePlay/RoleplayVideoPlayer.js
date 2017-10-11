import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import videojs from 'video.js'

// import helper
import {isMobile} from '../../../../../helper/IsMobile';
import Auth from '../../../../../routes/modules/Auth';

class RoleplayVideoPlayer extends React.Component {
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
                // this.player.endTime = nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end ? nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end : (this.player.duration() + 3) ;
                this.player.endTime = nextProps.sentencesList[nextProps.sentencesList.length - 1].time_end;
            
                this.player.newSentencesList = nextProps.sentencesList;
                this.player.newIndex = 0;

                // if last item has time_end = 0 => stop
                if(this.player.endTime !== 0) {
                    this.player.currentTime(time_start);
                    this.player.play();
                } 

                if(this.player.endTime === 0 
                && this.props.userSpeaker !== nextProps.sentencesList[senIdx].speaker){
                    this.player.currentTime(time_start);
                    this.player.play();
                }

                
                // mute off if user = userSpeaker
                let _thisComp = this.props;
                if(this.props.userSpeaker === nextProps.sentencesList[senIdx].speaker) {
                    this.player.volume(0);
                    if(this.player.endTime === 0) {
                        _thisComp.onStartPlay(0);
                        // autoplay record
                        _thisComp.autoPlayRecord();
                    }
                } else {
                    this.player.volume(1);
                    if(this.player.endTime === 0) {
                        _thisComp.onStartPlay(0);
                        
                        setTimeout(function() {
                            if(_thisComp.endStep) {
                                _thisComp.endStep();
                            }
                        }, 100);
                    }
                }
                // change icon
                $('#' + this.props.audioId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + this.props.audioId + '.vd-play .saudio-play.stop').css('display', 'inline-block');

                // icon pause for role 2
                if($('#' + this.props.audioId + '.vd-play .saudio-play.pause').length) {
                    $('#' + this.props.audioId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            } else {
                // data cho step Tong Ket
                let senIdx   = 0;

                let time_start = this.props.originalData[senIdx].time_start;
                // this.player.endTime = this.props.originalData[this.props.originalData.length - 1].time_end ? this.props.originalData[this.props.originalData.length - 1].time_end : this.player.duration();
                this.player.endTime = this.props.originalData[this.props.originalData.length - 1].time_end;
            
                this.player.newSentencesList = this.props.originalData;
                this.player.newIndex = 0;
                this.player.lastRecord = true;

                // start time
                this.player.currentTime(time_start);
                this.player.play();

                if(this.props.userSpeaker === this.props.originalData[senIdx].speaker) {
                    this.player.volume(0);
                } else {
                    this.player.volume(1);
                }
                // console.log('newSentencesList', this.player.newSentencesList)

                // start record
                this.player.startRecord = true;
                
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
                        autoplay: true,
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

            // mute off if user = userSpeaker
            if(_thisComp.userSpeaker === _thisComp.sentencesList[this.senIdx].speaker) {
                this.volume(0);
            } else {
                this.volume(1);
            }


            // * Watch Duration of Media Playing.
            this.on('timeupdate', function() {
                
                if(this.endTime === 0 
                && this.newSentencesList === null 
                && this.lastRecord === false) {
                    // console.log('Chay 0', this.senIdx );
                    // console.log('length',  _thisComp.userSpeaker);
                    
                    if (this.senIdx <  _thisComp.sentencesList.length) {
                        //Stop when go to next sen
                        if(this.currentTime() >= (_thisComp.sentencesList[this.senIdx].time_start - 0.55)) {
                            if(_thisComp.userSpeaker === _thisComp.sentencesList[this.senIdx].speaker) {
                                this.volume(0);

                                // pause when user speaker
                                this.pause();
                                // this.currentTime(_thisComp.sentencesList[this.senIdx].time_end - 0.9);

                                // autoplay record
                                _thisComp.autoPlayRecord();
                            } else {
                                this.volume(1);
                            }
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
                                if(_thisComp.endStep) {
                                    _thisComp.endStep();
                                }
                            }, 0);
                        }
                    }
                    
                    return;
                }

                // next Item
                if(this.newSentencesList !== null 
                && this.currentTime() >= this.newSentencesList[0].time_start
                //&& this.currentTime() <= this.endTime
                && this.lastRecord === false
                ) {

                    if (this.newIndex <  this.newSentencesList.length) {
                        //Stop when go to next sen
                        if(this.currentTime() >= (this.newSentencesList[this.newIndex].time_start - 0.55)) {
                            if(_thisComp.userSpeaker === this.newSentencesList[this.newIndex].speaker) {
                                this.volume(0);

                                // pause when user speaker
                                this.pause();

                                // autoplay record
                                _thisComp.autoPlayRecord();                                

                            } else {
                                this.volume(1);
                            }
                            
                            _thisComp.onStartPlay(this.newIndex);
                            this.newIndex++;
                        }
                    } else { 
                        // tat audio theo tung doan data
                        //Stop when go to last item
                        if(this.endTime !== 0) {
                            if(this.currentTime() >= (this.newSentencesList[this.newSentencesList.length - 1].time_end - 0.55 )) {
                                // let _timeout = (this.newSentencesList[this.newSentencesList.length - 1].time_end  - this.currentTime())*1000 - 50;

                                let _thisPlayer = this;
                            
                                // setTimeout(() => {
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

                                    if(this.newSentencesList[this.newSentencesList.length - 1].time_end !== 0) {
                                        setTimeout(function() {
                                            if(_thisComp.endStep) {
                                                _thisComp.endStep();
                                            }
                                        }, 100);
                                    }
                                    
                                // }, _timeout);
                            }
                        }
                    }
                }

                // last Item (step Tong Ket)
                if(this.newSentencesList !== null 
                && this.currentTime() >= this.newSentencesList[0].time_start
                //&& this.currentTime() <= this.endTime
                && this.lastRecord === true
                ) {
                    if (this.newIndex <  this.newSentencesList.length) {
                        //Stop when go to next sen
                        if(this.currentTime() >= (this.newSentencesList[this.newIndex].time_start - 0.55)) {
                            if(_thisComp.userSpeaker === this.newSentencesList[this.newIndex].speaker) {
                                this.volume(0);

                                // pause when user speaker
                                this.pause();

                                // autoplay record
                                _thisComp.autoPlayRecord();                                

                                // step Tong Ket
                                if(this.startRecord === true) {

                                    let _timeout  = (_thisComp.dataSentence[this.newIndex][1] && _thisComp.dataSentence[this.newIndex][1].stopTime && _thisComp.dataSentence[this.newIndex][1].startTime) ? _thisComp.dataSentence[this.newIndex][1].stopTime - _thisComp.dataSentence[this.newIndex][1].startTime : 100; 
                                    let _this = this;
                                    setTimeout(function() {
                                        _this.play();
                                        _thisComp.startAudioRecord();
                                    }, _timeout);

                                } 
                            } else {
                                this.volume(1);
                            }
                            
                            _thisComp.onStartPlay(this.newIndex);
                            this.newIndex++;
                        }
                    } 
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
                        $('#' + _thisComp.audioId + '.vd-play .saudio-play.stop').css('display', 'none');
                        $('#' + _thisComp.audioId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                        // icon pause for role 2
                        if($('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').length) {
                            $('#' + _thisComp.audioId + '.vd-play .saudio-play.pause').css('display', 'none');
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
                // mute off if user = userSpeaker
                if(_thisComp.userSpeaker === _this.newSentencesList[_this.newIndex].speaker) {
                    _this.volume(0);
                } else {
                    _this.volume(1);
                }
                
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'inline-block');
                }
            });
            // click stop
            $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').on('click', function(e) {
                // _this.senIdx = 0;
                // _this.endTime = 0;
                // _this.currentTime(0);
                _this.pause();
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');
                // icon pause for role 2
                if($('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').length) {
                    $('#' + _thisComp.videoId + '.vd-play .saudio-play.pause').css('display', 'none');
                }
                // _thisComp.resetStatus();
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
                _this.newIndex = 0;
                _this.endTime = 0;
                _this.currentTime(0);
                _this.pause();
                // change icon
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.stop').css('display', 'none');
                $('#' + _thisComp.videoId + '.vd-play .saudio-play.play').css('display', 'inline-block');

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

export default withStyles(s)(RoleplayVideoPlayer);
