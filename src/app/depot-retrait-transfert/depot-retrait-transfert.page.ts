import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormBuilder, FormGroup, NgForm} from "@angular/forms";
import {DbService} from "@app/service/db.service";
import {map, Observable,pipe} from "rxjs";
import {TransactionClient} from "@app/service/transaction-client";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";
@Component({
  selector: 'app-depot-retrait-transfert',
  templateUrl: './depot-retrait-transfert.page.html',
  styleUrls: ['./depot-retrait-transfert.page.scss'],
})
export class DepotRetraitTransfertPage implements OnInit {
  @Input() numTel!: string;
  name!: string;
  mainForm!: FormGroup;
  numeroPhone!: string;
  montant!: string;
  fees!: number;
  Data: any[] = [];
  togleV!: string;
  @ViewChild('depositForm') depositForm!: NgForm;

  constructor(private modalCtrl: ModalController,
              public formBuilder: FormBuilder,
              private db: DbService,
              private router: Router
  ) {
  }

  ngOnInit(): void {
    this.mainForm = this.formBuilder.group({
      numeroPhone: [''],
      email: [''],
      name: [''],
      password: [''],
      typeTransaction: [''],
      montant: [''],
      numero: [''],
      date: [''],
      qrcode: [''],
      fees: 0
    })
      console.log(this.depositForm.value.numeroPhone);
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  storeData() {
    this.db.addTransByNumberAmount(
      'ham@outlook.fr',
      'Hamidou',
      '',
      'Depot',
      this.montant,
      '17/03/1986',
      'erfgthjklm',
      this.numeroPhone,
      this.fees,
    ).then((res) => {
     // this.depositForm.resetForm();
      console.log('Data bien En registree');
    })

  }

  // storeDataObservable(){
  //   this.db.addTransByNumberAmount(
  //     'ham@outlook.fr',
  //     'Hamidou',
  //     '',
  //     'Retrait',
  //     this.mainForm.value.montant,
  //     '12/03/1996',
  //     'erfgthjklm',
  //     this.mainForm.value.numeroPhone,
  //     this.mainForm.value.fees)
  //
  // }
inputDepot(event:any) {
  if (this.togleV) {
    this.fees= 0;
  } else {
    this.montant=event.target.value;
    let montant=this.montant?parseFloat(this.montant):0;
    this.fees= montant * 0.00;
  }
  }
  inputFrais(event:any){
    this.montant=event.target.value;
    let montant=this.montant?parseFloat(this.montant):0;
    this.fees= montant * 0.001;

  }

}
