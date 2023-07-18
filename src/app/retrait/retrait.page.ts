import { Component, OnInit } from '@angular/core';
import {ModalController} from "@ionic/angular";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.page.html',
  styleUrls: ['./retrait.page.scss'],
})
export class RetraitPage implements OnInit {
  name!: string;
  mainForm!: FormGroup;
  numeroPhone!: string;
  montant!: string;
  fees!: number;
  Data: any[] = [];
  constructor(private modalCtrl: ModalController,) { }

  ngOnInit() {
  }
  cancel() {
    return this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    return this.modalCtrl.dismiss(this.name, 'confirm');
  }

  inputRetrait(event:any) {
    this.montant=event.target.value;
    let montant=this.montant?parseFloat(this.montant):0;
    this.fees= montant * 0.001;
  }

  storeDataR() {

  }
}
