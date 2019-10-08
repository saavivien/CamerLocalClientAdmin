import { NbAuthSimpleToken } from '@nebular/auth';

export class AuthToken extends NbAuthSimpleToken {
    protected readonly token: any;
    protected createdAt?: Date;
    constructor(token: any, ownerStrategyName: string) {
        super(token, 'email');
        this.token = token;
        ownerStrategyName = 'email';
        this.createdAt = new Date();;
    }
    /**
     * Returns the token's creation date
     * @returns {Date}
     */
    getCreatedAt(): Date {
        return this.createdAt;
    }
    /**
     * Returns the token value
     * @returns string
     */
    getValue(): string {
        return this.token;
    }
    /**
     * Is non empty and valid
     * @returns {boolean}
     */
    isValid(): boolean {
        return this.token != null;
    }
}