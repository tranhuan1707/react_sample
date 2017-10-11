import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from '../Lesson_Item/Lesson_Item.css';
import Link from '../../../Link';

// import subComp
import Lesson_Cards from './Lesson_Cards'

class SubLesson_Item extends React.Component {
    state = {
        lessonId: null,
        lessonData: null
    }

    showCard(cardItem){
        if(cardItem.active === 0) { return;}
        
        this.setState({loadCard: true, lessonId: cardItem.id, lessonData: cardItem});

        // $("#lesson-head-" + cardItem.id).collapse('show');
    }

    render() {
        const {lessonId, lessonData} = this.state;
        const {item, idx} = this.props;
        
        return(
            <div
                id={"lesson-wrp-" + item.id}
                className="lesson">
                <div
                id={"lesson-head-" + item.id}
                data-target={"#lesson-" + item.id }
                data-toggle="collapse"
                data-parent={"#lesson-group" }
                data-rid={item.id}
                onClick={() => this.showCard(item)}
                className="lesson-tgl">
                    <div style={{'backgroundImage': item.image !== '' ? 'url('+ item.image +')' : 'url(/images/books.png)', 'backgroundColor': item.color}}
                        className={item.active === 0 ? "block lesson-img f-l" : 'lesson-img f-l '}>
                        {item.active === 0 && <i className="fa fa-lock"></i>}
                    </div>
                    <div className="lesson-ct f-l">
                        <div className="lesson-ttl">{item.name}</div>
                        <div className="lesson-txt" dangerouslySetInnerHTML={{__html: item.description}}></div>
                    </div>
                    <div className="lesson-progress f-r">
                        <div className="l-line f-l">
                        <div className="lprog-bar" style={{width: item.progress + '%'}}></div>
                        </div><span className="numb">{item.progress}<span>%</span></span>
                    </div>
                </div>
                <div id={"lesson-" + item.id} className="lesson-body collapse">
                    <Lesson_Cards
                    lessonData={lessonData}
                    lesson_id={lessonId}/>
                </div>
            </div>
        )
    }

}

export default withStyles(s)(SubLesson_Item);