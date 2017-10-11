import React, { Component } from 'react';
import update from 'react/lib/update';
import s from '../../Card_Item/Card_Item.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// import helper
import MHelper from '../../../../../helper/MHelper.js';

import ItemTypes from './ItemTypes';

// Sub Comp: Drap n Drop
import DragFillBlank from './DragFillBlank';
import DropFillBlank from './DropFillBlank';

class DnDFillBlank extends Component {
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
            fillBlankItem: null,
            finishAnswer: false
        };
    }

    componentWillMount() {
        const {cardItmData} = this.props;

        let arrAnswer = [];
        let arrFillBlank = [];

        // 1. Create array fill blank
        cardItmData.json.options.map((item, idx) => {
            arrFillBlank.push({
                name: item,
                validate: false
            })
        });



        // 2. get list options
        MHelper.shuffleArray(cardItmData.json.options).map((item, idx) => {
            arrAnswer.push({
                name: item,
                type: ItemTypes.CARDWORD
            });
        });

        this.setState({
            fillBlankItem: arrFillBlank,
            dragWords: arrAnswer
        });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;
        let r = _.findIndex(this.state.droppedBoxNames, (i) => { return i.id == indexId; });
        // console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    async handleDrop(index, item) {
        if(this.state.arrValidate.length !== 0) { return; }
        const { name } = item;
        const {cardItmData} = this.props;
        // console.log('item', item);

        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.fillBlankItem[this.state.droppedBoxNames.length].name ? true : false]
            },
            // 2. state: droppedBoxNames
            droppedBoxNames: name ? {
                $push: [{
                    id:   item.id,
                    name: item.name
                }],
            } : {},
            // 3. state: fillBlankItem
            fillBlankItem: {
                [this.state.droppedBoxNames.length]: {
                    validate: {
                        $set: (item.name === this.state.fillBlankItem[this.state.droppedBoxNames.length].name ? true : false)
                    }
                }
            }
        }));
    }

    chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped || this.state.arrValidate.length !== 0) {return;}
        this.handleDrop(idx, chosenObj);
    }

    // EndAllDrop
    submitAnswer() {
        let result = MHelper.findArrayVal(this.state.arrValidate, false);
        // show button next
        $('.step-pane .ldtail-next').show();

        // If all r right
        if (result < 0) {
            this.setState({
                endAllDrop: true,
                finishAnswer: true,
                awsResult: true
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

        let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];

        await this.setState(update(this.state, {
            droppedBoxNames: {$splice: [[idx, 1]]},
            arrValidate: {$splice: [[idx, 1]]},
            fillBlankItem: {
                [indexOfDrap]: {
                    validate: {
                        $set: false
                    }
                }
            }
        }));
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames, fillBlankItem } = this.state;
        const {cardItmData} = this.props;

        return(
            <div className="row">
                {/* 1. Options words */}
                <div className="col-xs-12 text-center"
                style={{marginBottom: 5}}>
                    {dragWords.map(({ name, type }, index) =>
                        <DragFillBlank
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
                    <div className={s.drop_order}>
                        {dropAnswer.map(({ accepts, lastDroppedItem }, index) =>
                            <DropFillBlank
                            droppedBoxNames={droppedBoxNames}
                            sentence={cardItmData.json.sentence}
                            accepts={accepts}
                            lastDroppedItem={lastDroppedItem}
                            endAllDrop={this.state.endAllDrop}
                            fillBlankItem={fillBlankItem}
                            onDrop={item => this.handleDrop(index, item)}
                            key={index}
                            onClickRevert={(idx, item) => this.revertAws(idx, {id: item.id, name: item.name })}
                            />
                        )}
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
                {this.state.arrValidate.length !== 0
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

export default withStyles(s)(DnDFillBlank)