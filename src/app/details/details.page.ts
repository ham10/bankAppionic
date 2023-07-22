import {Component, Input, OnInit} from '@angular/core';
import {ModalController} from "@ionic/angular";

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  Data: any[] = [];
  typeTransaction!:string;
  dateTransaction!:string;
  montant!:string;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
  }
  cancel() {
    return this.modalCtrl.dismiss(this.Data);
  }

}
