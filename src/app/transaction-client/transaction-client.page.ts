import { Component, OnInit } from '@angular/core';
import {DbService} from "@app/service/db.service";
import {Router} from "@angular/router";
import {ToastController} from "@ionic/angular";
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-transaction-client',
  templateUrl: './transaction-client.page.html',
  styleUrls: ['./transaction-client.page.scss'],
})
export class TransactionClientPage implements OnInit {

  constructor( private db: DbService,
               public formBuilder: FormBuilder,
               private toast: ToastController,
               private router: Router) { }

  ngOnInit() {

  }

    }



