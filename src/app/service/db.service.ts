import { Injectable } from '@angular/core';
import {SQLiteObject} from "@ionic-native/sqlite";
import {BehaviorSubject, Observable} from "rxjs";
import {Platform} from "@ionic/angular";
import {SQLite} from "@ionic-native/sqlite/ngx";
import {HttpClient} from "@angular/common/http";
import {SQLitePorter} from "@ionic-native/sqlite-porter/ngx";
import {TransactionClient} from "@app/service/transaction-client";

@Injectable({
  providedIn: 'root'
})
export class DbService {

  private storage: SQLiteObject;
  transactionCList: any = new BehaviorSubject([]);
  private isDbReady: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor(
    private platform: Platform,
    private sqlite: SQLite,
    private httpClient: HttpClient,
    private sqlPorter: SQLitePorter
  ) {
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
  dbState() {
    return this.isDbReady.asObservable();
  }
  fetchSongs(): Observable<TransactionClient[]> {
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
  deleteSong(id: any) {
    return this.storage
      .executeSql('DELETE FROM transactionClient WHERE id = ?', [id])
      .then((_) => {
        this.getTransactionClient();
      });
  }
}
