import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import s from '../../Card_Item/Card_Item.css';
// import component
import MHelper from '../../../../../helper/MHelper.js';

const dustbinTarget = {
  drop(props, monitor) {
    props.onDrop(monitor.getItem());
  },
};

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop(),
  };
}

class DropCorrectBlank extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        //lastDroppedItem: PropTypes.object,
        onDrop: PropTypes.func.isRequired,
        sentenceBlank: PropTypes.array,
        validate: PropTypes.bool,
        endAllDrop: PropTypes.bool,
    };

    state = {
        lastItem : false,
    }


  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({lastItem: true});
    } else {
      this.setState({lastItem: false});
    }
  }

  render() {
    const { accepts, isOver, canDrop,
      connectDropTarget, lastDroppedItem,
      sentenceBlank, validate} = this.props;
    const { lastItem, arrSentence } = this.state;

    const isActive = isOver && canDrop;
    return connectDropTarget(
        <div style={{marginBottom: 15}}>
            {sentenceBlank.map((item, idx) => {
              return(
                <span key={idx+1}>
                  <span dangerouslySetInnerHTML={{__html: item}}></span>

                  {idx < sentenceBlank.length - 1
                  && <span
                  onClick={(e) => this.props.onClickRevert(lastDroppedItem)}
                  className={s.sentence_result + ' '
                      + (isActive ? s.sentence_result_active: '')
                      + ' '
                      + (lastDroppedItem ? s.sentence_result_dropped : '')
                      + ' '
                      + (lastDroppedItem
                      && lastItem === true
                      && validate === false ? s.sentence_result_wrong : '')}>
                      {lastDroppedItem &&
                      <span className={s.sen_text}>{lastDroppedItem.name}</span>
                      }
                  </span>}

                </span>
              )
            })}
        </div>
    );
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, collect)(DropCorrectBlank);