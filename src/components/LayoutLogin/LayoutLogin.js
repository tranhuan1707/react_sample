/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import { findDOMNode, ReactDOM } from 'react-dom';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
import s from './LayoutLogin.css';
import Header from '../Header';
import Sidebar from '../Sidebar';
import Footer from '../Footer';

class LayoutLogin extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  render() {
    return (
      <div className={s.root} style={{'backgroundImage': 'url(images/logo-background.png)'}}>
        <div className="wrapper">
            <section className="main">
                {this.props.children}
            </section>
        </div>
      </div>
    );
  }
}

export default withStyles(normalizeCss, s)(LayoutLogin);
