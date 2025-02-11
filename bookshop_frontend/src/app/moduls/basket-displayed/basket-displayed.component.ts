import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { BookComponent } from '../../components/book/book.component';
import { UserService } from '../../services/user.service';
import { LocalStorageService } from '../../services/local-storage.service';
import { BasketService } from '../../services/basket.service';
import { Basket } from '../../models/basket';
import { HttpStatusCode } from '@angular/common/http';
import { merge, mergeMap, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-basket-displayed',
  imports: [BookComponent],
  templateUrl: './basket-displayed.component.html',
  styleUrl: './basket-displayed.component.css'
})
export class BasketDisplayedComponent {

  owner! : User;
  basket! : Basket;

  loading : boolean = true;

  userService : UserService = inject(UserService);
  localStorageService : LocalStorageService = inject(LocalStorageService);
  basketService : BasketService = inject(BasketService)

  constructor(){}

  ngOnInit(){    
    // Because local storage only stocks strings
    this.owner = JSON.parse(this.localStorageService.getValue("User"));
    
    this.basketService.getBasketByUser(this.owner).pipe(
      switchMap( (response) => {
        if(response.status === HttpStatusCode.NoContent){
          console.log("Creating the basket")
          return this.basketService.createBasket(this.owner).pipe(
          switchMap( (created) =>{
            if(created.status === HttpStatusCode.Created){
              console.log("Basket is Created")
              return this.basketService.getBasketByUser(this.owner)
            }else{
              console.log("Probleme with the creation")
              return of(created);
            }
          })
        );
        }else{
          console.log("Already exists")
          return of(response);
        }
      })
    )
    .subscribe(
      {next: response => {
        console.log("returning the basket")
        this.basket = response.body!;
        console.log(this.basket)
        this.loading = false;
      },
    error : err =>{
      console.log("Probleme with basket ", err)
    }}
    )
  }
}


