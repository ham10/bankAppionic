import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import {BehaviorSubject, Observable} from "rxjs";
import {NavController, Platform} from "@ionic/angular";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {TransactionClient} from "@app/service/transaction-client";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage!: SQLiteObject;
  transactionCList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private router: Router,
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter,
    public navCtrl: NavController
  ) {
    this.platform.ready().then(() => {
      this.sqlite
        .create({
          name: 'data.db',
          location: 'default',
        })
        .then((db: SQLiteObject) => {
          this.storage = db;
          this.getFakeData();
        });
    });
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
              numeroPhone:res.rows.item(i).numeroPhone,
              fees:res.rows.item(i).fees,
              nameSender: res.rows.item(i).nameSender,
              surnameSender: res.rows.item(i).surnameSender,
              numeroPhoneB: res.rows.item(i).numeroPhoneB,
              nameB:res.rows.item(i).nameB,
              surnameB:res.rows.item(i).surnameB


            });
          }
        }
        this.transactionCList.next(items);

      });
  }
  // Add
  // addTransactionClientByNumber(numeroPhone: any,montant:any,)  {
  //   let data = [numeroPhone, montant];
  //   return this.storage
  //     .executeSql(
  //       'INSERT INTO transactionClient (client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees) VALUES (?, ?,?,?,?,?,?,?,?)',
  //       data
  //     )
  //     .then((res) => {
  //       this.getTransactionClient();
  //     });
  // }
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
          numeroPhone:res.rows.item(0).numeroPhone,
          fees:res.rows.item(0).fees,
          nameSender: res.rows.item(0).nameSender,
          surnameSender: res.rows.item(0).surnameSender,
          numeroPhoneB: res.rows.item(0).numeroPhoneB,
          nameB:res.rows.item(0).nameB,
          surnameB:res.rows.item(0).surnameB
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
  addTransByNumberAmount(client_email:any,client_name:any,client_password:any,typeTransaction:any,montant:any,dateTransaction:any,qrCode:any,numeroPhone:any,fees:any,)  {
    let data = [client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees];

    return this.storage
      .executeSql(
        'INSERT INTO transactionClient (client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?)',
        data
      )
      .then((res) => {
       // this.getTransactionClient();
       //  this.navCtrl.navigateBack("/barcode-scanning").then(() => {
       //    this.fetchTransactionClients();
       //  });
      this.router.navigateByUrl('/barcode-scanning');
        this.fetchTransactionClients();
      });
  }

  addTransactionTransfert(client_email:any,client_name:any,client_password:any,typeTransaction:any,montant:any,dateTransaction:any,qrCode:any,numeroPhone:any,fees:any,nameSender:any,surnameSender:any ,numerophoneB:any,nameB:any,surnameB:any )  {
    let data = [client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB];

    return this.storage
      .executeSql(
        'INSERT INTO transactionClient (client_email, client_name, client_password,typeTransaction,montant,dateTransaction,qrCode,numeroPhone,fees,nameSender,surnameSender,numerophoneB,nameB,surnameB) VALUES (?, ?,?,?,?,?,?,?,?,?,?,?,?,?)',
        data
      )
      .then((res) => {
        // this.getTransactionClient();
        //  this.navCtrl.navigateBack("/barcode-scanning").then(() => {
        //    this.fetchTransactionClients();
        //  });
        this.router.navigateByUrl('/barcode-scanning');
        this.fetchTransactionClients();
      });
  }


}
