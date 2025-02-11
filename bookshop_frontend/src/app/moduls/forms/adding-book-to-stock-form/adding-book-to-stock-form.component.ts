import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BookService } from '../../../services/book.service';
import { StockService } from '../../../services/stock.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from '../../../models/user';
import { HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';


@Component({
  selector: 'app-adding-book-to-stock-form',
  imports: [ReactiveFormsModule],
  templateUrl: './adding-book-to-stock-form.component.html',
  styleUrl: './adding-book-to-stock-form.component.css'
})

export class AddingBookToStockFormComponent {

  newStockInfo! : FormGroup;
  loading : boolean = true;
  needToCreateNewBook : boolean = false;
  
  bookService : BookService = inject(BookService);
  stockService : StockService = inject(StockService);
  localStorageService : LocalStorageService = inject(LocalStorageService)

  constructor(private route : ActivatedRoute, private router : Router, private location : Location){
  }

  ngOnInit(){
    let bookId : number = this.route.snapshot.queryParams['bookId']
    
    if(bookId >= 0){

      this.newStockInfo = new FormGroup({
        userId : new FormControl(-1),
        bookId : new FormControl(bookId), 
        price : new FormControl(0),
        availableQuantity : new FormControl(0)
      })

      this.needToCreateNewBook = false;
      console.log("needToCreateNewBook : "+ this.needToCreateNewBook)
      
    }else{

      this.newStockInfo = new FormGroup({
        userId : new FormControl(-1),
        bookId : new FormControl(bookId),
        name : new FormControl(""),
        price : new FormControl(0),
        availableQuantity : new FormControl(0)
      })

      console.log("needToCreateNewBook : "+ this.needToCreateNewBook)
      this.needToCreateNewBook = true;

    }
  }


  createStock(){
    let owner : User = JSON.parse(this.localStorageService.getValue("User"));
    this.newStockInfo.patchValue({
      userId : owner.id
    });
    console.log(this.newStockInfo.value);
    this.stockService.createNewStock(this.newStockInfo.value, owner).subscribe(
      (response) => {
        console.log("Hello from stock ")
        if(response.status == HttpStatusCode.Created){
          alert("Stock Created Successfully")
          this.router.navigate(['myStock'])
        }
      }
    )
  }

  createBookAndStock(){
    let owner : User = JSON.parse(this.localStorageService.getValue("User"));
    let book = {'name' : this.newStockInfo.value.name};
    this.bookService.createNewBook(book, owner).subscribe(
      (response) => {
        console.log(response)
        if(response.status == HttpStatusCode.Created){
          const location = response.headers.get('Location')!;
          const splitedUrl = location.split("/");
          const bookIdCreated = Number.parseInt(splitedUrl[splitedUrl.length - 1]);
          
          this.newStockInfo.removeControl('name');
          this.newStockInfo.patchValue({
            userId : owner.id,
            bookId : bookIdCreated,
          });
          this.stockService.createNewStock(this.newStockInfo.value, owner).subscribe(
            val => {
              if(val.status == HttpStatusCode.Created){
                alert("Stock Created Successfully")
                this.router.navigate(['myStock'])
              }
            }
          )
        }
      }
    )
  }
  

}
