import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotRetraitTransfertPageRoutingModule } from './depot-retrait-transfert-routing.module';

import { DepotRetraitTransfertPage } from './depot-retrait-transfert.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DepotRetraitTransfertPageRoutingModule
  ],
  declarations: [DepotRetraitTransfertPage]
})
export class DepotRetraitTransfertPageModule {}
