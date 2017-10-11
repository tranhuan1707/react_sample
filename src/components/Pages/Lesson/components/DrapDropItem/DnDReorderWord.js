import React, { Component } from 'react';
import update from 'react/lib/update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';
import _ from 'lodash';

// Sub Comp: Drap n Drop
import DragReorderWord from './DragReorderWord';
import DropReorderWord from './DropReorderWord';

// import helper
import MHelper from '../../../../../helper/MHelper.js';

import ItemTypes from './ItemTypes';
import * as rsActions from '../../../../../actions/result';

class DnDReorderWord extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: [{
                accepts: [ItemTypes.CARDWORD],
                lastDroppedItem: null
            }],
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            reOrderItem: null,
            corretOrder: [],
            finishAnswer: false
        };
    }

    componentWillMount() {
        const {cardItmData} = this.props;

        let arrAnswer = [];
        let arrReorder = [];
        let corretOrder = [];
        // 1. Create array reorder
        cardItmData.json.words.map((item, idx) => {
            arrReorder.push({
                name: item,
                validate: false
            })
            corretOrder.push({
                name: item,
                validate: true
            })
        });

        this.setState({
            reOrderItem: arrReorder,
            corretOrder: corretOrder
        });

        // 2. get list words
        MHelper.shuffleArray(cardItmData.json.words).map((item, idx) => {
            arrAnswer.push({
                name: item,
                type: ItemTypes.CARDWORD
            });
        });
        this.setState({dragWords: arrAnswer});
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = _.findIndex(this.state.droppedBoxNames, (i) => { return i.id == indexId; });
        // console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    async handleDrop(index, item) {
        const { name } = item;
        const {cardItmData} = this.props;
        // console.log('item', item);

        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.reOrderItem[this.state.droppedBoxNames.length].name ? true : false]
            },
            // 2. state: droppedBoxNames
            // droppedBoxNames: name ? {
            //     $push: [name],
            // } : {},
            droppedBoxNames: name ? {
                $push: [{
                    id:   item.id,
                    name: item.name
                }],
            } : {},
            // 3. state: reOrderItem
            reOrderItem:
            {
                [this.state.droppedBoxNames.length]: {
                    validate: {
                        $set: (item.name === this.state.reOrderItem[this.state.droppedBoxNames.length].name ? true : false)
                    }
                }
            }
        }));
        // console.log('this.state-->', this.state);
    }

    chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped) {return;}
        this.handleDrop(idx, chosenObj);
    }

    isAnswerCorrect(){
        let rs = true;
        let _thisState = this.state;
        this.state.reOrderItem.map(function(item, i){
            if (item.name !== _thisState.droppedBoxNames[i].name) {
                rs = false;
            }
        });
        // this.state.reOrderItem.forEach(function(itm){
        //     if(itm.validate === false) {
        //         rs = false;
        //     }
        // });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {

        let result = MHelper.findArrayVal(this.state.arrValidate, false);

        this.setState({endAllDrop: true, finishAnswer: true})
        // check correct to save result
        if(this.isAnswerCorrect() === true){
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }

        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (this.isAnswerCorrect()) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true,
                reOrderItem : this.state.corretOrder
            });

            // turn on sound
            var vid = document.getElementById('record-true');
            vid.play();
        } else {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: false
            });

            // turn on sound
            var vid = document.getElementById('record-false');
            vid.play();
        }
    }

    async revertAws(idx, chosenObj) {
        if(this.state.finishAnswer === true) { return; }

        //let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
        let indexOfDrap = _.findIndex(this.state.reOrderItem, {'name': chosenObj.name});
        // console.log('indexOfDrap', indexOfDrap);
        await this.setState(update(this.state, {
            droppedBoxNames: {$splice: [[idx, 1]]},
            arrValidate: {$splice: [[idx, 1]]},
            reOrderItem: {
                [indexOfDrap]: {
                    validate: {
                        $set: false
                    }
                }
            }
        }));
        // console.log('2-this.state-->', this.state);
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames, reOrderItem } = this.state;
        const {cardItmData} = this.props;

        return(
            <div className="row">
                {/* 1. Options words */}
                <div className="col-xs-12 text-center"
                style={{marginBottom: 5}}>
                    {dragWords.map(({ name, type }, index) =>
                        <DragReorderWord
                            name={name}
                            id={'w-' + index}
                            type={type}
                            isDropped={this.isDropped('w-' + index)}
                            key={index}
                            onClickAws={e => this.chooseAws(index, {id: 'w-' + index, name: name}, this.isDropped('w-' + index))}
                        />
                    )}
                </div>

                {/* ICONs */}
                <div className="col-xs-12 text-center">
                    <div className={s.arr_direct}>
                        <i className='fa fa-share'></i>
                    </div>
                </div>

                {/* 2. Options answer */}
                <div className="col-xs-12">
                    <div className={s.order_wrap}>
                        <div className={s.drop_order}>
                            {dropAnswer.map(({ accepts, lastDroppedItem }, index) =>
                                <DropReorderWord
                                droppedBoxNames={droppedBoxNames}
                                accepts={accepts}
                                lastDroppedItem={lastDroppedItem}
                                endAllDrop={this.state.endAllDrop}
                                reOrderItem={reOrderItem}
                                onDrop={item => this.handleDrop(index, item)}
                                key={index}
                                onClickRevert={(idx, item) => this.revertAws(idx, {id: item.id, name: item.name })}
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* 3. Show Correct Answer */}
                {this.state.endAllDrop === true
                && <div className={"text-center col-xs-12 "}>
                    <h3 className={s.order_title_lrg}>
                        Answer Correctly
                    </h3>
                    <h3 className={s.order_title}>
                        {cardItmData.json.answer}
                    </h3>
                </div>}

                {/* 4. Button submit */}
                {this.state.arrValidate.length === cardItmData.json.words.length
                && <div className={"text-center col-xs-12 "}>
                    <div className={s.button_wrap}>
                        <span onClick={() => this.submitAnswer()}
                        className="btn">Submit</span>
                    </div>
                </div>}

                {/* 5. Audio Sound */}

                {/* fail sound */}
                <audio key={'audio-wrong'}
                //autoPlay
                ref="audioRecord"
                controls="controls"
                className="hidden"
                id="record-false"
                src={'/uploads/audio/Fail-sound.mp3'}></audio>

                {/* correct sound */}
                <audio key={'audio-true'}
                id="record-true"
                //autoPlay
                ref="audioRecord"
                controls="controls"
                className="hidden"
                src={'/uploads/audio/Correct-answer.mp3'}></audio>

            </div>
        );
    }
}

export default withStyles(s)(DnDReorderWord)
