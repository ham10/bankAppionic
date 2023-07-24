import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScannerPayerPage } from './scanner-payer.page';

const routes: Routes = [
  {
    path: '',
    component: ScannerPayerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScannerPayerPageRoutingModule {}
