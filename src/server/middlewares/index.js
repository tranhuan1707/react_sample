/**
 * Middleware NODEjs
 * Created by MinhNguyenWP on 06/2017.
 */

import express from 'express';
// import authorizedRoutes from '../routes/authorized';

const middleware = express();

middleware.use(['/login'], (req, res, next) => {
  //console.log('mdw id_token', req.cookies.key_token);
  if (req.cookies.key_token) {
    return res.redirect('/');
  }

  return next();
});

middleware.use(/^\/((?!(login|register)$).)*$/, (req, res, next) => {
  //console.log('mdw key toooooken', req.cookies.key_token);
  // Check user token for user login state
  if (!req.cookies.key_token) {
    return res.redirect('/login');
  }

  return next();
});

///middleware.use(authorizedRoutes);

export default middleware;
