import { Component, OnInit } from '@angular/core';
import {FormGroup, NgForm} from "@angular/forms";
import {SubscribeService} from "./subscribe.service";
import * as CryptoJs from 'crypto-js';




@Component({
  selector: 'app-subscribe',
  templateUrl: './subscribe.page.html',
  styleUrls: ['./subscribe.page.scss'],
})
export class SubscribePage {
  screen!: string ;
  formData!: FormGroup;
  login_user!: string;
  login_password!: string;
  email!:string;
  public secretKey="je suis introuvable";




  constructor(public subscribeService: SubscribeService) { }

  async  loginForm(form:NgForm){
    // console.log("request Data", form.value.login_user);
    await this.subscribeService.set('name',form.value.login_user,);
    var encryptMessage=CryptoJs.AES.encrypt(form.value.login_password,this.secretKey).toString();
    await this.subscribeService.set('password',encryptMessage);
    await this.subscribeService.set('email',form.value.email,);
  }
  // async setValue(){
  //   await this.subscribeService.set('name',e.value.login_user);
  // }

  async  getValue(){
    const nameValue =await this.subscribeService.get('name');
    const passworValue=await this.subscribeService.get('password');
  }
}
