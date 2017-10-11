/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './Footer.css';
import Link from '../Link';

class Footer extends React.Component {
  constructor(props) {
      super(props);

      this.state = {
          authenticated : false
      }
  }

  componentDidMount() {
      if(localStorage.getItem('user_access')) {
          this.setState({authenticated: true})
      }
  }

  render() {
    const {authenticated} = this.state;
    return (
      <footer className="footer t-c">
        {authenticated && <span>2017 © English Town. All Rights Reserved.</span>}</footer>
    );
  }
}

export default withStyles(s)(Footer);
