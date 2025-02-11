import { Component, inject, Input } from '@angular/core';
import { Stock } from '../../models/stock';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { BasketService } from '../../services/basket.service';
import { HttpStatusCode } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-stock',
  imports: [],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent {
  
  @Input() stock! : Stock;
  @Input() personnalStock! : boolean;
  owner! : User;

  localStorageService : LocalStorageService = inject(LocalStorageService);
  basketService : BasketService = inject(BasketService);
  stockService : StockService = inject(StockService);
  

  addBook(){
    this.owner = JSON.parse(this.localStorageService.getValue("User"));
    this.basketService.addBookToBasket(this.stock, this.owner).subscribe(
      (response) =>{
        if(response.status == HttpStatusCode.Ok){
          console.log("Book added successfully")
        }else{
          console.log("There was a probleme while adding the book")
        }
      } )
  }

  deleteFromYouStock(){
    this.owner = JSON.parse(this.localStorageService.getValue("User"));
    this.stockService.deleteStockOfUser(this.owner, this.stock.book.id).subscribe(
      response =>  {
        if(response.status == HttpStatusCode.Ok){
          console.log("Stock deleted successfully")
          window.location.reload();
        }else{
          console.log("Error while deleting stock")

        }
      }
    );
  }


}


