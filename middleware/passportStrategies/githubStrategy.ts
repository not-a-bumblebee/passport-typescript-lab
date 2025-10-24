import { Strategy as GitHubStrategy, Profile } from 'passport-github2';
import { PassportStrategy } from '../../interfaces/index';
import { Request } from 'express';
import { userModel } from '../../models/userModel';
import * as dotenv from 'dotenv'
dotenv.config()



const githubStrategy: GitHubStrategy = new GitHubStrategy(
    {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: "http://127.0.0.1:8000/auth/github/callback",
        passReqToCallback: true,
    },

    /* FIX ME 😭 */
    async (req: Request, accessToken: string, refreshToken: string, profile: Profile, done: CallableFunction) => {
        let user = userModel.findOrCreate({ id: parseInt(profile.id), name: profile.displayName || profile.username })

        return done(null, user);

    },
);

const passportGitHubStrategy: PassportStrategy = {
    name: 'github',
    strategy: githubStrategy,
};

export default passportGitHubStrategy;
