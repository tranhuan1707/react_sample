import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';

// import component
import AudioPlayer from './AudioPlayer.js';

class RecordCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };
    constructor(props) {
        super(props)
        this.state = {
            appIsMounted: false,
            showMean: false,
            showTranslate: false
        };
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();

        requestAnimationFrame(() => {
            this.setState({ appIsMounted: true });
        });

        // show vietnamese when level = Beginner
        if(this.props.level === 'B') {
            this.setState({showTranslate: true});
        }
    }

    // video finsh
    hideVideo() {
        // // show button next
        // $('.step-pane .ldtail-next').show();
    }

    // event click show mean
    clickShowMean() {
        // this.setState({showMean: true})
    }

    // event show vietnamese
    clickShowVN() {
        this.setState({showTranslate: true})
    }

    render() {
        const {cardItmData} = this.props;
        const {showMean, showTranslate} = this.state;

        return(
            <div className="step-content">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                <div className="saudio-word saudio-sml">

                    {/* 1. Audio Question */}
                    <div className="saudio-img">
                        <div className={s.record_img} >
                            <img src={cardItmData.json.image !== "" ? cardItmData.json.image : '/images/poster.jpg'} alt=""/>
                        </div>

                        {(cardItmData.json.audio !== '') &&
                        <AudioPlayer
                        audioId={'audio-player-' + cardItmData.id}
                        hideVideo={() => this.hideVideo()}
                        srcVideo={cardItmData.json.audio}/>
                        }
                    </div>
                    <div
                    id={'audio-player-' + cardItmData.id}
                    className={"aud-play " + s.lword}>
                        {/* icons */}
                        {(cardItmData.json.audio !== "") &&
                        <span
                        className="saudio-play f-l play"></span>
                        }
                        {(cardItmData.json.audio !== "") &&
                        <span
                        className="saudio-play f-l stop"></span>
                        }

                        {/* words */}
                        <div className={"sword-ct "}>
                            <div className={s.wordmeans}
                            onClick={e => this.clickShowMean()}>
                                <div className="sent">
                                    <span dangerouslySetInnerHTML={{__html: cardItmData.json.sentence}}></span>
                                    {cardItmData.json.pronunciation
                                    && <span className={"pronunciation"}>/ {cardItmData.json.pronunciation} /</span>}
                                </div>
                            </div>
                            {cardItmData.json.means
                            && <div className={s.wordmeans + " pron"}
                            onClick={e => this.clickShowVN()}
                            dangerouslySetInnerHTML={{__html: cardItmData.json.means}}
                            >
                            </div>}

                            {showTranslate === true
                            && cardItmData.json.vietnamese
                            && <div className="pron" dangerouslySetInnerHTML={{__html: cardItmData.json.vietnamese}}></div>}
                        </div>

                        {/* Audio Record */}
                        { this.state.appIsMounted
                            && React.createElement(
                                require('./AudioRecord.js').default, this.props
                            )
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(s)(RecordCardItem)