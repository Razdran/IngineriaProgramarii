import { Route } from '@angular/router';
import { TransactionPageComponent } from './transaction-completed.component';

export const transactionRoute: Route = {
    path: 'transaction-completed',
    component: TransactionPageComponent,
    data: {
        authorities: [],
        pageTitle: 'Transaction-completed'
    }
};
