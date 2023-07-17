import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DepotRetraitTransfertPageRoutingModule } from './depot-retrait-transfert-routing.module';

import { DepotRetraitTransfertPage } from './depot-retrait-transfert.page';
import {DbService} from "@app/service/db.service";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    DepotRetraitTransfertPageRoutingModule
  ],
  providers:[
    DbService,
    SQLite,
    SQLitePorter
  ],
  declarations: [DepotRetraitTransfertPage]
})
export class DepotRetraitTransfertPageModule {}
