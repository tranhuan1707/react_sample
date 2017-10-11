import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

// import component
import VideoAutoplay from './VideoAutoplay.js';
import RoleplayAudioPlayer from './RoleplayAudioPlayer.js';
import RepeatConversation from './RepeatConversation.js';
import LConversationLyric from './LConversationLyric.js';
import * as rsActions from '../../../../../actions/result';

class LConversation extends React.Component{
    static propTypes = {
        cardItmData: PropTypes.object,
    };
    state = {
        playerTime: null,
        finshedVideo: false,
        activeUser: null,
        stopVideo: false
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
                stopVideo: false
            });
            // console.log('timeline', timeline);
        }
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
        $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
        $('body').find('.conversation-lyric .conv-itm').eq(0).addClass('active');
    }

    // video finsh
    hideVideo() { 
        this.setState({finshedVideo: true})
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');

        // lyric
        $('body').find('.conversation-lyric .conv-itm').removeClass('active');
        // $('body').find('.conversation-lyric .conv-itm').eq(0).addClass('active');

        // show button next
        $('.step-pane .ldtail-next').show();
        // save result
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);
    }

    resetStatus() {
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        
        // lyric
        $('body').find('.conversation-lyric .conv-itm').removeClass('active');
        // $('body').find('.conversation-lyric .conv-itm').eq(0).addClass('active');

        this.setState({activeUser: null, stopVideo: true});
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {return;}
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        $('body').find('.conversation-lyric .conv-itm').removeClass('active');

        $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');
        $('body').find('.conversation-lyric .conv-itm').eq(idx).addClass('active');

    }

    render() {
        const {cardItmData} = this.props;
        const {playerTime, finshedVideo, activeUser, stopVideo} = this.state;

        return(
            <div>
                <div className={"step-content "
                    + ((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '')? 'has-video ' : '')}>
                    <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                    <div className="step-ct-desc">{cardItmData.message}</div>
                    <div className="guide_txt_mb">Click play to listen</div>
                    <div className={"saudio-word lconver-saudio-word"
                        + ( cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')}>
                        <div className="saudio-img">

                            {/* video player */}
                            {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                            || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                            && <VideoAutoplay
                            videoId={'role-video-player-' + cardItmData.id}
                            key={'converfil-' + cardItmData.id}
                            playerTime={playerTime}
                            stopVideo={stopVideo}
                            hideVideo={() => this.hideVideo()}
                            resetStatus={() => this.resetStatus()}
                            poster="/images/poster.jpg"
                            srcVideo={cardItmData.json.video}
                            sentencesList={cardItmData.json.sentences}
                            onStartPlay={(i) => this.startPlayInit(i)}
                            />}

                            {/* audio player */}
                            {/* {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <img src={cardItmData.json.image ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>} */}
                            {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <RoleplayAudioPlayer
                                audioId={'role-audio-player-' + cardItmData.id}
                                key={'converfil-' + cardItmData.id}
                                playerTime={playerTime}
                                stopVideo={stopVideo}
                                hideVideo={() => this.hideVideo()}
                                resetStatus={() => this.resetStatus()}
                                srcVideo={cardItmData.json.audio}
                                sentencesList={cardItmData.json.sentences}
                                onStartPlay={(i) => this.startPlayInit(i)}
                            />}

                            {/* video lyric*/}
                            {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                            || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                            && <LConversationLyric
                                cardItmData={cardItmData}
                                finshedVideo={finshedVideo}
                                listenConversation={(time_start, time_end, index) => this.listenConversation(time_start, time_end, index)}
                                activeUser={activeUser}
                            />}

                        </div>

                        {/* video player */}
                        {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                        && <div 
                        id={'role-video-player-' + cardItmData.id}
                        className="sword-ct vd-play svideo-sent">
                            <span className="saudio-play play"></span>
                            <span title="Stop" className="saudio-play stop"></span>
                            <span title="Pause" className="saudio-play pause"></span>
                            {/*<div className="word">man</div>
                            <div className="pron">man</div>*/}
                        </div>}

                        {/* audio player */}
                        {cardItmData.json.video === ''
                        && cardItmData.json.audio !== ''
                        && <div 
                        id={'role-audio-player-' + cardItmData.id}
                        className={"saudio-sent text-center aud-play "}>
                            {/* icons */}
                            <span
                            className="saudio-play no-float play"></span>
                            <span
                            title="Stop"
                            className="saudio-play no-float stop"></span>
                            <span
                            title="Pause"
                            className="saudio-play no-float pause"></span>
                        </div>}
                    </div>
                </div>

                {/* Conversation */}
                <RepeatConversation
                    cardItmData={cardItmData}
                    finshedVideo={finshedVideo}
                    listenConversation={(time_start, time_end, index) => this.listenConversation(time_start, time_end, index)}
                    activeUser={activeUser}
                />
            </div>
        );
    }
}

export default withStyles(s)(LConversation);