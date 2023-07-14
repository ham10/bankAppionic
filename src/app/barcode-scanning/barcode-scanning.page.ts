import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup} from '@angular/forms';
import { DialogService } from '@app/core';
import {
  Barcode,
  BarcodeFormat,
  BarcodeScanner,
  LensFacing,
} from '@capacitor-mlkit/barcode-scanning';
import { FilePicker } from '@capawesome/capacitor-file-picker';
import { BarcodeScanningModalComponent } from './barcode-scanning-modal.component';
import {Platform, ToastController} from "@ionic/angular";
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {TransactionClient} from "@app/service/transaction-client";
import {DbService} from "@app/service/db.service";
import {Router} from "@angular/router";
import { BehaviorSubject, Observable } from 'rxjs';


@Component({
  selector: 'app-barcode-scanning',
  templateUrl: './barcode-scanning.page.html',
  styleUrls: ['./barcode-scanning.page.scss'],
})
export class BarcodeScanningPage implements OnInit {
  private storage!: SQLiteObject;
  transactionCList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  mainForm!: FormGroup;
  Data: any[] = [];

  public readonly barcodeFormat = BarcodeFormat;
  public readonly lensFacing = LensFacing;

  public formGroup = new UntypedFormGroup({
    formats: new UntypedFormControl([]),
    lensFacing: new UntypedFormControl(LensFacing.Back),
  });
  public barcodes: Barcode[] = [];
  public isSupported = false;
  public isPermissionGranted = false;

  private readonly GH_URL =
    'https://github.com/capawesome-team/capacitor-barcode-scanning';

  constructor(private readonly dialogService: DialogService,
              private platform: Platform,
              private sqlite: SQLite,
              private httpClient: HttpClient,
              private sqlPorter: SQLitePorter,

              private db: DbService,
              public formBuilder: FormBuilder,
              private toast: ToastController,
              private router: Router) {
    this.platform.ready().then(() => {
    this.sqlite
      .create({
        name: 'positronx_db.db',
        location: 'default',
      })
      .then((db: SQLiteObject) => {
        this.storage = db;
        this.getFakeData();
      });
  });}
  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchTransactionClients(): Observable<TransactionClient[]> {
    return this.transactionCList.asObservable();
  }
  // Render fake data
  getFakeData() {
    this.httpClient
      .get('assets/dump.sql', { responseType: 'text' })
      .subscribe((data) => {
        this.sqlPorter
          .importSqlToDb(this.storage, data)
          .then((_) => {
            this.getTransactionClient();
            this.isDbReady.next(true);
          })
          .catch((error) => console.error(error));
      });
  }
  // Get list
  getTransactionClient() {
    return this.storage
      .executeSql('SELECT * FROM transactionClient', [])
      .then((res) => {
        let items: TransactionClient[] = [];
        if (res.rows.length > 0) {
          for (var i = 0; i < res.rows.length; i++) {
            items.push({
              id: res.rows.item(i).id,
              client_email: res.rows.item(i).client_email,
              client_name: res.rows.item(i).client_name,
              client_password: res.rows.item(i).client_password,
              typeTransaction: res.rows.item(i).typeTransaction,
              montant: res.rows.item(i).montant,
              dateTransaction: res.rows.item(i).dateTransaction,
              qrCode: res.rows.item(i).qrCode,
              numeroPhone:res.rows.item(i).numeroPhone

            });
          }
        }
        this.transactionCList.next(items);
      });
  }
  // Add
  addTransactionClientByNumber(numeroPhone: any,montant:any)  {
    let data = [numeroPhone, montant];
    return this.storage
      .executeSql(
        'INSERT INTO transactionClient (id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone) VALUES (?, ?,?,?,?,?,?,?)',
        data
      )
      .then((res) => {
        this.getTransactionClient();
      });
  }
  // Get single transactionById
  getOneTransaction(id: any): Promise<TransactionClient> {
    return this.storage
      .executeSql('SELECT * FROM transactionClient WHERE id = ?', [id])
      .then((res) => {
        return {
          id: res.rows.item(0).id,
          client_email: res.rows.item(0).client_email,
          client_name: res.rows.item(0).client_name,
          client_password: res.rows.item(0).client_password,
          typeTransaction: res.rows.item(0).typeTransaction,
          montant: res.rows.item(0).montant,
          dateTransaction: res.rows.item(0).dateTransaction,
          qrCode: res.rows.item(0).qrCode,
          numeroPhone:res.rows.item(0).numeroPhone

        };
      });
  }
  // Update Transactionclient
  updateclienttransaction(id: any, trC: TransactionClient) {
    let data = [trC.numeroPhone, trC.montant];
    return this.storage
      .executeSql(
        `UPDATE transactionClient SET numeroPhone = ?, montant = ? WHERE id = ${id}`,
        data
      )
      .then((data) => {
        this.getTransactionClient();
      });
  }
  // Delete transacTionClient
  deleteTransaction(id: any) {
    return this.storage
      .executeSql('DELETE FROM transactionClient WHERE id = ?', [id])
      .then((_) => {
        this.getTransactionClient();
      });
  }

  public ngOnInit(): void {
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });
    BarcodeScanner.checkPermissions().then((result) => {
      this.isPermissionGranted = result.camera === 'granted';
    });
  /*****get ListTransaction***/
  this.db.dbState().subscribe((res)=>{
    if(res){
      this.db.fetchTransactionClients().subscribe(item =>{
        this.Data=item;
      })
    }
  });
    this.mainForm = this.formBuilder.group({
      email:[''],
      name:[''],
      password:[''],
      typeTransaction:[''],
      montant:[''],
      numero:[''],
      date:[''],
      qrcode:['']

    })
  }

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

  public async readBarcodeFromImage(): Promise<void> {
    const { files } = await FilePicker.pickImages({ multiple: false });
    const path = files[0]?.path;
    if (!path) {
      return;
    }
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.readBarcodesFromImage({
      path,
      formats,
    });
    this.barcodes = barcodes;
  }

  public async scan(): Promise<void> {
    const formats = this.formGroup.get('formats')?.value || [];
    const { barcodes } = await BarcodeScanner.scan({
      formats,
    });
    this.barcodes = barcodes;
  }

  public async openSettings(): Promise<void> {
    await BarcodeScanner.openSettings();
  }

  public async requestPermissions(): Promise<void> {
    await BarcodeScanner.requestPermissions();
  }

  public openOnGithub(): void {
    window.open(this.GH_URL, '_blank');
  }
}
