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

class DropFillBlank extends Component {
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
        fillBlankItem: PropTypes.array
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
          validate, droppedBoxNames, fillBlankItem, sentence} = this.props;
    const { lastItem } = this.state;

    const isActive = isOver && canDrop;

    return connectDropTarget(
    <div
      className={s.reorder_wrap}>

        {(droppedBoxNames.length === 0) &&
          <p className={'guide-txt'}>* Click on the above words or drag and drop on this box!</p>
        }
        {(droppedBoxNames.length > 0) &&
          <p className={'guide-txt'}>* Click on these words to revert your answer!</p>
        } 

        {MHelper.explode('___', sentence)[0]}

        <div
        className={(droppedBoxNames.length === 0 ? s.sentence_result : s.sentence_res)
          + ' '
          + (droppedBoxNames.length === 0  && isActive ? s.sentence_active: '')}>
          {droppedBoxNames &&
          droppedBoxNames.map((item, idx) => {
            return(
              <div
              key={idx}
              onClick={(e) => this.props.onClickRevert(idx, item)}
              className={s.sentence_result + ' '
                  + (isActive ? s.sentence_result_active: '')
                  + ' '
                  + (droppedBoxNames.length !==0 ? s.sentence_result_dropped : '')
                  + ' '
                  + (droppedBoxNames.length !==0
                  && lastItem === true
                  && fillBlankItem[idx].validate === false ? s.sentence_result_wrong : '')}>
                  {item.name}
              </div>
            )
          })}
        </div>

        {MHelper.explode('___', sentence)[1]}
      </div>
    );
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, collect)(DropFillBlank);