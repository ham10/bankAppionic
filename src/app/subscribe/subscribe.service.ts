import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage-angular";

@Injectable({
  providedIn: 'root'
})
export class SubscribeService {
  private _storage: Storage | null = null;

  constructor(private storage:Storage) {
    this.init();
  }
  async  ngOnInit(){

  }

  async init() {
    const storage = await this.storage.create();
    this._storage = storage;
  }
  public async set(key: string, value: any) {
    let result=await  this._storage?.set(key, value);
    console.log(result);
  }
  public async get(key:string){
    let value=await this._storage?.get(key);
    console.log(value);
    return  value;
  }
}
