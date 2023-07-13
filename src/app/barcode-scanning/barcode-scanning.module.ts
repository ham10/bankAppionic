import {CUSTOM_ELEMENTS_SCHEMA, NgModule} from '@angular/core';

import { BarcodeScanningRoutingModule } from './barcode-scanning-routing.module';

import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import { BarcodeScanningPage } from './barcode-scanning.page';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [ BarcodeScanningRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [BarcodeScanningPage, BarcodeScanningModalComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class BarcodeScanningModule {}

