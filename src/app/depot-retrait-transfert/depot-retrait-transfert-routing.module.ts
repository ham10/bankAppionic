import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DepotRetraitTransfertPage } from './depot-retrait-transfert.page';

const routes: Routes = [
  {
    path: '',
    component: DepotRetraitTransfertPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotRetraitTransfertPageRoutingModule {}
