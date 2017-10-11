import React, { Component } from 'react';
import update from 'react/lib/update';
import s from '../../Card_Item/Card_Item.css';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// Sub Comp: Drap n Drop
import DragWords from './DragWords';
import DropAnswers from './DropAnswers';

// import helper
import MHelper from '../../../../../helper/MHelper.js';

import ItemTypes from './ItemTypes';
import * as rsActions from '../../../../../actions/result';

class DnDWords extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            awsResult: null
        };
    }

    componentWillMount() {
        const {cardItmData} = this.props;

        let arrAnswer = [];
        let arrWords = [];

        // 1. get list answer
        cardItmData.json.answer.map((item, idx) => {
            arrAnswer.push({
                accepts: [ItemTypes.CARDWORD],
                lastDroppedItem: null,
                answerVN: item[1],
                mean: item[2],
                answerEN: item[0],
                validate: false
            });
        });

        // 2. get list words
        MHelper.shuffleArray(cardItmData.json.words).map((item, idx) => {
            arrWords.push({
                name: item,
                type: ItemTypes.CARDWORD
            });
        })

        this.setState({
            dropAnswer: arrAnswer,
            fakeDropAnswer: arrAnswer,
            dragWords: arrWords
        });
    }

    isDropped(indexId) {
        //return this.state.droppedBoxNames.indexOf(boxName) > -1;

        let r = _.findIndex(this.state.droppedBoxNames, (i) => { return i.id == indexId; });
        //console.log('r', r);
        return r > -1;
    }

    // HandleOnDrop
    async handleDrop(index, item) {
        const { name } = item;

        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.dropAnswer[index].answerEN ? true : false]
            },
            // 2. state: dropAnswer
            dropAnswer: {
                [index]: {
                    lastDroppedItem: {
                        $set: item,
                    },
                    validate: {
                        $set: (item.name === this.state.dropAnswer[index].answerEN ? true : false)
                    }
                },
            },
            // 3. state: droppedBoxNames
            droppedBoxNames: name ? {
                $push: [{
                    id:   item.id,
                    name: item.name
                }],
            } : {},
        }));
    }

    async chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped) {return;}
        let item = chosenObj;
        const { name } = item;
        let idxBlank = _.findIndex(this.state.dropAnswer, (i) => { return i.lastDroppedItem === null; });
        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.dropAnswer[idxBlank].answerEN ? true : false]
            },
            // 2. state: dropAnswer
            dropAnswer: {
                [idxBlank]: {
                    lastDroppedItem: {
                        $set: item,
                    },
                    validate: {
                        $set: (item.name === this.state.dropAnswer[idxBlank].answerEN ? true : false)
                    }
                },
            },
            // 3. state: droppedBoxNames
            droppedBoxNames: name ? {
                $push: [{
                    id:   item.id,
                    name: item.name
                }],
            } : {},
        }));

        // console.log('setState', this.state);
    }

    isAnswerCorrect(){
        let rs = true;
        this.state.dropAnswer.forEach(function(itm){
            if(itm.validate === false) {
                rs = false;
            }
        });
        return rs;
    }

    // EndAllDrop
    submitAnswer() {
        this.setState({endAllDrop: true, finishAnswer: true});
        // check correct to save result
        if(this.isAnswerCorrect() === true){
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 1);
        } else {
            rsActions.saveProgress(this.props.level, this.props.lessonId, this.props.cardId, this.props.cardItmData.id, 0);
        }

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

    // Func: show the HINT.
    skipToResult() {
        let _this = this;

        var resetDropAnswer = setInterval(function(){
            for (var i = 0; i < _this.state.droppedBoxNames.length; i++) {
                _this.setState(update(_this.state, {
                    // 1. state: dropAnswer
                    dropAnswer: {
                        [i]: {
                            lastDroppedItem: {
                                $set: {name: _this.state.dropAnswer[i].answerEN},
                            },
                            validate: {
                                $set: true
                            }
                        },
                    },
                }));
            }
        }, 200);

        setTimeout(function() {
            clearInterval(resetDropAnswer);
        }, 400 * _this.state.droppedBoxNames.length);
    }

    // Func: tryAgain
    async tryAgain() {
        // hide button next
        $('.step-pane .ldtail-next').hide();
        
        await this.setState({
            finishAnswer: false,
            endAllDrop: false,
            arrValidate: [],
            droppedBoxNames: [],
            dropAnswer : this.state.fakeDropAnswer,
            awsResult: null
        });
        // console.log('setState', this.state);
    }

    async revertAws(idx, chosenObj) {
        if(this.state.finishAnswer === true) { return; }

        // let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
        let indexOfDrap = _.findIndex(this.state.droppedBoxNames, (i) => { return i.id == chosenObj.id; });
        
        await this.setState(update(this.state, {
            droppedBoxNames: {$splice: [[indexOfDrap, 1]]},
            arrValidate: {$splice: [[indexOfDrap, 1]]},
            dropAnswer: {
                [idx]: {
                    lastDroppedItem: {
                        $set: null
                    },
                    validate: {
                        $set: false
                    }
                }
            }
        }));
        // console.log('setState', this.state);
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames } = this.state;

        return(
            <div className="row">
                <div className="col-xs-12">
                    {/* guide */}
                    {(droppedBoxNames.length === 0) &&
                        <p className={'guide-txt word text-center'}>* Click the words on the left or drag and drop on the correct box!</p>
                    }
                    {(droppedBoxNames.length > 0) &&
                        <p className={'guide-txt word text-center'}>* Click on these words to revert your answer!</p>
                    }
                </div>
                {/* 1. Options words */}
                 <div className="col-md-6 col-sm-6 col-xs-12">
                    {dragWords.map(({ name, type }, index) =>
                        <DragWords
                        id={'dw-' + index}
                        isDropped={this.isDropped('dw-' + index)}
                        onClickAws={e => this.chooseAws(index, {id: 'dw-' + index, name: name}, this.isDropped('dw-' + index))}
                        name={name}
                        type={type}
                        key={index}
                        />
                    )}
                </div>

                {/* 2. Options answer */}
                <div className="col-md-6 col-sm-6 col-xs-12">
                    {dropAnswer.map(({ accepts, lastDroppedItem, answerVN, validate, mean }, index) =>
                        <DropAnswers
                        accepts={accepts}
                        answerVN={answerVN}
                        mean={mean}
                        lastDroppedItem={lastDroppedItem}
                        validate={validate}
                        level={this.props.level}
                        endAllDrop={this.state.endAllDrop}
                        onDrop={item => this.handleDrop(index, item)}
                        onClickRevert={item => this.revertAws(index, item)}
                        key={index}
                        />
                    )}
                </div>

                {/* 3. Button submit */}
                {((this.state.arrValidate.length === dropAnswer.length)
                && (this.state.awsResult == null))
                && <div className={"text-center col-xs-12 "}>
                    <div className={s.button_wrap}>
                        <span onClick={() => this.submitAnswer()}
                        className="btn">Submit</span>
                    </div>
                </div>}

                {(this.state.awsResult === false) &&
                <div className={"text-center col-xs-12 "}>
                    <div className={s.button_try}>
                        <span onClick={() => this.tryAgain()}
                        className="btn">Try Again</span>
                    </div>
                    <div className={s.button_wrap}>
                        <span onClick={() => this.skipToResult()}
                        className="btn">Skip to results</span>
                    </div>
                </div>
                }

                {/* 4. Audio Sound */}

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

export default  withStyles(s)(DnDWords) //DragDropContext(HTML5Backend)(DnDWords);
