import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

class ExRoleplayRepeat extends React.Component{
    static propTypes = {
        cardItmData: PropTypes.array,
        countSentence: PropTypes.number,
        userSpeaker: PropTypes.string,
        dataSentence: PropTypes.array,
        originalData: PropTypes.object,
        submitAnswer: PropTypes.func
    };

    state = {
        userProfile: null,
    }

    constructor(props) {
        super(props);
        this.state = {appIsMounted: false};
    }

    componentDidMount() {
        // get profile
        let userProfile = JSON.parse(localStorage.getItem('infoProfile'));
        this.setState({userProfile: userProfile});

        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.dataSentence && nextProps.countSentence) {
            let idxUserSpeaker = _.findIndex(nextProps.dataSentence[nextProps.countSentence], (i) => { return i.speaker == this.props.userSpeaker; });
            
            if(idxUserSpeaker === -1) {
                // disabled button submit
                $('.submit-button').find('.btn').removeClass('disabled');
            }
        }
    }

    render() {
        const {cardItmData, finshedVideo, 
            activeUser, stopVideo, 
            indexUser, userSpeaker,
            countSentence, dataSentence,
        originalData, autoRecord} = this.props;
        const {userProfile} = this.state;

        return (
            <div className={[s.conversation_wrap, s.role_wrap, 'conversation-list roleplay-list'].join(' ')}>
                {/* separate data */}
                { cardItmData
                && countSentence < dataSentence.length
                && cardItmData.map((item, idx) => {
                    {/* if(idx > countSentence) { return;} */}
                    
                    return(
                        <div
                        key={idx+1}
                        className={[s.conver_item,
                                    'clearfix',
                                    'conv-itm',
                                    (activeUser === idx ? s.conver_active : '')].join(' ')}
                        >

                            {/* COL LEFT */}
                            {idx % 2 === 0
                            && item.sentence
                            && <div className={s.conver_left + ' conver_left'}>
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                     <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>

                                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>
                                        {item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker}
                                    </h3>
                                    <div className={s.conver_desc}
                                    dangerouslySetInnerHTML={{__html: item.sentence}}>
                                    </div>
                                    {/* {item.speaker !== userSpeaker 
                                    && <i
                                    onClick={(e) => this.props.listenConversation(item.time_start, item.time_end, idx)}
                                        className={"fa fa-volume-up conver_sound " + s.conver_sound}></i>} */}

                                    {/* Audio Record */}
                                    { this.state.appIsMounted
                                        && item.speaker === userSpeaker
                                        && React.createElement(
                                            require('./RoleplayAudioRecord.js').default,
                                            {
                                                onSaveRecord : (urlRecord) => this.props.saveRecord(urlRecord),
                                                dataSentence: dataSentence,
                                                countSentence: countSentence,
                                                time_start : item.time_start,
                                                time_end : item.time_end,
                                                id: 'speaker-' + item.speaker + '-' + (idx + countSentence),
                                                key: 'speaker-' + item.speaker + (idx + countSentence),
                                                autoRecord: autoRecord,
                                                resetAutoPlayRecord: () => this.props.resetAutoPlayRecord()
                                            }
                                        )
                                    }
                                </div>
                            </div>}

                            {/* COL RIGHT */}
                            {idx % 2 !== 0
                            && item.sentence
                            && <div className={s.conver_right}>
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>

                                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>
                                        {item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker}
                                    </h3>
                                    <div className={s.conver_desc}
                                    dangerouslySetInnerHTML={{__html: item.sentence}}>
                                    </div>
                                    {/* {item.speaker !== userSpeaker 
                                    && <i
                                    onClick={(e) => this.props.listenConversation(item.time_start, item.time_end, idx)}
                                    className={"fa fa-volume-up conver_sound " + s.conver_sound}></i>} */}

                                    {/* Audio Record */}
                                    { this.state.appIsMounted
                                        && item.speaker === userSpeaker
                                        && React.createElement(
                                            require('./RoleplayAudioRecord.js').default,
                                            {
                                                onSaveRecord : (urlRecord) => this.props.saveRecord(urlRecord),
                                                dataSentence: dataSentence,
                                                countSentence: countSentence,
                                                time_start : item.time_start,
                                                time_end : item.time_end,
                                                id: 'speaker-' + item.speaker + (idx + countSentence),
                                                key: 'speaker-' + item.speaker + (idx + countSentence),
                                                autoRecord: autoRecord,
                                                resetAutoPlayRecord: () => this.props.resetAutoPlayRecord()
                                            }
                                        )
                                    }
                                </div>
                            </div>}
                        </div>
                    )
                })}

                {/* full data*/}
                { originalData
                && countSentence >= dataSentence.length
                && originalData.json.sentences.map((item, idx) => {
                    return(
                        <div
                        key={idx+1}
                        className={[s.conver_item,
                                    'clearfix',
                                    'conv-itm',
                                    (activeUser === idx ? s.conver_active : '')].join(' ')}
                        >

                            {/* COL LEFT */}
                            {originalData.json.sentences[0].speaker === item.speaker
                            && <div className={s.conver_left + ' conver_left'}>
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                     <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>

                                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>
                                        {item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker}
                                    </h3>
                                    <div className={s.conver_desc}
                                    dangerouslySetInnerHTML={{__html: item.sentence}}>
                                    </div>
                                </div>
                            </div>}

                            {/* COL RIGHT */}
                            {originalData.json.sentences[0].speaker !== item.speaker
                            && <div className={s.conver_right}>
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>

                                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>
                                        {item.speaker === 'Your_Name' ? userProfile && userProfile.name : item.speaker}
                                    </h3>
                                    <div className={s.conver_desc}
                                    dangerouslySetInnerHTML={{__html: item.sentence}}>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )
                })}


                {/* Button submit */}
                {/* {userSpeaker !== null 
                && countSentence < dataSentence.length 
                && <div className={"text-center "}>
                    <div className={s.button_wrap + ' submit-button'}>
                        <span onClick={() => this.props.submitAnswer()}
                        className='btn disabled'>Continue</span>
                    </div>
                </div>} */}
            </div>
        );
    }
}

export default withStyles(s)(ExRoleplayRepeat);