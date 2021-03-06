import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Card_Item/Card_Item.css';

// import sub-comp
import DnDCorrectBlank from './DrapDropItem/DnDCorrectBlank.js';

class CorrectBlankCardItem extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
    }

    render() {
        const {cardItmData, level, lessonId, cardId} = this.props;

        return(
          <div className="step-content full-width">
              <div className="step-ct-ttl sct-ttl-2">{cardItmData.title}</div>
              <div className="step-ct-desc">{cardItmData.message}</div>
              <div className="saudio-word">

                    {/* DragnDrop Container */}
                    <DnDCorrectBlank 
                    cardId={cardId}
                    level={level}
                    lessonId={lessonId}
                    cardItmData={cardItmData}/>  
                    
              </div>
          </div>
        );
    }
}

export default withStyles(s)(CorrectBlankCardItem)