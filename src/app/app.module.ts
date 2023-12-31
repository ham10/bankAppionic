import {CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {IonicStorageModule} from "@ionic/storage-angular";
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {HomePageModule} from "./home/home.module";
import {GlobalErrorHandlerService} from "@app/core";
import {HttpClientModule} from "@angular/common/http";
import {DbService} from "@app/service/db.service";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {SQLite} from "@ionic-native/sqlite/ngx";


@NgModule({
  declarations: [AppComponent],
  imports: [
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HomePageModule,
    HttpClientModule,


  ],

  providers: [
    FingerprintAIO,
    SQLitePorter,
    SQLite,
    DbService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    {
      provide: ErrorHandler,
      useClass: GlobalErrorHandlerService,
    },],
  bootstrap: [AppComponent],
})
export class AppModule {}
