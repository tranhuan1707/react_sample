import {
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
} from 'graphql';
import UserType from '../types/UserType';

const logout = {
  type: UserType,
  args: {
    username: { type: StringType },
    password: { type: StringType },
    // token: { type: new NonNull(StringType) },
  },
  resolve: async ({ request }, args, { res }) => {
    if (!request.cookies.key_token) {
      throw new Error('You are not logged in.');
    }
    const user = {
      id: 'sample',
      username : 'out'
    };
    res.clearCookie('key_token');
    // res.redirect('/login');
    return user;
  },
};

export default logout;
