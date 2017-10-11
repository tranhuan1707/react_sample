import React from 'react';
import update from 'react/lib/update';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import * as rsActions from '../../../../../actions/result';

// import component
import RoleplayVideoPlayer from './RoleplayVideoPlayer.js';
import Role2AudioPlayer from './Role2AudioPlayer.js';
import ExRoleplayRepeat from './ExRoleplayRepeat.js';

class ExRoleplay extends React.Component{
    static propTypes = {
        cardItmData: PropTypes.object,
    };
    state = {
        playerTime: null,
        finshedVideo: false,
        activeUser: null,
        stopVideo: false,
        indexUser: null,
        userSpeaker: null,
        countSentence: 0,
        dataSentence: [],
        arrRecord: [],
        idxRecord: -1,
        playRecord: null,
        autoRecord: null
    }

    constructor(props) {
        super(props)
    }

    // event click icon sound
    listenConversation(time_start, time_end, index) {
        if(this.state.finshedVideo === false) { return; }

        if(time_start) {
            if (!time_end) { time_end = 0; }
            let timeline = {
                time_start: time_start,
                time_end: time_end
            }

            this.setState({
                playerTime: timeline,
                activeUser: index,
                stopVideo: false,
                indexUser: index
            });
            // console.log('timeline', timeline);
        }
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
        // $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
        // get sessionStorage
        let sesSpeaker = sessionStorage.getItem('user_speaker');
        if(sesSpeaker) {
            this.setState({userSpeaker: sesSpeaker})
            this.chooseSpeaker(sesSpeaker);
        }
    }

    // video finsh
    hideVideo() {
        this.setState({finshedVideo: true, idxRecord: -1, stopVideo: true, activeUser: null, endVideo: true})
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);

        // click next item
        // let _this = this;
        // console.log('endTime');
        // setTimeout(function() {
        //     _this.submitAnswer();
        // }, 2000);
    }

    endStep() {
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        this.setState({
            finshedVideo: true, 
            idxRecord: -1, 
            stopVideo: true, 
            activeUser: null
        });

        // click next item
        let _this = this;
        setTimeout(function() {
            _this.submitAnswer();
        }, 2000);
    }

    resetStatus() {
        this.setState({activeUser: null, stopVideo: true});
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {return;}
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');
    }

    // click choose teacher
    chooseSpeaker(user_speaker) {
        const {cardItmData} = this.props;

        let meetRole = 0;
        let newArrSentences = [];
        let subArrInx = 0;

        // Find Speaker
        cardItmData.json.sentences.map((item, idx) => {

            if(item.speaker === user_speaker ) {
                newArrSentences.push([item]);
                subArrInx = 0;
            } else {
                if(subArrInx === 0) {
                    newArrSentences.push([item]);
                } else {
                    newArrSentences[newArrSentences.length-1].push(item);
                }
                subArrInx++;
            }

        });
        //console.log('A', newArrSentences);
        this.setState({userSpeaker: user_speaker, dataSentence: newArrSentences});
    }

    // save url record
    saveRecord(objRecord) {
        // show button submit
        $('.submit-button').find('.btn').removeClass('disabled');
        this.state.arrRecord.push(objRecord.blobURL);

        // push to new array (array da chia nho user)
        this.state.dataSentence[this.state.countSentence].push(objRecord);
        // click next item
        let _this = this;
        setTimeout(function() {
            _this.submitAnswer();
        }, 2000);

        // setState reset autoplay record
        this.setState({autoRecord: false});
    }

    // autoplay record
    autoPlayRecord() {
        this.setState({autoRecord: true});
    }

    // resetAutoPlayRecord() {
    //     console.log("resetAutoPlayRecord");
    //     this.setState({autoRecord: false});
    // }

    submitAnswer() {
        // disabled button submit
        $('.submit-button').find('.btn').addClass('disabled');
        this.setState({
            countSentence: (this.state.countSentence + 1)
        })

        if((this.state.countSentence + 1) > this.state.dataSentence.length) {
            // show button next
            $('.step-pane .ldtail-next').show();
        }
    }

    // start recording
    startAudioRecord() {
        this.setState({idxRecord: (this.state.idxRecord + 1)});
    }

    render() {
        const {cardItmData} = this.props;
        const {playerTime, finshedVideo,
            activeUser, stopVideo,
            userSpeaker, indexUser,
            countSentence, dataSentence, playRecord,
            autoRecord, endVideo} = this.state;

        return(
            <div>
                {/* audio record*/}
                <audio key={'record-audio-1'}
                autoPlay
                ref="audioRecord"
                controls="controls"
                className="hidden"
                id="audioRecord"
                src={this.state.arrRecord[this.state.idxRecord]}></audio>

                {/* Avatar */}
                {userSpeaker === null && <div className={s.teacher_wrap}>
                    <h3 className={s.teacher_ttl}>Choose your character</h3>
                    <div className={s.teacher_desc}>
                        You meet an English teacher called {cardItmData.json.user_speaker[0]}. {cardItmData.json.user_speaker[0]} wants to get to know you.
                    </div>
                    <div className={s.teacher_img_wrap}>
                        {cardItmData.json.user_speaker.map((item, idx) => {
                            return(
                                <div
                                key={idx+1}
                                className={s.teach_item}>
                                    <figure
                                    onClick={() => this.chooseSpeaker(item)}
                                    className={s.teacher_img + ' defaut_avt'}></figure>
                                    <span>{item}</span>
                                </div>
                            );
                        })}
                    </div>
                </div>}

                {/* Content */}
                {userSpeaker !== null && <div className={"step-content "
                    + ((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '')? 'has-video ' : '')}>
                    <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                    <div className="step-ct-desc">{cardItmData.message}</div>
                    <div className="guide_txt_mb">Click play to listen</div>
                    <div className={"saudio-word "
                        + ( cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')
                        + (!endVideo ? ' hidden' : '')}>
                        <div className="saudio-img">

                            {/* video player */}
                            {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                            || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                            && <RoleplayVideoPlayer
                            videoId={'role-video-player-' + cardItmData.id}
                            playerTime={playerTime}
                            stopVideo={stopVideo}
                            hideVideo={() => this.hideVideo()}
                            resetStatus={() => this.resetStatus()}
                            poster="/images/poster.jpg"
                            srcVideo={cardItmData.json.video}
                            onStartPlay={(i) => this.startPlayInit(i)}
                            userSpeaker={userSpeaker}
                            countSentence={countSentence}
                            dataSentence={dataSentence}
                            sentencesList={dataSentence[countSentence]}
                            originalData={cardItmData.json.sentences}
                            startAudioRecord={() => this.startAudioRecord()}
                            stopRecord={() => this.stopRecord()}
                            playRecord={playRecord}
                            autoPlayRecord={() => this.autoPlayRecord()}
                            endStep={() => this.endStep()}
                            />}

                            {/* audio player */}
                            {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <Role2AudioPlayer
                            audioId={'role-audio-player-' + cardItmData.id}
                            playerTime={playerTime}
                            stopVideo={stopVideo}
                            userSpeaker={userSpeaker}
                            hideVideo={() => this.hideVideo()}
                            endStep={() => this.endStep()}
                            resetStatus={() => this.resetStatus()}
                            srcVideo={cardItmData.json.audio}
                            countSentence={countSentence}
                            dataSentence={dataSentence}
                            sentencesList={dataSentence[countSentence]}
                            originalData={cardItmData.json.sentences}
                            onStartPlay={(i) => this.startPlayInit(i)}
                            startAudioRecord={() => this.startAudioRecord()}
                            stopRecord={() => this.stopRecord()}
                            playRecord={playRecord}
                            autoPlayRecord={() => this.autoPlayRecord()}
                            />}

                        </div>

                        {/* video player */}
                        {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                        && <div
                        id={'role-video-player-' + cardItmData.id}
                        className={"sword-ct vd-play "
                        + (!endVideo ? 'hidden' : '')}>
                            <span className="saudio-play play"></span>
                            <span className="saudio-play stop"></span>
                        </div>}

                        {/* audio player */}
                        {cardItmData.json.video === ''
                        && cardItmData.json.audio !== ''
                        && <div
                        id={'role-audio-player-' + cardItmData.id}
                        className={"saudio-sent text-center aud-play "
                        + (!endVideo ? 'hidden' : '')}>
                            {/* icons */}
                            <span
                            className="saudio-play no-float play"></span>
                            <span
                            className="saudio-play no-float stop"></span>
                        </div>}
                    </div>
                </div>}

                {/* Conversation */}
                {userSpeaker !== null && <ExRoleplayRepeat
                userSpeaker={userSpeaker}
                countSentence={countSentence}
                cardItmData={dataSentence[countSentence]}
                dataSentence={dataSentence}
                finshedVideo={finshedVideo}
                originalData={cardItmData}
                indexUser={indexUser}
                stopVideo={stopVideo}
                listenConversation={(time_start, time_end, index) => this.listenConversation(time_start, time_end, index)}
                activeUser={activeUser}
                autoRecord={autoRecord}
                resetAutoPlayRecord={() => this.resetAutoPlayRecord()}
                submitAnswer={() => this.submitAnswer()}
                saveRecord={(urlRecord) => this.saveRecord(urlRecord)}
                />}

            </div>
        );
    }
}

export default withStyles(s)(ExRoleplay);