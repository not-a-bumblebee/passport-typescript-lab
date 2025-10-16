import { Strategy } from 'passport';

export interface PassportStrategy {
    name: string;
    strategy: Strategy;
}

declare module 'express-session' {
    interface SessionData {
        messages?: string[]
    }
}