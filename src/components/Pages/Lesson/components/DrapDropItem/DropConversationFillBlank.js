import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';
import s from '../../Card_Item/Card_Item.css';
// import component
import MHelper from '../../../../../helper/MHelper.js';

const dustbinTarget = {
  drop(props, monitor) {
    // console.log('monitor.getItem()', monitor.getItem());
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

class DropConversationFillBlank extends Component {
    static propTypes = {
        connectDropTarget: PropTypes.func.isRequired,
        isOver: PropTypes.bool.isRequired,
        canDrop: PropTypes.bool.isRequired,
        accepts: PropTypes.arrayOf(PropTypes.string).isRequired,
        //lastDroppedItem: PropTypes.object,
        onDrop: PropTypes.func.isRequired,
        sentenceBlank: PropTypes.string,
        validate: PropTypes.bool,
        endAllDrop: PropTypes.bool,
        dropIndex: PropTypes.number,
        cardItmData: PropTypes.object,
        finshedVideo: PropTypes.bool,
        finishAnswer: PropTypes.bool
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
      sentenceBlank, validate, dropIndex,
      activeUser, cardItmData, finshedVideo, finishAnswer} = this.props;
    const { lastItem } = this.state;

    const isActive = isOver && canDrop;
    
    return connectDropTarget(
        <div style={{marginBottom: 15}}
        className={[s.conver_item,
          'clearfix',
          'conv-itm',
          (activeUser === dropIndex ? s.conver_active : '')].join(' ')}>

            {/* COL LEFT */}
            {cardItmData.json.sentences[0].speaker === cardItmData.json.sentences[dropIndex].speaker
            && <div className={s.conver_left}>
                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                        <figure className={s.conver_img + ' defaut_avt'}
                        style={{backgroundImage: "url(" + cardItmData.json.sentences[dropIndex].avatar !== '' ? cardItmData.json.sentences[dropIndex].avatar : '' + ")"}}>
                        </figure>
                    </div>
                    
                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>{cardItmData.json.sentences[dropIndex].speaker}</h3>
                    <div className={s.conver_desc}>
                        {/* content */}
                        {MHelper.explode('___', sentenceBlank)[0]}

                        {sentenceBlank.indexOf("___") !== -1 && <div
                        onClick={(e) => this.props.onClickRevert(lastDroppedItem)}
                        className={s.sentence_result + ' sentence_result '
                            + (isActive ? s.sentence_result_active: '')
                            + ' '
                            + (lastDroppedItem ? s.sentence_result_dropped + ' sentence_result_dropped' : '')
                            + ' '
                            + (lastDroppedItem
                            && lastItem === true
                            && validate === false ? s.sentence_result_wrong : '')}>
                            {lastDroppedItem &&
                            <div className={s.fillname}>{lastDroppedItem.name}</div>
                            }
                        </div>}
                        
                        {sentenceBlank.indexOf("___") !== -1 
                        && MHelper.explode('___', sentenceBlank)[1]} 
                    </div>
                    {finishAnswer === true 
                    && <i
                    onClick={(e) => this.props.listenConversation(cardItmData.json.sentences[dropIndex].time_start, cardItmData.json.sentences[dropIndex].time_end, dropIndex)}
                    className={"fa fa-volume-up " + s.conver_sound}></i>}
                </div>
            </div>}

            {/* COL RIGHT */}
            {cardItmData.json.sentences[0].speaker !== cardItmData.json.sentences[dropIndex].speaker
            && <div className={s.conver_right}>
                <div className={[s.conver_content, 'conver-ct'].join(' ')}>
                    <div className={s.conver_img_wrap + ' conver_img_wrap'}>
                        <figure className={s.conver_img + ' defaut_avt'}
                        style={{backgroundImage: "url(" + cardItmData.json.sentences[dropIndex].avatar !== '' ? cardItmData.json.sentences[dropIndex].avatar : '' + ")"}}>
                        </figure>
                    </div>

                    <h3 className={[s.conver_name, 'conver-name'].join(' ')}>{cardItmData.json.sentences[dropIndex].speaker}</h3>
                    <div className={s.conver_desc}>
                        {/* content */}
                        {MHelper.explode('___', sentenceBlank)[0]}

                        {sentenceBlank.indexOf("___") !== -1 && <div
                        onClick={(e) => this.props.onClickRevert(lastDroppedItem)}
                        className={s.sentence_result + ' sentence_result '
                            + (isActive ? s.sentence_result_active: '')
                            + ' '
                            + (lastDroppedItem ? s.sentence_result_dropped : '')
                            + ' '
                            + (lastDroppedItem
                            && lastItem === true
                            && validate === false ? s.sentence_result_wrong : '')}>
                            {lastDroppedItem &&
                            <div className={s.fillname}>{lastDroppedItem.name}</div>
                            }
                        </div>}
            
                        {sentenceBlank.indexOf("___") !== -1 
                        && MHelper.explode('___', sentenceBlank)[1]} 
                    </div>
                    {finishAnswer === true 
                    && <i
                    onClick={(e) => this.props.listenConversation(cardItmData.json.sentences[dropIndex].time_start, cardItmData.json.sentences[dropIndex].time_end, dropIndex)}
                    className={"fa fa-volume-up " + s.conver_sound}></i>}
                </div>
            </div>}
        </div>
    );
  }
}

export default DropTarget(props => props.accepts, dustbinTarget, collect)(DropConversationFillBlank);