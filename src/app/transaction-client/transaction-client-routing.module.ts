import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransactionClientPage } from './transaction-client.page';

const routes: Routes = [
  {
    path: '',
    component: TransactionClientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransactionClientPageRoutingModule {}
