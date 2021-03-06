import { Resolvers } from '@type/resolvers';
import {
  FacebookConnectMutationArgs,
  FacebookConnectResponse,
} from '@type/graph';
import User from '@entities/User';
import createJWT from '@utils/createJWT';

const resolver: Resolvers = {
  Mutation: {
    FacebookConnect: async (
      _,
      args: FacebookConnectMutationArgs
    ): Promise<FacebookConnectResponse> => {
      const { fbId } = args;

      try {
        const existingUser = await User.findOne({ fbId });

        if (existingUser) {
          const token = createJWT(existingUser.id);

          return {
            ok: true,
            error: null,
            token,
          };
        } else {
          const newUser = await User.create({
            ...args,
            profilePhoto: `http://graph.facebook.com/${fbId}/picture?type=square`,
          }).save();
          const token = createJWT(newUser.id);

          return {
            ok: true,
            error: null,
            token,
          };
        }
      } catch (error) {
        return {
          ok: false,
          error: error.message,
          token: null,
        };
      }
    },
  },
};
export default resolver;
