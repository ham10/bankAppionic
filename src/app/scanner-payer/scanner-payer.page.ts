import {Component, Input, NgZone, OnInit, ViewChild} from '@angular/core';
import {AlertController, ModalController, Platform, ToastController} from "@ionic/angular";
import {Barcode, BarcodeFormat, BarcodeScanner, LensFacing} from "@capacitor-mlkit/barcode-scanning";
import {FormBuilder, FormGroup, NgForm, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {DialogService} from "@app/core";
import {HttpClient} from "@angular/common/http";
import {DbService} from "@app/service/db.service";
import {Router} from "@angular/router";
import {BarcodeScanningModalComponent} from "@app/scanner-payer/barcode-scanning-modal.component";
import {FilePicker} from "@capawesome/capacitor-file-picker";

@Component({
  selector: 'app-scanner-payer',
  templateUrl: './scanner-payer.page.html',
  styleUrls: ['./scanner-payer.page.scss'],
})
export class ScannerPayerPage implements OnInit {
  @ViewChild('scannForm') scannForm!: NgForm;
  mainForm!: FormGroup;
  @Input() Data: any[] = [];
  @Input() id!: number;
  numeroPhone!: string;
  montant!:string;
  typeTransaction!: string;
  fees!: number;
  togleV!: string;
  numeroPhoneB!: string;
  qrCode!:string;
  boolTans=false;

  /***Barcodes*****/
  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
    googleBarcodeScannerModuleInstallState: new UntypedFormControl(0),
    googleBarcodeScannerModuleInstallProgress: new UntypedFormControl(0),
  });
  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  private readonly GH_URL =
    'https://github.com/capawesome-team/capacitor-barcode-scanning';

  /****Barcodes******/
  constructor(private modalCtrl: ModalController,
              private readonly dialogService: DialogService,
              private platform: Platform,
              private httpClient: HttpClient,
              private db: DbService,
              public formBuilder: FormBuilder,
              private toast: ToastController,
              private router: Router,
              private readonly ngZone: NgZone,
              private alertController:AlertController) { }

  ngOnInit() {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
    BarcodeScanner.removeAllListeners().then(() => {
      BarcodeScanner.addListener(
        'googleBarcodeScannerModuleInstallProgress',
        (event) => {
          this.ngZone.run(() => {
            console.log('googleBarcodeScannerModuleInstallProgress', event);
            const {state, progress} = event;
            this.formGroup.patchValue({
              googleBarcodeScannerModuleInstallState: state,
              googleBarcodeScannerModuleInstallProgress: progress,
            });
          });
        }
      );
    });
  }
  cancel() {
    return this.modalCtrl.dismiss(this.Data);
  }

  /***Barcode***/
  public async startScan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const lensFacing =
      this.formGroup.get('lensFacing')?.value || LensFacing.Back;
    const element = await this.dialogService.showModal({
      component: BarcodeScanningModalComponent,
      // Set `visibility` to `visible` to show the modal (see `src/theme/variables.scss`)
      cssClass: 'barcode-scanning-modal',
      showBackdrop: false,
      componentProps: {
        formats: formats,
        lensFacing: lensFacing,
      },
    });
    element.onDidDismiss().then((result) => {
      const barcode: Barcode | undefined = result.data?.barcode;
      if (barcode) {
        this.barcodes = [barcode];
      }
    });
  }
  /******Read Barcode from image**********/
  public async readBarcodeFromImage(): Promise<void> {
    const {files} = await FilePicker.pickImages({multiple: false});
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || [];
    const {barcodes} = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats,
    });
    this.barcodes = barcodes;
  }
  /******Scan Barcode with Scanner Google**********/
  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const {barcodes} = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
  }
  /******Open Settings App**********/
  public async openSettings(): Promise<void> {
    await BarcodeScanner.openSettings();
  }
  /******Install Google Barcode Scanner Module**********/
  public async installGoogleBarcodeScannerModule(): Promise<void> {
    await BarcodeScanner.installGoogleBarcodeScannerModule();
  }
  /******Permission **********/
  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

  public openOnGithub(): void {
    window.open(this.GH_URL, '_blank');
  }


  /***Barcodes*****/
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
  /****Save Data From Scan******/
  storeDataFromScann() {
    this.db.addTransactionTransfert(
      '',
      '',
      '',
      this.typeTransaction,
      this.montant,
      '19/07/2023',
      this.qrCode,
      this.numeroPhone,
      this.fees,
      '',
      '',
      this.numeroPhoneB,
      '',
      ''
    ).then((res) => {
      this.boolTans=true;
    })

  }
  async presentAlertScann() {
    const alert = await this.alertController.create({
      header: this.typeTransaction,
      subHeader: '',
      message: 'Transaction  effectué avec succes!',
      buttons: ['OK'],
    });
    await alert.present();
    this.modalCtrl.dismiss(this.Data, 'presentAlertScann');

  }
}
