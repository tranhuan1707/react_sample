import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Card_Item.css';
import Link from '../../../Link';
import history from '../../../../history';


// import component
import {
    // 1. Listening
    VideoCardItem,
    VideoQACardItem,
    TextCardItem,

    // 2. Word/Vocabulary
    WordCardItem,
    WordOnlyCardItem,
    WordExampleCardItem,
    FillBlankCardItem,
    FillChooseBlankCardItem,
    RecordCardItem,
    CorrectBlankCardItem,
    CorrectMeaningCardItem,

    // 3. Expression
    ExpressionCardItem,
    ExListenChooseAnswer,
    ExReorderWord,
    ExVideoQACardItem,

    // 4. Grammar
    GrammarCardItem,
    GrammarListeningCardItem,
    ExChooseCorrectAnswer,

    // 5. Role play
    LConversation,
    ConversationFillBlank,
    ExRoleplay,
    RoleSpeaking,

    // End: Finish test
    FinishCardItem,
} from '../components';

class Card_Item extends React.Component {
    static propTypes = {
        changeCardItm: PropTypes.func
    };
    state = {
        cardItmNum : 0,
        finishCard: false,
        reload: false
    }
    constructor(props) {
        super(props);
        // console.log('props.lesson', props.lesson);
    }

    changeCardItm() {
        const {cardItmNum} = this.state;
        const {lesson, cardItmData, lessonItemNum} = this.props;

        this.setState({
            cardItmNum : this.state.cardItmNum + 1,
            reload: true
        })

        // detroy tooltip
        if((cardItmNum+1) > lesson.items.length - 1) {
            $('.ldtail-next').tooltip('destroy');
        }


        if(cardItmData.card.length === 1) {
            // finish card item
            if((cardItmNum+1) === lesson.items.length) {
                this.setState({
                    finishCard: true
                })
            }
        } else {
            // check end card_item
            if((lessonItemNum + 1) < cardItmData.card.length) {

                // finish card item
                if((cardItmNum+1) === lesson.items.length) {
                    let idCardNext = cardItmData.card[lessonItemNum + 1].id;

                    // redirect next item
                    history.push('/lesson/' + idCardNext + '/level/' + this.context.level + '/' + this.context.lessonId);
                    this.props.onClickGetCardItem(idCardNext, lessonItemNum + 1);
                }
            } else {
                // finish card item
                if((cardItmNum+1) === lesson.items.length) {
                    this.setState({
                        finishCard: true
                    })
                }
            }
        }
    }

    stopReload() {
        this.setState({reload: false})
    }

    render() {
        const {lesson, per, cardItmData, lesson_id} = this.props;
        const {cardItmNum, finishCard, reload} = this.state;

        return (
            <div className="step-dtail tab-content">
                <div
                className="tab-pane step-pane active">
                    {lesson
                    && lesson.items
                    && lesson.items.length !== 0
                    && <div className="step-dtail tab-content">
                        <div className="ldtail-next-wrap">
                            {lesson.items
                            && finishCard === false
                            && <span
                            onClick={() => this.changeCardItm()}
                            data-title="Next"
                            className="ldtail-arrow ldtail-next">
                                <i className="fa fa-arrow-right"></i>
                            </span>}
                        </div>
                        <div className="step-body">
                            {finishCard === false
                            && <div className="lesson-progress">
                                <div className="l-line">
                                    <div
                                    style={{'width': (per * (cardItmNum+1)) +'%'}}
                                    className="lprog-bar"></div>
                                </div>
                            </div>}

                        {/* 1. Listening --------------------------------*/}

                        {/* type Video không có script */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_VIDEO"
                        && <VideoCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"type_1_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}/>}

                        {/* type Video - Nghe và trả lời câu hỏi */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_VIDEO_QUESTION_ANSWER"
                        && <ExVideoQACardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"type_2_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]} />}

                        {/* 2. Word/Vocabulary --------------------------------*/}

                        {/* type Từ mới riêng rẽ */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_WORD"
                        && <WordCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"type_3_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Từ mới trong câu  */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_WORD_ONLY_EXAMPLE"
                        && <WordOnlyCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"word_only_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Từ mới và câu  */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_WORD_AND_EXAMPLE"
                        && <WordExampleCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"word_example_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Chọn từ vào chỗ trống */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_CHOOSE_FILL_BLANK"
                        && <FillChooseBlankCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"choose_blank_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Điền từ vào chỗ trống */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_FILL_BLANK"
                        && <FillBlankCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"fill_blank_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Nối câu và từ khuyết */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_CORRECT_BLANK"
                        && <CorrectBlankCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"correct_blank_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Nối nghĩa chính xác */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_CORRECT_MEANING"
                        && <CorrectMeaningCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"correct_meaning_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Thu âm */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_RECORD"
                        && <RecordCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"type_record_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* 3. Expression --------------------------------*/}

                        {/* type Những expression cần học */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_EXPRESSION"
                        && <ExpressionCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"expression_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type Video - Chọn câu trả lời chính xác */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_LISTEN_CHOOSE_ANSWER"
                        && <ExListenChooseAnswer
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"ex_listen_choose_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]} />}

                        {/* type Sắp xếp lại thứ tự các từ */}
                         {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_REORDER_WORDS"
                        && <ExReorderWord
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"ex_reorder_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* TEXT --------------------------------*/}

                        {/* type Text */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "TEXT"
                        && <TextCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"type_17_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]} />}

                        {/* 4. Grammar --------------------------------*/}

                        {/* type Những Grammar cần học */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_GRAMMAR"
                        && <GrammarCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"grammar_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* type nghe mẫu câu grammar */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_GRAMMAR_LISTENING"
                        && <GrammarListeningCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"grammar_listen_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* chọn từ cho đúng grammar */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_CHOOSE_CORRECT_ANSWER"
                        && <ExChooseCorrectAnswer
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"grammar_correct_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* 5. Role play --------------------------------*/}

                        {/* Conversation */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "L_CONVERSATION"
                        && <LConversation
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"l_conversation" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* Điền từ vào chỗ trống */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_CONVERSATION_FILL_BLANK"
                        && <ConversationFillBlank
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"converation_fill_blank" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* EX_ROLE_PLAY */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_ROLE_PLAY"
                        && <ExRoleplay
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"ex_roleplay" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* ROLE SPEAKING */}
                        {lesson.items[cardItmNum]
                        && lesson.items[cardItmNum].type === "EX_SPEAKING"
                        && <RoleSpeaking
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        key={"role_speaking_" + cardItmNum}
                        cardItmData={lesson.items[cardItmNum]}
                        />}

                        {/* Finish test --------------------------------*/}

                        {/* finish*/}
                        {finishCard === true
                        && <FinishCardItem
                        cardId={this.props.cardId}
                        lessonId={this.context.lessonId}
                        level={this.context.level}
                        lesson={lesson}/>}
                        </div>
                    </div>}
                    {/* no data*/}
                    {lesson
                    && lesson.items
                    && lesson.items.length === 0
                    && <div>
                        <h3 className={s.nodata}>No Lesson</h3>
                    </div>}
                </div>
            </div>
        );
  }
}

Card_Item.contextTypes = {
  level: PropTypes.string,
  lessonId: PropTypes.string,
};

export default withStyles(s)(Card_Item);
