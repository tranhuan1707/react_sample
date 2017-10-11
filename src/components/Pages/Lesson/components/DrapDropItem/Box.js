import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  cursor: 'move',
  float: 'left',
};

const boxSource = {
  beginDrag(props) {
    return {
      name: props.name,
    };
  },
};

function collect (connect, monitor) {
  return {
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging(),
  }
}

class Box extends Component {
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
      <div style={{ ...style, opacity }}>
        {isDropped ?
          <s>{name}</s> :
          name
        }
      </div>,
    );
  }
}

// DrapSource: là func de khai báo đối tượng dc kéo.
// Params:
// TYPE: nói là loại gì, de kéo qua bên Drop đúng type.
// boxSource: là báo box ten gi thoi , tryen Props vào connectDragSource, de render ra view. 1 box đó.
// collect: là de ket noi HTML dom và event Drap.
export default DragSource(props => props.type, boxSource, collect)(Box);