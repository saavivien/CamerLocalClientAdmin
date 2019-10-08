import { NbAuthResult } from '@nebular/auth';
import { AuthToken } from './auth.token';

export class AuthResult extends NbAuthResult {
    protected success: boolean;
    protected response?: any;
    protected redirect?: any;
    protected token: AuthToken;
    protected errors: string[];
    protected messages: string[];
    constructor(success: boolean, response?: any, redirect?: any, errors?: any, messages?: any, token?: AuthToken) {
        super(success, response, redirect, errors, messages, token);
    }
    getResponse(): any {
        return this.response;
    }
    getToken(): AuthToken {
        return this.token;
    }
    getRedirect(): string {
        return this.redirect;
    }
    getErrors(): string[] {
        return this.errors;
    }
    getMessages(): string[] {
        return this.messages;
    }
    isSuccess(): boolean {
        return this.success;
    }

} 