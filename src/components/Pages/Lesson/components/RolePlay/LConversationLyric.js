import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

class LConversationLyric extends React.Component{
    static propTypes = {
        cardItmData: PropTypes.object,
    };

    constructor(props) {
        super(props)
    }

    render() {
        const {cardItmData, finshedVideo, activeUser} = this.props;

        return (
            <div className={[s.conversation_wrap, 'conversation-lyric'].join(' ')}>
                { cardItmData.json.sentences
                && cardItmData.json.sentences.map((item, idx) => {
                    return(
                        <div
                        key={idx+1}
                        className={s.conver_item + ' clearfix conv-itm ' + s.conver_active}
                        >

                            {/* COL LEFT */}
                            {cardItmData.json.sentences[0].speaker === item.speaker
                            && <div className={s.conver_left}>
                                
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>
                                    <div className={s.conver_cten_wrap + ' conver_cten_wrap'}>
                                        <h3 className={[s.conver_name, 'conver-name'].join(' ')}>{item.speaker}</h3>
                                        <div className={s.conver_desc + ' conver_desc'}
                                        dangerouslySetInnerHTML={{__html: item.sentence}}>
                                        </div>
                                    </div>
                                </div>
                            </div>}

                            {/* COL RIGHT */}
                            {cardItmData.json.sentences[0].speaker !== item.speaker
                            && <div className={s.conver_right + ' conver_right'}>
                                
                                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                                        <figure className={s.conver_img + ' defaut_avt'}
                                        style={{backgroundImage: "url(" + item.avatar !== '' ? item.avatar : '' + ")"}}>
                                        </figure>
                                    </div>
                                    <div className={s.conver_cten_wrap + ' conver_cten_wrap'}>
                                        <h3 className={[s.conver_name, 'conver-name'].join(' ')}>{item.speaker}</h3>
                                        <div className={s.conver_desc + ' conver_desc'}
                                        dangerouslySetInnerHTML={{__html: item.sentence}}>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                        </div>
                    )
                })}
            </div>
        );
    }
}

export default withStyles(s)(LConversationLyric);