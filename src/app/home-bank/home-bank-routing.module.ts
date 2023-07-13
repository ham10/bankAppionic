import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeBankPage } from './home-bank.page';

const routes: Routes = [
  {
    path: '',
    component: HomeBankPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeBankPageRoutingModule {}
