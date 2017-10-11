
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
//import bcrypt from 'bcrypt';

import { User } from '../models';
import { auth } from '../../config';
import UserType from '../types/UserType';

const login = {
  type: UserType,
  args: {
    username: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    // token: { type: new NonNull(StringType) },
  },
  async resolve({ request }, { username, password }) {
    const usernameLogin = username.toLowerCase();
    // const passwordHashed = bcrypt.hashSync(password.trim(), 10);
    // console.log('data username',username);
    user = {
      username : usernameLogin,
      token : token
    };
    return user;
  },
};

export default login;
