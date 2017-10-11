import React from 'react';
import s from '../../Card_Item/Card_Item.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { ReactMic } from 'react-mic';

// import helper
import {isMobile} from '../../../../../helper/IsMobile';

class RoleSpeakingRecord extends React.Component {
  state = {
    isMounted: false,
  };
  
  constructor(props) {
    super(props);
    this.state = {
      record: false,
      audioPlayer: false,
      enableSound: null,
    }

  }

  startRecording = () => {
    // show button submit
    $('.submit-button').find('.btn').removeClass('disabled');

      // turn on sound
      // this.setState({enableSound: true});
    

      // if(isMobile.any()) {
      //   var vid = document.getElementById('record-audio');
      //   vid.play();
      // }

      if(this.state.record === false) {
        this.setState({
          record: true,
          audioPlayer: false
        });
      } else {
        this.setState({
          record: false,
          audioPlayer: true
        });

        // this.props.onSaveRecord("");
      }

      // let _timeout = (this.props.time_end - this.props.time_start)*1000;
      // //console.log('_timeout', _timeout);
      // let _this = this;
      // setTimeout(function() {
      //   _this.onStop.bind(_this)

      //   _this.setState({
      //     record: false,
      //     audioPlayer: true,
      //     enableSound: false,
      //     isMounted: true
      //   });
      // }, _timeout + 500);
    
  }

  onStop(blobObject) {
    // console.log('blobObject', blobObject);
      this.setState({
        blobURL : blobObject.blobURL,
        //enableSound: false
      })

      // turn off sound
      // if(isMobile.any()) {
      //   var vid_wrong = document.getElementById('record-audio-wrong');
      //   vid_wrong.play();
      // }

      this.props.onSaveRecord(blobObject.blobURL);
  }

  onStartR() {
      console.log('start');
      
  }

  render() {
      const {record, audioPlayer} = this.state;
      const {id, dataSentence} = this.props;

      return (
      <div className="text-left role_record_wrap clearfix">

          {/* 1. Audio Record */}
          <span 
          onClick={this.startRecording}
          className={s.record_phone + ' ' 
                  + s.role_record_phone 
                  + ' record_phone role_record_phone ' 
                  + (record === true ? s.recording + ' recording' : '')}>
              <i className={"fa " + (record === false ? 'fa-microphone' : 'fa-stop')}></i>
          </span>
          <span className={s.record_txt + ' record_txt'}>Record your own version</span>

          {/* 2. Audio Repeat */}
          {audioPlayer
          && <div className={'result_audio'}>
              {/* <h3 className={s.record_repeat_title}>Nghe lại phát âm của bạn</h3> */}
              <audio key={id}  ref="audioSource" controls="controls" src={this.state.blobURL}></audio>
          </div>}
          
          <ReactMic
          key={id}
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
          ref="audioRecord" 
          id="record-audio-wrong"
          controls="controls" 
          className="hidden"
          src={'/uploads/audio/record.mp3'}></audio>}

          {/* correct sound */}
          {this.state.enableSound === true
          && <audio key={'audio-true'} 
          autoPlay 
          id="record-audio"
          ref="audioRecord" 
          controls="controls" 
          className="hidden"
          src={'/uploads/audio/record.mp3'}></audio>}
      </div>
      );
  }
}

export default withStyles(s)(RoleSpeakingRecord);