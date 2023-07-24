import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {FormGroup, NgForm} from "@angular/forms";
import {DbService} from "@app/service/db.service";
import {error} from "@angular/compiler-cli/src/transformers/util";
import {document} from "ionicons/icons";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  name!: string;
  togleV!: string;
  mainForm!: FormGroup;
  numeroPhone!: string;
  montant!: string;
  fees!: number;
  Data: any[] = [];
  @ViewChild('retraitForm') retraitForm!: NgForm;
  constructor(private modalCtrl: ModalController,
              private db: DbService,
              private alertController: AlertController) { }

  ngOnInit() {
  }
  /***Cancel Modal Retrait*******/
  cancel() {
    return this.modalCtrl.dismiss(this.Data);
  }

  // presentAlert() {
  //   return this.modalCtrl.dismiss(this.name, 'presentAlert');
  // }
  /****** Calcul Fees Retrait**********/
  inputRetrait(event:any) {
    if (this.togleV) {
      this.fees= 0;
    } else {
      this.montant=event.target.value;
      let montant=this.montant?parseFloat(this.montant):0;
      this.fees= montant * 0.001;
    }

  }
  /****** Save Data For Withdrawal**********/
  storeDataR() {
    this.db.addTransByNumberAmount(
      'ham@outlook.fr',
      'Hamidou',
      '',
      'Retrait',
      this.montant,
      new Date(),
      'erfgthjklm',
      this.numeroPhone,
      this.fees,
    ).then((res) => {
      // this.depositForm.resetForm();
      //
    })
  }

  async presentAlertRetr() {
    const alert = await this.alertController.create({
      header: 'Retrait',
      subHeader: '',
      message: 'Retrait effectué avec succes!',
      buttons: ['OK'],
    });
    await alert.present();
    this.modalCtrl.dismiss(this.Data, 'presentAlertRetr');

  }
}
