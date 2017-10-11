/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './Layout.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';
import CourseMobile from '../CourseMobile';

// import helper
import Auth from '../../routes/modules/Auth';
import ApiRx from '../../helper/ApiRx';

// function js tooltip
function showToolReport () {
  if($(window).width() < 768 || navigator.userAgent.match(/Android|iPad|iPhone|iPod|Windows Phone|Lumia|Blackberry/i)) { return; }

  $('.report_issue .icon_report').tooltip({
      title: function() {
          var html = `<div class="tooltip-body">
                          <div class="tooltip-ttl">${$(this).data('title')}</div>
                      </div>`
          return html
      },
      html: true
  });
}

// function js show report form
function showReportForm() {
  $('.icon_report').on('click', function(e) {
    e.preventDefault();
    var $icon = $(this),
        $form = $icon.siblings('.report_form'),
        $ipt_link = $form.find('#ipt_link');

    // get url
    $ipt_link.val(window.location.href);
    
    if($icon.hasClass('act')) {
      $icon.removeClass('act');
      $form.hide();
      showToolReport();
    } else {
      $icon.addClass('act');
      $form.show();
      $('.report_issue .icon_report').tooltip('destroy');
    }
  });

  // click out
  $(document).click(function(e) {
    if($(e.target).is('.report_issue')
      || $(e.target).is('.report_issue *')) {return;}

    $('.icon_report').removeClass('act');
    $('.report_form').hide();
  });
}

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      msgErrorText: '',
      validMessage: false,
      loadingApi: false,
      apiStatus: null,
      apiMsg: ''
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.reportDone = this.reportDone.bind(this);
    this.reportFail = this.reportFail.bind(this);
  }

  componentDidMount() {
    // show tooltip
    showToolReport();

    // show form
    showReportForm();
  }

  onFocus(event) {
    if(event.target.name == 'message') {
      this.setState({
        validMessage: false
      });
    }
  }

  handleSubmit(event) {
    event.preventDefault();

    this.setState({
      loadingApi: true
    });

    const link = this.refs.link;
    const message = this.refs.message;
    var err = false;

    if(message.value === '' || message.value.trim().length === 0 || message.value.length < 3 || message.value.length > 1000) {
      err = true;
      this.setState({msgErrorText: 'Minimum 3 and maximum 1000', validMessage: true, loadingApi: false});
    }

    if(!err) {
      this.setState({
        msgErrorText: '',
        validMessage: false,
      });

      const {lesson_id} = this.props;

      let token = Auth.getToken();
      let userInfo = JSON.parse(localStorage.getItem('infoProfile'));

      let params = {};
      params.token = token;
      params.link = link.value.trim();
      params.message = message.value.trim();
      if(lesson_id !== undefined) {
        params.lesson_id = lesson_id;
      }
      params.user_id = userInfo.id;

      ApiRx.reportIssue(params, this.reportDone, this.reportFail);
    }
  }

  reportDone(data) {
    // console.log('Success', data);
    let _this = this;
    this.setState({
      apiStatus: true,
      loadingApi: false
    });

    setTimeout(function() {
      _this.setState({
        apiStatus: null
      });

      $('#txt_msg').val('');
      $('.icon_report').removeClass('act');
      $('.report_form').hide();
    }, 2000);
  }

  reportFail() {
    // console.log('Error');
    let _this = this;
    this.setState({
      apiStatus: false,
      loadingApi: false
    });

    setTimeout(function() {
      _this.setState({
        apiStatus: null
      });

      $('#txt_msg').val('');
      $('.icon_report').removeClass('act');
      $('.report_form').hide();
    }, 2000);
  }

  render() {
    const {msgErrorText, validMessage, 
          loadingApi, apiStatus} = this.state;

    return (
      <div className={this.props.layoutPr ? this.props.layoutPr : ''}>
        <Header lesson_level={this.props.lesson_level}/>
        <div className="wrapper">
          <Sidebar activeMenu={this.props.mainMenu ? this.props.mainMenu : ''} />
          <div className="main">
            <CourseMobile lesson_level={this.props.lesson_level}/>
            {/* END */}
            {this.props.children}
            <Footer/>
          </div>
        </div>
        {/* END WRAPPER */}
        <div className={s.report_issue + ' report_issue'}>
          <div className={s.report_form + ' report_form'}>

            {apiStatus === true 
            && <div className="alert alert-success">
              Thank you for the report!
            </div>}
            {apiStatus === false 
            && <div className="alert alert-danger">
              Your report is fail!
            </div>}
            {/* END MESSAGE*/}

            <form onSubmit={this.handleSubmit}>
              <div className="form-group">
                <label>Link</label>
                <input 
                ref="link"
                name="link"
                id="ipt_link" 
                type="text" 
                className={s.ipt_link} disabled/>
              </div>
              <div className="form-group">
                <label>Message</label>
                <textarea 
                ref="message"
                name="message"
                id="txt_msg" 
                placeholder="Describe your issue" 
                style={(validMessage) ? {borderColor: '#db0000'} : {}}
                onFocus={this.onFocus}
                className={s.txt_msg}></textarea>
                
                {msgErrorText !== ""
                && validMessage
                && <span className={s.err_msg}>
                  {msgErrorText}
                </span>}
              </div>
              <div className="t-c">
                <button 
                style={(loadingApi) ? {pointerEvents: 'none', backgroundColor: 'rgba(233, 126, 3, 0.56)'} : {}}
                className={s.btn_report + ' btn'}>
                  {loadingApi && <i style={{marginRight: 10}} className="fa fa-circle-o-notch fa-spin "></i>}
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* END FORM */}
          <span className={s.icon_report +  ' icon_report'} 
          data-title="Report the issue!">
            <i className="fa fa-bolt"></i>
          </span>
          {/* END ICON */}
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(Layout);
