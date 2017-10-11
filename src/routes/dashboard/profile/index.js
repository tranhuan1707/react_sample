/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Profile from './Profile';
import Layout from '../../../components/Layout';

export default {

  path: '/profile',

  async action({ store }) {
    return {
      title: 'Profile',
      component: <Layout><Profile /></Layout>,
    };
  },

};
