import {HttpHeaders, HttpResponse, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, Subject, switchMap } from 'rxjs';
import { Book } from '../models/books';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})


export class BookService {

  url : String = "http://localhost:8080/";

  allBooks! : Book[];

  constructor(private http: HttpClient) {}

  getBooks() : Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "nonAuth/books")
  }

  createNewBook(book : any, owner : User) : Observable<HttpResponse<any>>{
    return this.http.post<String>(this.url + "seller/books", book, 
      {
        headers : new HttpHeaders({
          'Authorization' : 'Basic ' + btoa(owner.email + ':'+ owner.password)
        }),
        observe : 'response'
      })
  }

  getBookById(bookId : number) : Observable<Book>{
    return this.http.get<Book>(this.url + "nonAuth/books/"+bookId);
  }

  getBookSortedByRating() : Observable<Book[]>{
    return this.http.get<Book[]>(this.url + "nonAuth/books/sorted");
  }

}