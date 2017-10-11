import React, { Component } from 'react';
import update from 'react/lib/update';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../../Card_Item/Card_Item.css';

// Sub Comp: Drap n Drop
import DragConversationFillBlank from './DragConversationFillBlank';
import DropConversationFillBlank from './DropConversationFillBlank';

// import helper
import MHelper from '../../../../../helper/MHelper.js';

import ItemTypes from './ItemTypes';
import * as rsActions from '../../../../../actions/result';

// function stickyHeader
function stickyHeader() {
    if(!$('.role-answer-list').length) { return; }

    var $answer_list = $('.role-answer-list'),
        header_h     = $('.header').height(),
        guide_h      = $('.ldtail-guide').height(),
        progress_h   = $('.lesson-progress').height(),
        content_h    = $('.step-content').height(),
        offsetHeader;

    offsetHeader = header_h + guide_h + progress_h + content_h;

    $(window).scroll(function(){
        var scrollTop  = $(window).scrollTop();
        if(scrollTop >= offsetHeader){
            $answer_list.addClass('fixed');
        } else {
            $answer_list.removeClass('fixed');
        }
    });
}

class DnDConversationFillBlank extends Component {
    constructor(props) {
        super(props);

        this.state = {
            dropAnswer: null,
            dragWords: null,
            droppedBoxNames: [],
            endAllDrop: false,
            arrValidate: [],
            finishAnswer: false,
        };
    }

    componentWillMount() {
        const {cardItmData} = this.props;

        let arrAnswer = [];
        let arrSentence = [];


        // 1. get list sentence
        cardItmData.json.sentences.map((item, idx) => {
            arrSentence.push({
                accepts: item.answer !== '' ? [ItemTypes.CARDWORD] : [ItemTypes.NOTDRAG],
                lastDroppedItem: null,
                sentenceAnswer: item.answer,
                sentenceBlank: item.sentence,
                validate: false
            });
        });

        // 2. get list answer
        cardItmData.json.sentences.map((item, idx) => {
            if(item.answer !== "") {
                arrAnswer.push({
                    id: idx,
                    name: item.answer,
                    type: ItemTypes.CARDWORD
                });
            }
        });
        MHelper.shuffleArray(arrAnswer);

        this.setState({
            dragWords: arrAnswer,
            dropAnswer: arrSentence,
        });
    }

    componentDidMount() {
        stickyHeader();
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
        //console.log('this.state', this.state);
    }

    // Choose a Answer by click
    async chooseAws(idx, chosenObj, isDropped) {
        //console.log('this.state', this.state);
        //console.log('chosenObj', chosenObj);
        if (isDropped) {return;}
        let item = chosenObj;
        const { name } = item;

        // FInd Blank Indx
        let firstIdxR = _.findIndex(this.state.dropAnswer, (o) => {
            return (o.sentenceAnswer !== '' && o.lastDroppedItem == null);
        });

        // Set Data
        await this.setState(update(this.state, {
            // 1. EndAllDrop
            arrValidate: {
                $push : [item.name === this.state.dropAnswer[firstIdxR].sentenceAnswer ? true : false]
            },
            // 2. state: dropAnswer
            dropAnswer: {
                [firstIdxR]: {
                    lastDroppedItem: {
                        $set: item,
                    },
                    validate: {
                        $set: (item.name === this.state.dropAnswer[firstIdxR].sentenceAnswer ? true : false)
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
        // console.log('this.state', this.state);
    }

    isAnswerCorrect(){
        let rs = true;
        this.state.dropAnswer.forEach(function(itm){
            //itm.lastDroppedItem != null mean that doesn't have blank
            if(itm.validate === false && itm.lastDroppedItem !== null) {
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

    // Revert Answer
    async revertAws(idx, chosenObj) {
        if(this.state.finishAnswer === true) { return; }

        //let indexOfDrap = MHelper.explode('-',chosenObj.id)[1];
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
        //console.log('this.setState', this.state);
    }

    render() {
        const { dropAnswer, dragWords, droppedBoxNames, finishAnswer } = this.state;
        const {activeUser, cardItmData, finshedVideo} = this.props;

        return(
            <div className="row">
                {/* 1. Options words */}
                 <div className="col-xs-12 text-center role-answer-list">
                    {dragWords.map(({ name, type }, index) =>
                        <DragConversationFillBlank
                        id={'cr-' + index}
                        name={name}
                        type={type}
                        isDropped={this.isDropped('cr-' + index)}
                        key={index}
                        onClickAws={e => this.chooseAws(index, {id: 'cr-' + index, name: name}, this.isDropped('cr-' + index))}
                        />
                    )}
                </div>

                {/* 2. Options answer */}
                <div className="col-xs-12">
                    {/* guide */}
                    {( droppedBoxNames.length === 0) &&
                        <p className={'guide-txt word text-center'}>* Drag and drop on these boxes!</p>
                    }
                    {( droppedBoxNames.length > 0) &&
                        <p className={'guide-txt word text-center'}>* Click on these words to revert your answer!</p>
                    }

                    <div className={[s.conversation_wrap + ' ' + s.notop, 'conversation-list'].join(' ')}>
                        {dropAnswer.map(({ accepts, lastDroppedItem, sentenceBlank, validate }, index) =>
                            <DropConversationFillBlank
                            accepts={accepts}
                            sentenceBlank={sentenceBlank}
                            lastDroppedItem={lastDroppedItem}
                            validate={validate}
                            endAllDrop={this.state.endAllDrop}
                            onDrop={item => this.handleDrop(index, item)}
                            key={index}
                            dropIndex={index}
                            activeUser={activeUser}
                            cardItmData={cardItmData}
                            finshedVideo={finshedVideo}
                            finishAnswer={finishAnswer}
                            onClickRevert={item => this.revertAws(index, item)}
                            listenConversation={(time_start, time_end, index) => this.props.listenConversation(time_start, time_end, index)}
                            />
                        )}
                    </div>
                </div>

                {/* 3. Button submit */}
                {this.state.arrValidate.length === dragWords.length
                && this.state.awsResult == null
                && <div className={"text-center col-xs-12 mbt-30"}>
                    <div className={s.button_wrap}>
                        <span onClick={() => this.submitAnswer()}
                        className="btn">Submit</span>
                    </div>
                </div>}

                {(this.state.awsResult === false) &&
                <div className={"text-center col-xs-12 mbt-30"}>
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

export default withStyles(s)(DnDConversationFillBlank) //DragDropContext(HTML5Backend)(DnDCorrectBlank);
