import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import s from '../../Card_Item/Card_Item.css';

const dustbinTarget = {
  drop(props, monitor) {
    // console.log('monitor', monitor);
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

class DropReorderWord extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        lastDroppedItem: PropTypes.object,
        onDrop: PropTypes.func.isRequired,
        validate: PropTypes.bool,
        endAllDrop: PropTypes.bool,
        droppedBoxNames: PropTypes.array,
        reOrderItem: PropTypes.array
    };

    state = {
        lastItem : false,
    }


  // EndAllDrop -> validate true or false
  componentWillReceiveProps(nextProps) {
    if (nextProps.endAllDrop && nextProps.endAllDrop === true) {
      this.setState({lastItem: true});
    }
  }

  render() {
    const { accepts, isOver, canDrop,
          connectDropTarget, lastDroppedItem,
          validate, droppedBoxNames, reOrderItem} = this.props;
    const { lastItem, arrSentence } = this.state;

    const isActive = isOver && canDrop;

    return connectDropTarget(
      <div
      className={s.reorder_wrap
        + ' '
        + (isActive ? s.reorder_wrap_active: '')
        + ' '
        + (droppedBoxNames.length !==0 ? s.reorder_haschild : '')}>

        {droppedBoxNames &&
        droppedBoxNames.map((item, idx) => {
          return(
            <div
            key={idx}
            onClick={(e) => this.props.onClickRevert(idx, item)}
            className={s.order_result + ' '
                + (isActive ? s.sentence_result_active: '')
                + ' '
                + (droppedBoxNames.length !==0 ? s.sentence_result_dropped : '')
                + ' '
                + (droppedBoxNames.length !==0
                && lastItem === true
                && reOrderItem[idx].validate === false ? s.sentence_result_wrong : '')}>
                {item.name}
            </div>
          )
        })}

        {(droppedBoxNames.length === 0) &&
          <p className={'guide-txt'}>* Click on the above words or drag and drop on this box!</p>
        }
        {(droppedBoxNames.length > 0) &&
          <p className={'guide-txt bottom'}>* Click on these words to revert your answer!</p>
        }
      </div>
    );
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, collect)(DropReorderWord);