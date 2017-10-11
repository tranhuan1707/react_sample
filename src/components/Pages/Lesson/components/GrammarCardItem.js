import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';
import * as rsActions from '../../../../actions/result';

class GrammarCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object
    };
    state = {
        showMean: false,
    }

    constructor(props) {
        super(props)
    }

    // show vietnamese
    clickShowMean() {
        this.setState({showMean: true});
    }

    componentDidMount() {
        // hide button next
        //$('.step-pane .ldtail-next').hide();
        rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, -1);

        // show vietnamese when level = Beginner
        if(this.props.level === 'B') {
            this.setState({showMean: true});
        }
    }

    // video finsh
    hideVideo() {
        // show button next
        $('.step-pane .ldtail-next').show();
    }

    render() {
        const {cardItmData} = this.props;
        const {showMean} = this.state;
        return(
            <div className="step-content lesson-grammar">
                <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
                <div className="step-ct-desc">{cardItmData.message}</div>
                <div className="saudio-word">

                    {/* 1. Grammar desc */}
                    <div className={"aud-play " + s.lword}>
                        {/* grammar */}
                        <div className={"sword-ct " + s.new_word}>
                            <div className={s.wordmeans}
                            onClick={e => this.clickShowMean()}>
                                <div className="sent" dangerouslySetInnerHTML={{__html: cardItmData.json.grammar}}></div>
                                <div dangerouslySetInnerHTML={{__html: cardItmData.json.description}}></div>
                            </div>
                            {showMean === true
                            && <div className="pron">{cardItmData.json.vietnamese}</div>}
                        </div>
                    </div>
                </div>

                <div className="grammar-ex" style={{overflow: 'hidden'}}>
                    {/* 2. Grammar Example */}
                        {/* sentences */}
                        {cardItmData.json.sentence !== null
                            && typeof cardItmData.json.sentence === 'object'
                            && cardItmData.json.sentence.map((item, idx) => {
                                return(
                                    <div className="saudio-sent audno-play"  key={idx+1}>
                                        <div className={s.wordmeans}>
                                            <div className="sent"
                                            dangerouslySetInnerHTML={{__html: item}}></div>
                                        </div>
                                    </div>
                                )
                            })}
                </div>
            </div>
        )
    }
}

export default withStyles(s)(GrammarCardItem)