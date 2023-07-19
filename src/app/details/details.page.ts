import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  @Input() Data = [];
  typeTransaction!:string;
  dateTransaction!:string;
  montant!:string;

  constructor() { }

  ngOnInit() {
  }


}
