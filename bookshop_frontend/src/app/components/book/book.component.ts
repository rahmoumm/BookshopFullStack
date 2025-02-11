import { Component, inject, Input } from '@angular/core';
import { Book } from '../../models/books';
import { LocalStorageService } from '../../services/local-storage.service';
import { Basket } from '../../models/basket';
import { BasketService } from '../../services/basket.service';
import { User } from '../../models/user';
import { HttpStatusCode } from '@angular/common/http';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-book',
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})

export class BookComponent {

  @Input() book! : Book;

  @Input() inBookDisplayed : boolean = false;
  @Input() inBasketDisplayed : boolean = false;
  @Input() createNewStock : boolean = false;

  localStorageService : LocalStorageService = inject(LocalStorageService);
  basketService : BasketService = inject(BasketService);
  stockService : StockService = inject(StockService);

  constructor(){
  }

  deleteBookFromBasket(){
    let owner : User = JSON.parse(this.localStorageService.getValue("User"))
    this.basketService.deleteBookFromBasket(this.book.id, owner).subscribe(
      response => 
      {
        alert("successfuly removed ");
        window.location.reload();
      },
      error => {console.log("An error has occured ", error)}
      
    )
  }

  getWantedUrlWithBookId() : string{
    return "addingBookToMyStock?bookId="+this.book.id;
  }

}