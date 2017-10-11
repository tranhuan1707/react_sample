import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import s from '../../Card_Item/Card_Item.css';

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
      id: props.id
    };
  },
};

function collect (connect, monitor) {
  return {
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  }
}

class DragFillBlank extends Component {
  static propTypes = {
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
    name: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    isDropped: PropTypes.bool.isRequired,
  };

  render() {
    const { name, isDropped, isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;

    return connectDragSource(

      <div
        className={s.sentence_opt + ' '  + (isDropped ? s.sentence_dragging : '')}
        draggable={!isDropped}
        style={{ opacity }}
        onClick={this.props.onClickAws}>
        {name}
      </div>,
    );
  }
}

export default DragSource(props => props.type, boxSource, collect)(DragFillBlank);