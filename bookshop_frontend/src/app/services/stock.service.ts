import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Stock } from '../models/stock';
import { LocalStorageService } from './local-storage.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})

export class StockService {

  url : String = "http://localhost:8080/";

  private eventSubject = new Subject<any>();

  localStorageService : LocalStorageService = inject(LocalStorageService)
  
  event$ = this.eventSubject.asObservable();

  constructor(private http : HttpClient){}

  stockServiceEvent(type : string, data: any) {
    console.log(type +'   ' + data)
    this.eventSubject.next({type, data});
  }

  getStockByBookId(book_id : number) : Observable<Stock[]>{
    return this.http.get<Stock[]>(this.url + "nonAuth/stocks/ofBook/" + book_id);
  }

  getStockByUserId(userId : number) : Observable<Stock[]>{
    return this.http.get<Stock[]>(this.url + "nonAuth/stocks/ofUser/" + userId);
  }

  updateStockOfUser(owner : User, userId : number,  bookId : number, newStock : Stock) : Observable<HttpResponse<any>>{
    return this.http.put<HttpResponse<any>>(this.url+"seller/stocks/ofUser/"+ userId +"/ofBook/"+ bookId, newStock,
      {observe : 'response',
        headers : new HttpHeaders({
                  "Authorization" : "Basic " + btoa(owner.email + ':' + owner.password)
                })
      }
     )
  }

  getStockByUserAndBook(userId : number,  bookId : number) : Observable<HttpResponse<Stock>>{
    return this.http.get<Stock>(this.url+"nonAuth/stocks/ofUser/"+ userId +"/ofBook/"+ bookId,
      {observe : 'response'}
     )
  }

  deleteStockOfUser(owner : User, bookId : number) : Observable<HttpResponse<any>>{
    return this.http.delete<HttpResponse<any>>(this.url + "seller/stocks/ofUser/"+ owner.id +"/ofBook/"+ bookId, 
      {
        observe : 'response',
        headers : new HttpHeaders({
          "Authorization" : "Basic "+ btoa(owner.email + ':' + owner.password)
        })
      }
    );
  }

  createNewStock(newStock : any, owner : User) : Observable<HttpResponse<String>>{
    console.log(newStock);
    return this.http.post<String>(this.url + "seller/stocks", newStock, {
      observe : 'response',
      headers : new HttpHeaders({
        "Authorization" : "Basic "+ btoa(owner.email + ':' + owner.password)
      })
    })
  }

}
