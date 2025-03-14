import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Book } from '../models/books';
import { User } from '../models/user';
import { LocalStorageService } from './local-storage.service';
import { Role } from '../models/role';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  url : string = "http://localhost:8080/";

  private eventSubject = new Subject<any>();

  event$ = this.eventSubject.asObservable();

  localStorageService : LocalStorageService = inject(LocalStorageService)

  constructor(private http: HttpClient) { }


  userServiceEvent(type : string, data: any) {
    this.eventSubject.next({type, data});
  }

  login(payload: any) : Observable<HttpResponse<User>> {
    console.log("in checkLogin")

    return this.http.post<User>( this.url+'checkLogin', payload, { observe: 'response' });

  }

  signUp(payload : any) : Observable<HttpResponse<any>>{
    console.log("hello from register")
    return this.http.post<HttpResponse<any>>(this.url + 'nonAuth/register', payload, {observe : 'response'})
  }

  userFromEmail(email : string){
    // return this.http.get(this.url + "/nonAuth/users/" + )
  }

  updateInformations(owner : User, user : any) : Observable<HttpResponse<any>> {
    return this.http.put<HttpResponse<any>>(this.url + "users/" + owner.id, user,
      {observe : 'response',
        headers : new HttpHeaders({
          "Authorization" : "Basic " + btoa(owner.email + ':' + owner.password)
        })
      }
    )
  }

  getRole(roles : any) : string{

    if (roles == null) return 'UNDEFINED'
    let n = roles.length;
    let mainRole = roles[0];
    if(mainRole === "ADMIN") return mainRole;

    for(const role of roles){
      if(mainRole === "SELLER" && role === "ADMIN") return role;
      if(mainRole === "USER") mainRole = role;
    }
    return mainRole!;
  }

}