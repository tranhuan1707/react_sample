import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import s from '../../Card_Item/Card_Item.css';

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

class DropAnswers extends Component {
  static propTypes = {
    connectDropTarget: PropTypes.func.isRequired,
    isOver: PropTypes.bool.isRequired,
    canDrop: PropTypes.bool.isRequired,
    accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
    lastDroppedItem: PropTypes.object,
    onDrop: PropTypes.func.isRequired,
    answerVN: PropTypes.string,
    validate: PropTypes.bool,
    endAllDrop: PropTypes.bool,
    mean: PropTypes.string,
    finishAnswer: PropTypes.bool
  };

  state = {
    lastItem : false
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
          answerVN, validate, mean, level, finishAnswer} = this.props;
    const { lastItem } = this.state;
    
    const isActive = isOver && canDrop;

    return connectDropTarget(
      <div 
      onClick={(e) => this.props.onClickRevert(lastDroppedItem)}
      className={s.ans_result + ' '
        + (isActive ? s.isActive: '')
        + ' '
        + (lastDroppedItem ? s.dropped : '')
        + ' '
        + (lastDroppedItem 
        && lastItem === true
        && validate === false ? s.dropped_wrong : '')}>
          {!lastDroppedItem && <div className={s.dropSuggest}>
            {level === "B" ? answerVN + ' (' + mean + ')' : answerVN}
          </div>}
          {lastDroppedItem &&
            <div className={lastItem === true ? s.word_dropped : ''}>
              {lastItem === false && lastDroppedItem.name}
              {lastItem === true 
              && level === "B" 
              && lastDroppedItem.name + ' - ' + answerVN + ' (' + mean + ')'}
            </div>
          }
      </div>
    );
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, collect)(DropAnswers);
