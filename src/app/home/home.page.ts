import {Component, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {FingerprintAIO} from "@ionic-native/fingerprint-aio/ngx";
import {NavController, ToastController, NavParams, AlertController} from "@ionic/angular";
import {Storage} from "@ionic/storage-angular"
import * as CryptoJs from "crypto-js";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [NavParams]

})
export class HomePage {
  isAlertOpen = false;
  public alertButtons = ['OK'];
  passcode:any;
  pageStatus:any;
  codeone:any;
  codetwo:any;
  codethree:any;
  codefour:any;
  int :any;
  newPincount :any;
  message :any;
  finalPin :any;
  fingerPin :any;
  public secretKey="je suis seul";
  public pinCrypt!: any;

  constructor(
    public faio: FingerprintAIO,
    public toastCtrl: ToastController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: Storage,
    private alertController: AlertController)
  {
    this.passcode = '';
    this.finalPin = '';
    this.message = true;
    this.pageStatus = "Enter Pin"
    this.int = 0;
    this.newPincount = 0;
    this.fingerPin = false;
  }

  add(value:any) {
    this.storage.set('secure','Securitypin');
    this.storage.get('Securitypin').then((Securitypin) => {

      if(this.passcode.length < 4) {
        this.passcode = this.passcode + value;
        if(this.int == 0){
          this.codeone = value;
          this.int++
        }else if(this.int == 1){
          this.codetwo = value;
          this.int++
        }else if(this.int == 2){
          this.codethree = value;
          this.int++
        }else if(this.int == 3){
          this.codefour = value;
          this.int++
        }
        if(this.passcode.length == 4) {
          if(this.newPincount > 0){
            if(	this.finalPin == this.codeone+this.codetwo+this.codethree+this.codefour){
              this.navCtrl.navigateRoot("/home-transaction").then(() => {

              });
              console.log("passwordMatched")
              this.message = true;
            }else{
              this.message = false;
            }
          }else{

            this.pageStatus = "Confirm Pin"
            this.newPincount++
            this.finalPin = this.codeone+this.codetwo+this.codethree+this.codefour

            this.pinCrypt= CryptoJs.AES.encrypt( this.finalPin,this.secretKey).toString();
            console.log("The four digit code was entered",	this.pinCrypt);
            this.codeone = null;
            this.codetwo= null;
            this.codethree = null;
            this.codefour = null;
            this.passcode = '';
            this.int = 0

          }
        }
      }
    })
  }

  delete() {
    if(this.passcode.length > 0) {
      if(this.passcode.length == 1){
        this.codeone = null
        this.int--
      }else if(this.passcode.length == 2){
        this.codetwo = null;
        this.int--
      }else if(this.passcode.length == 3){
        this.codethree = null;
        this.int--
      }else if(this.passcode.length == 4){
        this.codefour = null;
        this.int--
      }
      this.passcode = this.passcode.substr(0, this.passcode.length - 1);
    }
  }

  goTo(){
    this.navCtrl.navigateRoot("/home-transaction").then(() => {

    });
  }
  open(){
  //   this.faio.show({
  //     clientId: 'Fingerprint-Demo',
  //     clientSecret: 'password', //Only necessary for Android
  //     disableBackup:true,  //Only for Android(optional)
  //     localizedFallbackTitle: 'Use Pin', //Only for iOS
  //     localizedReason: 'Please authenticate' //Only for iOS
  //   })
  //     .then((result: any) =>
  //
  //       this.goTo()
  //     )
  //     .catch((error: any) =>
  //       console.log(error)
  //     );
    this.faio.show({
      title: 'Biometric Authentication', // (Android Only) | optional | Default: "<APP_NAME> Biometric Sign On"
      subtitle: 'Coolest Plugin ever', // (Android Only) | optional | Default: null
      description: 'Please authenticate',// optional | Default: null
      fallbackButtonTitle: 'Use Backup', // optional | When disableBackup is false defaults to "Use Pin".
                                         // When disableBackup is true defaults to "Cancel"
      disableBackup:true,  // optional | default: false
    })
      .then((result: any) => console.log(result))
      .catch((error: any) => console.log(error));
   }


  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      subHeader: 'Important message',
      message: 'This is an alert!',
      buttons: ['OK'],
    });

    await alert.present();
  }
}
