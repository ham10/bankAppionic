import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransactionClientPageRoutingModule } from './transaction-client-routing.module';

import { TransactionClientPage } from './transaction-client.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransactionClientPageRoutingModule
  ],
  declarations: [TransactionClientPage]
})
export class TransactionClientPageModule {}
