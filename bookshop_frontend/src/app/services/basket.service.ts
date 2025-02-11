import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';
import { Basket } from '../models/basket';
import { Observable } from 'rxjs';
import { Stock } from '../models/stock';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  localStorageService : LocalStorageService = inject(LocalStorageService);

  url : String = "http://localhost:8080/";

  constructor(private http : HttpClient) {
  }
  
  getBasketByUser(owner : User) : Observable<HttpResponse<Basket>>{
    return this.http.get<Basket>(this.url + "basket/personal", {
      headers : new HttpHeaders({
        "Authorization" : "Basic " + btoa(owner.email + ':' + owner.password) // it works
      }),
      observe : 'response'
    })
  }

  createBasket(owner : User) : Observable<HttpResponse<any>>{
    console.log(owner)
    let realUrl = this.url + "basket/" + owner.id + "/creation";
    console.log(realUrl)
    return this.http.post<HttpResponse<any>>(realUrl, null, {
      headers : new HttpHeaders({
        "Authorization" : "Basic " + btoa("m@gmail.com" + ':' + "abc") // it works
      }),
      observe : 'response',
    })
  }

  addBookToBasket(stock : Stock, owner : User) : Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(this.url + "basket/"+ owner.id+"/addBook", 
      {"userId" : stock.book.id, "bookId" : stock.user.id}, 
      {
        headers : new HttpHeaders({
          "Authorization" : "Basic " + btoa(owner.email + ':' + owner.password) // it works
        }),
        observe : 'response'
      })
  }

  deleteBookFromBasket(bookId : number, owner : User) : Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(this.url + "basket/"+ owner.id+"/removeBook", 
      {"userId" : owner.id, "bookId" : bookId},  
      {
        headers : new HttpHeaders({
          "Authorization" : "Basic " + btoa(owner.email + ':' + owner.password) // it works
        }),
        observe : 'response'
      })
  }



}
