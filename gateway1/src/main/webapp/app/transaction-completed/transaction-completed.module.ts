import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { GatewaySharedModule } from '../shared';
import { RouterModule } from '@angular/router';
import { transactionRoute, TransactionPageComponent } from '.';
import { FormsModule } from '@angular/forms';

@NgModule ({
    imports: [
        GatewaySharedModule,
        RouterModule.forChild([ transactionRoute ]),
        FormsModule
    ],
    declarations: [
        TransactionPageComponent
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
    bootstrap: [
        TransactionPageComponent
    ]
})

export class TransactionPageModule {}
