import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  setValue(key : string, value : any){
    localStorage.setItem(key, value)
  }

  getValue(key : string) : any {
    return localStorage.getItem(key)
  }

  deleteValue(key : string) {
    localStorage.removeItem(key)
  }

  containsKey( key : string) : boolean{
    return localStorage.getItem(key) !== null;
  }

  isLoggedIn() : boolean{
    return this.containsKey("User");
  }

}
