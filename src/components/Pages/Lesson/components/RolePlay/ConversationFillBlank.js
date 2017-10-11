import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

// import component
import VideoNoAutoplay from './VideoNoAutoplay.js';
import AudioNoAutoplay from './AudioNoAutoplay.js';
import DnDConversationFillBlank from '../DrapDropItem/DnDConversationFillBlank.js';

class ConversationFillBlank extends React.Component{
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
        // if(this.state.finshedVideo === false) { return; }

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
        console.log(this.props.cardItmData.json.sentences);
        // hide button next
        $('.step-pane .ldtail-next').hide();
        // $('body').find('.conversation-list .conv-itm').eq(0).addClass('conver_active');
    }

    // video finsh
    hideVideo() {
        this.setState({finshedVideo: true})
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        // show button next
        // $('.step-pane .ldtail-next').show();
    }

    resetStatus() {
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        this.setState({activeUser: null, stopVideo: true});
    }

    startPlayInit(idx) {
        // console.log('this.props.cardItmData', this.props.cardItmData);
        if (!this.props.cardItmData.json.sentences.length) {return;}
        $('body').find('.conversation-list .conv-itm').removeClass('conver_active');
        $('body').find('.conversation-list .conv-itm').eq(idx).addClass('conver_active');

    }

    render() {
        const {cardItmData, level, lessonId, cardId} = this.props;
        const {playerTime, finshedVideo, activeUser, stopVideo} = this.state;

        return(
            <div>
                <div className={"step-content "
                    + ((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '')? 'has-video ' : '')}>
                    <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                    <div className="step-ct-desc">{cardItmData.message}</div>
                    <div className="guide_txt_mb">Click play to listen</div>
                    <div className={"saudio-word hidden "
                        + ( cardItmData.json.video === '' && cardItmData.json.audio !== '' ? 'saudio-roleplay' : '')}>
                        <div className="saudio-img">

                            {/* video player */}
                            {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                            || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                            && <VideoNoAutoplay
                            videoId={'role-video-player-' + cardItmData.id}
                            key={'converfil-' + cardItmData.id}
                            playerTime={playerTime}
                            stopVideo={stopVideo}
                            hideVideo={() => this.hideVideo()}
                            resetStatus={() => this.resetStatus()}
                            poster="/images/poster.jpg"
                            onStartPlay={(i) => this.startPlayInit(i)}
                            sentencesList={cardItmData.json.sentences}
                            srcVideo={cardItmData.json.video}/>}

                            {/* audio player */}
                            {/* {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <img src={cardItmData.json.image ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>} */}
                            {cardItmData.json.video === ''
                            && cardItmData.json.audio !== ''
                            && <AudioNoAutoplay
                            audioId={'role-audio-player-' + cardItmData.id}
                            key={'converfil-' + cardItmData.id}
                            playerTime={playerTime}
                            stopVideo={stopVideo}
                            hideVideo={() => this.hideVideo()}
                            resetStatus={() => this.resetStatus()}
                            onStartPlay={(i) => this.startPlayInit(i)}
                            sentencesList={cardItmData.json.sentences}
                            srcVideo={cardItmData.json.audio}/>}

                        </div>

                        {/* video player */}
                        {((cardItmData.json.video !== '' && cardItmData.json.audio === '')
                        || (cardItmData.json.video !== '' && cardItmData.json.audio !== '' ))
                        && <div 
                        id={'role-video-player-' + cardItmData.id}
                        className="sword-ct vd-play">
                            <span className="saudio-play play"></span>
                            <span title="Stop" className="saudio-play pause"></span>
                            <span title="Pause" className="saudio-play stop"></span>
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
                            className="saudio-play no-float pause"></span>
                            <span
                            title="Pause"
                            className="saudio-play no-float stop"></span>
                        </div>}
                    </div>
                </div>

                {/* Conversation */}
                <DnDConversationFillBlank
                cardId={cardId}
                level={level}
                lessonId={lessonId}
                finshedVideo={finshedVideo}
                listenConversation={(time_start, time_end, index) => this.listenConversation(time_start, time_end, index)}
                activeUser={activeUser}
                cardItmData={cardItmData}/>
            </div>
        );
    }
}

export default withStyles(s)(ConversationFillBlank);