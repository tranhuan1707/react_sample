import React, { Component } from 'react';
import update from 'react/lib/update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

// Sub Comp: Drap n Drop
import DragCorrectBlank from './DragCorrectBlank';
import DropCorrectBlank from './DropCorrectBlank';

// import helper
import MHelper from '../../../../../helper/MHelper.js';
import _ from 'lodash';

import ItemTypes from './ItemTypes';
import * as rsActions from '../../../../../actions/result';

class DnDCorrectBlank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            finishAnswer: false
        };
    }

    componentWillMount() {
        const {cardItmData} = this.props;

        let arrAnswer = [];
        let arrSentence = [];
        let arrNewSen = [];

        if (!cardItmData.json || cardItmData.json.length <= 0) {return;}
        // 1. get list sentence
        cardItmData.json.map((item, idx) => {
            arrSentence.push({
                accepts: [ItemTypes.CARDWORD],
                lastDroppedItem: null,
                sentenceAnswer: item.answers,
                sentenceBlank: MHelper.explode('___', item.sen),
                // sentenceBlank: item[0],
                validate: false
            });
        });
        // console.log('cardItmData', cardItmData);

        // 2. Create newSen DATA.
        cardItmData.json.map((item, idx) => {
            item.answers.map((itm, index) => {

                // 2.1 Push list answer
                arrAnswer.push({
                    name: itm,
                    type: ItemTypes.CARDWORD
                });

                // 2.2 Create new data
                if(item.answers.length > 1) {
                // * over 1 Blank
                    let senArr = MHelper.explode('___', item.sen);
                    let ab     = [];
                    let senFinal = '';
                    // I (be) ___ ___.
                    // console.log('str.indexOf', item.sen.indexOf("___"));
                    // console.log('___ item. ___ sen', '___ item. ___ sen'.indexOf("___"));
                    // console.log('ite 0___ m. 1___ se 2___ nfdfs 3___ fssfsf', 'ite ___ m. ___ sen'.indexOf("___"));
                    // console.log('item. ___ sen ___', 'item. ___ sen ___'.lastIndexOf("___"));
                    if (index == 0) {
                        let idxOfBlnk = item.sen.indexOf("___");
                        if (idxOfBlnk == 0) {
                            senFinal = '___' + senArr[index];
                        } else {
                            senFinal = senArr[index] + '___';
                        }
                    } else if (index == item.answers.length - 1 ) {
                        let lastIdxOfBlnk = item.sen.lastIndexOf("___");
                        // console.log('lastIdxOfBlnk', lastIdxOfBlnk);
                        // console.log('item.sen.length', item.sen.length);
                        if (lastIdxOfBlnk == (item.sen.length - 3) ) {
                            senFinal = senArr[index] + '___';
                        } else {
                            senFinal = senArr[index] + '___' + senArr[index + 1] ;
                        }
                    }
                    arrNewSen.push({
                        sen: senFinal,
                        originIndex: idx,
                        sentenceBlank: MHelper.explode('___', senFinal),
                        accepts: [ItemTypes.CARDWORD],
                        lastDroppedItem: null,
                        sentenceAnswer: itm,
                        validate: false

                    });

                } else {
                // * only One Blank
                    arrNewSen.push({
                        sen: item.sen,
                        sentenceBlank: MHelper.explode('___', item.sen),
                        accepts: [ItemTypes.CARDWORD],
                        lastDroppedItem: null,
                        sentenceAnswer: itm,
                        originIndex: idx,
                        validate: false
                    });
                }
            })
        });
        MHelper.shuffleArray(arrAnswer)
        // console.log("arrNewSen", arrNewSen);

        this.setState({
            dragWords: arrAnswer,
            fakeDropAnswer: arrNewSen,
            dropAnswer: arrNewSen,
            arrNewSen: arrNewSen
        });
    }

    componentDidMount() {
        // console.log('new-line', $('.new-line').length);
        $('<br />').insertBefore('.new-line');
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
                $push : [item.name === this.state.dropAnswer[index].sentenceAnswer ? true : false]
            },
            // 2. state: dropAnswer
            dropAnswer: {
                [index]: {
                    lastDroppedItem: {
                        $set: item,
                    },
                    validate: {
                        $set: (item.name === this.state.dropAnswer[index].sentenceAnswer ? true : false)
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


    async chooseAws(idx, chosenObj, isDropped) {
        // console.log('chosenObj', chosenObj);
        if (isDropped) {return;}
        let item = chosenObj;
        const { name } = item;
        let idxBlank = _.findIndex(this.state.dropAnswer, (i) => { return i.lastDroppedItem === null; });
        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.dropAnswer[idxBlank].sentenceAnswer ? true : false]
            },
            // 2. state: dropAnswer
            dropAnswer: {
                [idxBlank]: {
                    lastDroppedItem: {
                        $set: item,
                    },
                    validate: {
                        $set: (item.name === this.state.dropAnswer[idxBlank].sentenceAnswer ? true : false)
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
            for (var i = 0; i < _this.state.dropAnswer.length; i++) {
                _this.setState(update(_this.state, {
                    // 1. state: dropAnswer
                    dropAnswer: {
                        [i]: {
                            lastDroppedItem: {
                                $set: {name: _this.state.dropAnswer[i].sentenceAnswer},
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
        }, 400 * _this.state.dropAnswer.length);


    }

    // Func: tryAgain
    async tryAgain() {
        // hide button next
        $('.step-pane .ldtail-next').hide();

        // console.log('new-line', $('.new-line').length);
        $('<br />').insertAfter('.new-line');

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
        let meetSen = 0;

        return(
            <div className="row">
                {/* 1. Options words */}
                {dragWords &&
                <div className="col-xs-12 text-center">
                    {dragWords.map(({ name, type }, index) =>
                        <DragCorrectBlank
                        id={'cr-' + index}
                        name={name}
                        type={type}
                        isDropped={this.isDropped('cr-' + index)}
                        key={index}
                        onClickAws={e => this.chooseAws(index, {id: 'cr-' + index, name: name}, this.isDropped('cr-' + index))}
                        />
                    )}
                </div>
                }

                {/* 2. Options answer */}

                <div className="col-xs-12">
                    {/* guide */}
                    {(droppedBoxNames.length === 0) &&
                        <p className={'guide-txt word text-center'}>* Click on the above words or drag and drop on this box!</p>
                    }
                    {(droppedBoxNames.length > 0) &&
                        <p className={'guide-txt word text-center'}>* Click on these words to revert your answer!</p>
                    }

                    {dropAnswer &&
                    dropAnswer.map(({ accepts,
                                    lastDroppedItem,
                                    sentenceBlank,
                                    validate,
                                    originIndex }, index) => {
                            let newLine = '';
                            if (meetSen != originIndex) {
                                meetSen++;
                                newLine = 'new-line';
                            }

                            return <div key={index} className={`sen-itm-blnk ${ newLine }`}>
                                    <DropCorrectBlank
                                    accepts={accepts}
                                    sentenceBlank={sentenceBlank}
                                    lastDroppedItem={lastDroppedItem}
                                    validate={validate}
                                    endAllDrop={this.state.endAllDrop}
                                    onDrop={item => this.handleDrop(index, item)}
                                    onClickRevert={item => this.revertAws(index, item)}
                                    />
                                </div>
                        }
                    )}
                </div>


                {/* 3. Button submit */}
                {dragWords &&
                <div>
                    {(this.state.arrValidate.length === dragWords.length)
                    && this.state.awsResult == null
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

export default withStyles(s)(DnDCorrectBlank) //DragDropContext(HTML5Backend)(DnDCorrectBlank);
