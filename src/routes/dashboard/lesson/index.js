/**
 * React Starter Kit (https://www.reactstarterkit.com/)
 *
 * Copyright © 2014-present Kriasoft, LLC. All rights reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.txt file in the root directory of this source tree.
 */

import React from 'react';
import Lesson from './Lesson';
import Layout from '../../../components/Layout';

export default {

  // path: '/lesson/:id/', // <- xoa cai này đi
  // path: '/lesson/:id/card/:card_id',
  path: '/lesson/:id/level/:levelId/:lessonId',

  async action({ params }) {

    return {
      title: 'Lesson',
      component: <Layout lesson_id={params.id} layoutPr="no-level"><Lesson
                                                lesson_id={params.id}
                                                levelId={params.levelId}
                                                lessonId={params.lessonId}
                                              /></Layout>,
    };
  },

};
