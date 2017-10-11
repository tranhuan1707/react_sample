/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import LayoutLogin from '../../components/LayoutLogin';
import Login from './Login';

const title = 'Log In';

export default {

  path: '/login',

  async action({store}) {
    return {
      title,
      component: <LayoutLogin><Login title={title} /></LayoutLogin>,
    };
  },

};
