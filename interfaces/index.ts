import { Strategy } from 'passport';
import { Profile } from 'passport-github2';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

declare module 'express-session' {
    interface SessionData {
        messages?: string[],
        profile?:Profile
    }
}