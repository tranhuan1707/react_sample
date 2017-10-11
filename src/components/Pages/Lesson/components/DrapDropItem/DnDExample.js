import React, { Component } from 'react';
import update from 'react/lib/update';

// DnD Lib
import { DragDropContext } from 'react-dnd';
import HTML5Backend, { NativeTypes } from 'react-dnd-html5-backend';

// Sub Comp: Drap n Drop
import Box from './Box'; // <--- Drap
import Dustbin from './Dustbin'; // <--- Dropped

import ItemTypes from './ItemTypes'; // Là cai gi ? De Quy dịnh TYPE ,
//  Drap A dc bỏ vào Drop C hay khogn , 2 thằng cùng type thì dc
// ItemTypes No dc sai ben duoi , quy dinh chủng loại thôi. Mình chỉ có 1 .

class DnDExample extends Component {
  constructor(props) {
    super(props);

    // Data to render 2 cols
    // Data cho 2 thằng Drap và Drop
    this.state = {
      // Drop đây, dropAnswer
      dustbins: [
        { accepts: [ItemTypes.CARDWORD], lastDroppedItem: null }, // Cau truc chuan đây
        { accepts: [ItemTypes.CARDWORD], lastDroppedItem: null },
        { accepts: [ItemTypes.CARDWORD, ItemTypes.GLASS, NativeTypes.URL], lastDroppedItem: null },
        { accepts: [ItemTypes.CARDWORD, NativeTypes.FILE], lastDroppedItem: null },
      ],
      // Drap đây , E se doi tên boxes -> drapWords
      boxes: [
        { name: 'hello', type: ItemTypes.CARDWORD }, // Cau truc chuan đây, VD vậy ha.
        { name: 'how are you?', type: ItemTypes.CARDWORD },
        { name: 'Magazine', type: ItemTypes.CARDWORD },
      ],
      droppedBoxNames: [],
    };
  }

  isDropped(boxName) {
    return this.state.droppedBoxNames.indexOf(boxName) > -1;
  }

  // HandleOnDrop
  handleDrop(index, item) {
    const { name } = item;

    this.setState(update(this.state, {
      dustbins: {
        [index]: {
          lastDroppedItem: {
            $set: item,
          },
        },
      },
      droppedBoxNames: name ? {
        $push: [name],
      } : {},
    }));
  }

  render() {
    const { boxes, dustbins } = this.state;

    return (
      <div>
        {/* Chia 2 cols */}

         {/* cols LEFT */}
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {boxes.map(({ name, type }, index) =>
            <Box
              name={name}
              type={type}
              isDropped={this.isDropped(name)}
              key={index}
            />,
          )}
        </div>

        {/* cols RIGHT */}
        <div style={{ overflow: 'hidden', clear: 'both' }}>
          {dustbins.map(({ accepts, lastDroppedItem }, index) =>
            <Dustbin
              accepts={accepts}
              lastDroppedItem={lastDroppedItem}
              onDrop={item => this.handleDrop(index, item)}
              key={index}
            />,
          )}
        </div>


      </div>
    );
  }
}

export default  DragDropContext(HTML5Backend)(DnDExample);
