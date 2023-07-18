import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {FormGroup, NgForm} from "@angular/forms";
import {DbService} from "@app/service/db.service";

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
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  inputRetrait(event:any) {
    if (this.togleV) {
      this.fees= 0;
    } else {
      this.montant=event.target.value;
      let montant=this.montant?parseFloat(this.montant):0;
      this.fees= montant * 0.001;
    }

  }

  storeDataR() {
    this.db.addTransByNumberAmount(
      'ham@outlook.fr',
      'Hamidou',
      '',
      'Retrait',
      this.montant,
      '10/03/1887',
      'erfgthjklm',
      this.numeroPhone,
      this.fees,
    ).then((res) => {
      // this.depositForm.resetForm();
      //
    })
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Retrait',
      subHeader: '',
      message: 'Retrait effectué avec succes!',
      buttons: ['OK'],
    });

    await alert.present();
  }


}
