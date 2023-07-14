import {CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';

import { BarcodeScanningRoutingModule } from './barcode-scanning-routing.module';

import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanningPage } from './barcode-scanning.page';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {DbService} from "@app/service/db.service";
import {CommonModule} from "@angular/common";

@NgModule({
  imports: [ BarcodeScanningRoutingModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BarcodeScanningPage, BarcodeScanningModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
  ],

  providers:[
    DbService,
    SQLite,
    SQLitePorter
  ]
})
export class BarcodeScanningModule {}

