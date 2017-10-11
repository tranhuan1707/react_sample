import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';

// import component
import AudioPlayer from './AudioPlayer.js';
import DnDFillBlank from './DrapDropItem/DnDFillBlank.js'
import * as rsActions from '../../../../actions/result';

class FillChooseBlankCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };

    state = {
        answer: null,
        answerAllready: false,
        answerResult: null
    }

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    render() {
        const {cardItmData} = this.props;
        const {answer, answerResult} = this.state;

        return(
            <div className="step-content full-width">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="guide_txt_mb">Click play to listen</div>
                    <div className="saudio-word saudio-roleplay w400">

                        {/* 1. Audio Question */}
                        <div className="saudio-img">
                            {(cardItmData.json.audio !== '') &&
                            <AudioPlayer
                            audioId={'audio-player-' + cardItmData.id}
                            srcVideo={cardItmData.json.audio}/>
                            }
                        </div>
                        <div 
                        id={'audio-player-' + cardItmData.id}
                        className="saudio-sent text-center aud-play">
                            {/* icons */}
                            {(cardItmData.json.audio !== "") &&
                            <span
                            className="saudio-play no-float play"></span>
                            }
                            {(cardItmData.json.audio !== "") &&
                            <span
                            className="saudio-play no-float stop"></span>
                            }

                            {/* question */}
                            <div className="ssent-ct no-float">
                                {/* <div dangerouslySetInnerHTML={{__html: cardItmData.json.sentence}} className="sent"></div> */}
                            </div>
                        </div>
                    </div>
                    {/* 2. Answer Options */}
                    <DnDFillBlank 
                    cardItmData={cardItmData}/>  
            </div>
        );
    }
}

export default withStyles(s)(FillChooseBlankCardItem)