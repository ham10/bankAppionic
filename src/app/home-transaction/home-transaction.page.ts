import {Component, Input, OnInit} from '@angular/core';
import {SQLite, SQLiteObject} from "@ionic-native/sqlite/ngx";
import {BehaviorSubject, Observable} from "rxjs";
import {FormBuilder, FormGroup, UntypedFormControl, UntypedFormGroup} from "@angular/forms";
import {Barcode, BarcodeFormat, LensFacing} from "@capacitor-mlkit/barcode-scanning";
import {DialogService} from "@app/core";
import {ModalController, Platform, ToastController} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {DbService} from "@app/service/db.service";
import {Router} from "@angular/router";
import {TransactionClient} from "@app/service/transaction-client";
import {DepotRetraitTransfertPage} from "@app/depot-retrait-transfert/depot-retrait-transfert.page";
import {RetraitPage} from "@app/retrait/retrait.page";
import {TransfertPage} from "@app/transfert/transfert.page";
import {DetailsPage} from "@app/details/details.page";

@Component({
  selector: 'app-home-transaction',
  templateUrl: './home-transaction.page.html',
  styleUrls: ['./home-transaction.page.scss'],
})
export class HomeTransactionPage implements OnInit {
  numeroPhone!: string;
  private storage!: SQLiteObject;
  transactionCList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);

  mainForm!: FormGroup;
  @Input() Data: any[] = [];


  private readonly GH_URL =
    'https://github.com/capawesome-team/capacitor-barcode-scanning';

  numString = this.numeroPhone;

  message = 'This modal example uses the modalController to present and dismiss modals.';


  constructor(private readonly dialogService: DialogService,
              private platform: Platform,
              private sqlite: SQLite,
              private httpClient: HttpClient,
              private sqlPorter: SQLitePorter,
              private db: DbService,
              public formBuilder: FormBuilder,
              private toast: ToastController,
              private router: Router,
              private modalCtrl: ModalController) {
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
    });
  }


  ngOnInit() {
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
      qrcode:[''],
      fees:['']
    })
    this.db.fetchTransactionClients();
  }

  dbState() {
    return this.isDbReady.asObservable();
  }

  fetchTransactionClients(): Observable<TransactionClient[]> {
    return this.transactionCList.asObservable();
  }

// Render fake data
  getFakeData() {
    this.httpClient
      .get('assets/dump.sql', {responseType: 'text'})
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
              numeroPhone: res.rows.item(i).numeroPhone,
              fees: res.rows.item(i).fees,
              nameSender: res.rows.item(i).nameSender,
              surnameSender: res.rows.item(i).surnameSender,
              numeroPhoneB: res.rows.item(i).numeroPhoneB,
              nameB: res.rows.item(i).nameB,
              surnameB: res.rows.item(i).surnameB


            });
          }
        }
        this.transactionCList.next(items);
      });
  }

// Add
  addTransactionClientByNumber(numeroPhone: any, montant: any) {
    let data = [numeroPhone, montant];
    return this.storage
      .executeSql(
        'INSERT INTO transactionClient (id,client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees) VALUES (?, ?,?,?,?,?,?,?,?)',
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
          numeroPhone: res.rows.item(0).numeroPhone,
          fees: res.rows.item(0).fees,
          nameSender: res.rows.item(0).nameSender,
          surnameSender: res.rows.item(0).surnameSender,
          numeroPhoneB: res.rows.item(0).numeroPhoneB,
          nameB: res.rows.item(0).nameB,
          surnameB: res.rows.item(0).surnameB
        };
      });
  }

// Update Transactionclient
  updateclienttransaction(id: any, trC: TransactionClient) {
    let data = [trC.numeroPhone, trC.montant];
    return this.storage
      .executeSql(
        `UPDATE transactionClient
         SET numeroPhone = ?,
             montant = ?
         WHERE id = ${id}`,
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

  async openModal() {
    const modal = await this.modalCtrl.create({
      component: DepotRetraitTransfertPage,
    });
    modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role === 'confirm') {
      this.message = `Hello, ${data}!`;
    }
  }
  async openModalRetrait() {
    const modal = await this.modalCtrl.create({component: RetraitPage,});
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.db.fetchTransactionClients();
    }
    // return await modal.present();

  }
  async openModalTransfert() {
    const modal = await this.modalCtrl.create({component: TransfertPage,});
    modal.present();
    const { data } = await modal.onDidDismiss();
    if (data) {
      this.db.fetchTransactionClients();
    }
    // return await modal.present();

  }
  async openModalDetail(Data:any) {
    const modal = await this.modalCtrl.create({
      component: DetailsPage,
      componentProps:{
        Data
      }
    }).then((res) => {
      res.present;
    });


  }
  handleData(ids: string[]){
    this.Data = ids;
  }

  async canDismiss(data?: any, role?: string) {
    return role !== 'gesture';
  }
  handleRefresh(event:any) {
    this.db.fetchTransactionClients();
    setTimeout(() => {
      // Any calls to load data go here
      event.target.complete();
    }, 2000);

  }
}
