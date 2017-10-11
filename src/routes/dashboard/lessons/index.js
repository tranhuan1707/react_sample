/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Lessons from './Lessons';
import Layout from '../../../components/Layout';

export default {
  path: '/',

  children: [
    {
      path: '/',
      async action({ params }) {
        return {
          title: 'Lessons',
          component: <Layout><Lessons/></Layout>,
        };
      },
    },
    {
      path: '/lessons/:level',
      async action({ params }) {
        return {
          title: 'Lessons',
          component: <Layout lesson_level={params.level}><Lessons lesson_level={params.level}/></Layout>,
        };
      },
    }
  ]
};
