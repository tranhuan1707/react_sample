import React from 'react';
import s from '../Card_Item/Card_Item.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ReactMic } from 'react-mic';
// import component
import AudioPlayer from './AudioPlayer.js';
import * as rsActions from '../../../../actions/result';

// import helper
import {isMobile} from '../../../../helper/IsMobile';

class AudioRecord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioPlayer: false,
      enableSound: null
    }

  }

  startRecording = () => {
    // // show button next
    // $('.step-pane .ldtail-next').show();

    // turn on sound
    this.setState(
      {
        enableSound: true
      },
      () => {
        if(isMobile.any()) {
          var vid = document.getElementById('record-audio');
          vid.play();
        }
      }
    );
    
    let _this = this;
    setTimeout(function() {
      if(_this.state.record === false) {
        _this.setState({
          record: true,
          audioPlayer: false
        });
      } else {
        _this.setState({
          record: false,
          audioPlayer: true
        });
      }
    }, 800);
  }

  onStop(blobObject) {
    
    rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);

    // show button next
    $('.step-pane .ldtail-next').show();
    
    this.setState({
      blobURL : blobObject.blobURL,
      enableSound: false
    },
    () => {
      if(isMobile.any()) {
        var vid_wrong = document.getElementById('record-audio-wrong');
        vid_wrong.play();
      }
    }
    )
  }

  onStartR() {
      console.log('start');
  }

  render() {
    const {record, audioPlayer} = this.state;

    return (
      <div className="text-center">

        {/* 1. Audio Repeat */}
        {audioPlayer
        && <div>
            <h3 className={s.record_repeat_title}>Listen your voice</h3>
            <audio className="audioRecord" ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
        </div>}

        {/* 2. Audio Record */}
          <h3 className={s.audrecord_title}>
            {record === false ? 'Listen then click to record!' : 'Use your microphone to record.'}
          </h3>
          <span
          onClick={this.startRecording}
          className={'record_phone ' + (record === true ? ' recording' : '')}>
              <i className={"fa " + (record === false ? 'fa-microphone' : 'fa-stop')}></i>
          </span>

        <ReactMic
          record={this.state.record}
          className="sound-wave"
          onStop={this.onStop.bind(this)}
          onStart={this.onStartR.bind(this)}
          strokeColor="#000000"
          backgroundColor="#FF4081" />

        {/* 2. Audio Sound */}

        {/* fail sound */}
        {this.state.enableSound === false
        && <audio key={'audio-wrong'} 
        autoPlay 
        id="record-audio-wrong"
        ref="audioRecord" 
        controls="controls" 
        className="hidden"
        src={'/uploads/audio/record.mp3'}></audio>}

        {/* correct sound */}
        {this.state.enableSound === true
        && <audio key={'audio-true'} 
        id="record-audio"
        autoPlay 
        ref="audioRecord" 
        controls="controls" 
        className="hidden"
        src={'/uploads/audio/record.mp3'}></audio>}
      </div>
    );
  }
}

export default withStyles(s)(AudioRecord);