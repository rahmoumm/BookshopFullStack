import { Component, inject } from '@angular/core';
import { BookService } from '../../services/book.service';
import { Book } from '../../models/books';
import { AsyncPipe } from '@angular/common';
import { BookComponent } from '../../components/book/book.component'; 
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-books-displayed',
  imports: [BookComponent],
  templateUrl: './books-displayed.component.html',
  styleUrl: './books-displayed.component.css'
})
export class BooksDisplayedComponent {

  loading : boolean = true;
  books! : Book[];
  filteredBooks! : Book[];
  relatedToMyStock : boolean = false;
  relatedToBookDisplay : boolean = false;

  bookService : BookService = inject(BookService);

  constructor(private router: Router){
    
  }

  ngOnInit() : void {

    let currUrl : String = this.router.url;

    if(currUrl === "/top_rated_books"){
      this.bookService.getBookSortedByRating().subscribe(
        (data) =>{
          this.books = data
          this.filteredBooks = this.books
          this.relatedToBookDisplay = true;
          this.loading = false 
        }
      )

    }else{
      this.bookService.getBooks().subscribe(
        (data) =>{
          this.books = data
          this.filteredBooks = this.books
          this.loading = false 
        }
      )
  
      if(currUrl === "/addToMyStock"){
        this.relatedToMyStock = true;
      }else if (currUrl == "/books"){
        this.relatedToBookDisplay = true;
      }
    }


  }

  filterBooks(wantedBooks : string){
    if(!wantedBooks){
      this.filteredBooks = this.books;
      return;
    }
    this.filteredBooks = this.books.filter(book => 
      book.name.toLocaleLowerCase().includes(wantedBooks.toLocaleLowerCase()));
  }

  resetBooks(){
    this.filteredBooks = this.books;
  }

  getCreationBookUrl(){
    return "addingBookToMyStock?bookId=-1"
  }

}
