import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './TextCardItem.css';
import Link from '../../../../Link';

class TextCardItem extends React.Component {
    static propTypes = {
        cardItmData: PropTypes.object,
        cardItmNum: PropTypes.number
    };
    render() {
        const {cardItmData, cardItmNum} = this.props;
        return(
            <div className="step-content">
                <div className="step-ct-ttl"><span className="ldtail-ico ldtail-hint"></span>Giải thích</div>
                <div className="step-ct-desc"
                dangerouslySetInnerHTML={{__html: cardItmData.message}}></div>
                {cardItmData.json !== ''
                && <div className="step-ct-exams">

                </div>}
            </div>
        );
    }
}

export default withStyles(s)(TextCardItem);