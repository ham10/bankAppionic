import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeTransactionPage } from './home-transaction.page';

const routes: Routes = [
  {
    path: '',
    component: HomeTransactionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeTransactionPageRoutingModule {}
