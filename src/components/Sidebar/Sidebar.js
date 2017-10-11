/** MinhNguyenWP Team
 * created on : 05.2017
  */
/* global $, jQuery */
import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Sidebar.css';
import Link from '../Link';

// Import Component
import SubMenu from './SubMenu';

// 6. jQ: Click submenu Left sidebar
function submenuSidebar(_this) {

  $('.has-sub-menu > a').on('click', (e) => {
    e.preventDefault();
    var $parent = $(e.target).closest('li');
    if($parent.hasClass('open')) {
      $parent.removeClass('open');
    } else {
      $parent.addClass('open');
    }
  });
}

class Sidebar extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          authenticated : true,
      }
  }

  componentDidMount() {
    submenuSidebar(this);
  }

  render() {
    const {authenticated} = this.state;
    return (
      <div className="left-sidebar" ref='leftMenu'>
        {authenticated && <div className="sidebar-nav">
          <ul >
            <li
                className={(this.props.activeMenu === '') ? 'open active' : ''}>
                <Link to={"/"}>
                <i className="fa fa-home"></i>
                <span className="title">Home</span>
                </Link>
            </li>
            <li className="has-sub-menu">
                <Link to="#smenu1">
                    <i className="fa fa-cog"></i>
                    <span className="title">Courses</span>
                    <span className="arrow">
                        <i className="fa fa-angle-up"></i>
                        <i className="fa fa-angle-down"></i>
                    </span>
                </Link>
                <SubMenu/>
            </li>
            <li className={`${(this.props.activeMenu == 'result') ? 'open active' : ''}`}>
              <Link to={"/result"} ><i className="fa fa-list"></i><span className="title">Result</span></Link></li>
          </ul>
        </div>}
      </div>
    );
  }
}

export default withStyles(s)(Sidebar);
