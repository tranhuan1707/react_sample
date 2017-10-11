
import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
//import bcrypt from 'bcrypt';

import UserType from '../types/UserType';

const login = {
  type: UserType,
  args: {
    username: { type: new NonNull(StringType) },
    password: { type: new NonNull(StringType) },
    // token: { type: new NonNull(StringType) },
  },
  async resolve({ request }, { username, password}, { res }) {
    // const usernameLogin = username.toLowerCase();
    // const passwordHashed = bcrypt.hashSync(password.trim(), 10);
    if (request.cookies.id_token) {
      throw new Error('You have already logged in.');
    }

    const user = {
      id: 'sample',
      username : username,
      token : password
    };

    // Set token to cookie with specified expiry time
    let expiresIn = 60 * 120 * 10; // 120 mins
    res.cookie('key_token', password, {
      maxAge: 1000 * expiresIn,
      httpOnly: true,
    });

    return user;
  },
};

export default login;
