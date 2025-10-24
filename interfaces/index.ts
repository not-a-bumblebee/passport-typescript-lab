import { Strategy } from 'passport';
import { Profile } from 'passport-github2';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

declare global {
    namespace Express {
        interface User {
            id?: number;
            name?: string;
            email?: string;
            password?: string;
            githubID?: number;
            role?: 'admin' | 'user';
        }
    }
}


declare module 'express-session' {
    interface SessionStore {
        sessions?: Record<string, string>,
        all?: CallableFunction

    }
    interface SessionData {
        messages?: string[],
        profile?: Profile,
        passport?: { user: number }
    }

    interface User extends Express.User {
        id?: number,
        name?: string,
        email?: string,
        password?: string,
        githubID?: number,
        role?: "admin" | "user"
    }


}


