import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HomeTransactionPageRoutingModule } from './home-transaction-routing.module';

import { HomeTransactionPage } from './home-transaction.page';
import {DbService} from "@app/service/db.service";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HomeTransactionPageRoutingModule
  ],
  providers:[
    DbService,
    SQLite,
    SQLitePorter
  ],
  declarations: [HomeTransactionPage]
})
export class HomeTransactionPageModule {}
