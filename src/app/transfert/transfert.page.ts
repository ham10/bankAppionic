import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";
import {DbService} from "@app/service/db.service";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.page.html',
  styleUrls: ['./transfert.page.scss'],
})
export class TransfertPage implements OnInit {
  @ViewChild('transfertForm') transfertForm!: NgForm;
  boolTans=false;
  numeroPhone!: string;
  nameSender!: string;
  surnameSender!: string;
  montant!: string;
  fees!: number;
  numberB!: string;
  nameB!: string;
  surnameB!: string;
  numeroPhoneB!: string;
  togleV!: string;
  name!: string;

  constructor(private modalCtrl: ModalController,
              private db: DbService,
              private alertController:AlertController) {
  }

  ngOnInit() {
  }

  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  storeDatatTransfert() {
    this.db.addTransactionTransfert(
      '',
      '',
      '',
      'Transfert',
      this.montant,
      '19/07/2023',
      'LOKIUHYGFFHGFH86568',
      this.numeroPhone,
      this.fees,
      this.nameSender,
      this.surnameSender,
      this.numeroPhoneB,
      this.nameB,
      this.surnameB,
    ).then((res) => {
      this.boolTans=true;
    })

  }

  inputRetrait(event: any) {
    if (this.togleV) {
      this.fees = 0;
    } else {
      this.montant = event.target.value;
      let montant = this.montant ? parseFloat(this.montant) : 0;
      this.fees = montant * 0.001;
    }
  }
  async presentAlertTr() {

    const alert = await this.alertController.create({
      header: 'Transfert',
      subHeader: '',
      message: 'Transfert effectué avec succes!',
      buttons: ['OK'],
    });
    await alert.present();
    this.db.fetchTransactionClients();
    this.modalCtrl.dismiss(this.name, 'presentAlertTr');
  }
}
