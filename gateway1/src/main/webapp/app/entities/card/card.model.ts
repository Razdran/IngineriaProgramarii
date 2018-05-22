import { BaseEntity } from './../../shared';

export class Card implements BaseEntity {
    constructor(
        public id?: number,
        public number?: string,
        public expirationDate?: any,
        public name?: string,
        public ccv?: string,
    ) {
    }
}
