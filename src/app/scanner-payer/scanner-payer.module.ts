import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScannerPayerPageRoutingModule } from './scanner-payer-routing.module';

import { ScannerPayerPage } from './scanner-payer.page';
import {SharedModule} from "@app/shared";
import {DbService} from "@app/service/db.service";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {BarcodeScanningModalComponent} from "@app/scanner-payer/barcode-scanning-modal.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScannerPayerPageRoutingModule,
    SharedModule
  ],
  providers:[
    DbService
  ],
  declarations: [ScannerPayerPage,BarcodeScanningModalComponent]
})
export class ScannerPayerPageModule {}
