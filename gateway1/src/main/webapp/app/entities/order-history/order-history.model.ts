import { BaseEntity } from './../../shared';

export class OrderHistory implements BaseEntity {
    constructor(
        public id?: number,
        public ticketUserId?: string,
        public ticketFlightID?: number,
        public ticketPlaneType?: number,
        public ticketPrice?: number,
        public creditCardId?: number,
        public cardId?: number,
    ) {
    }
}
