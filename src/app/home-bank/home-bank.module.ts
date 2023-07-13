import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeBankPageRoutingModule } from './home-bank-routing.module';

import { HomeBankPage } from './home-bank.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomeBankPageRoutingModule
  ],
  declarations: [HomeBankPage]
})
export class HomeBankPageModule {}
