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
import s from './NotFound.css';
import Link from '../../components/Link';

class NotFound extends React.Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
  };

  componentDidMount() {
    hideLogoAndLeftSb();
  }

  render() {
    return (
      <div className={["notfound", "login-form"].join(' ')}>
        <div className={"inner"}>
          <h2 className={"sub-title fontNino"}>404</h2>
          <div className="ct-blk">
            <h1 className={"m-title fontNino"}>{this.props.title}</h1>
            <p>Sorry, the page you were trying to view does not exist.</p>
            <p>Please go to&nbsp;
              <Link to={"/"}>home page</Link>!</p>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(NotFound);
