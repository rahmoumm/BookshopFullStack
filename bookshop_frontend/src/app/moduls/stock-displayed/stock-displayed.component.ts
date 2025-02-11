import { Component, inject, Input } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { StockComponent } from '../../components/stock/stock.component';
import { Stock } from '../../models/stock';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { LocalStorageService } from '../../services/local-storage.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-stock-displayed',
  imports: [StockComponent],
  templateUrl: './stock-displayed.component.html',
  styleUrl: './stock-displayed.component.css'
})

export class StockDisplayedComponent {
  
  loading : boolean = true;
  personnalStock! : boolean;

  stockService = inject(StockService)
  localStorage = inject(LocalStorageService)
  bookStock!: Stock[];

  owner! : User;

  constructor(private route: ActivatedRoute, private router: Router){
  }

  initBookStock(){
    const currUrl = this.router.url

    if(currUrl == '/myStock'){
      this.stockService.getStockByUserId(this.owner.id!).subscribe(
        data =>
          {
          console.log(data)
          console.log(this.owner)

            this.bookStock = data;
            this.personnalStock = true;
            this.loading = false;
            
          }
      )
    }else{
      const bookId = this.route.snapshot.params["bookId"]
      this.stockService.getStockByBookId(bookId).subscribe(
        data =>
        {
          this.bookStock = data;
          this.personnalStock = false;
          this.loading = false
        }
      )
    }
  }

  ngOnInit(){
    this.owner = JSON.parse(this.localStorage.getValue("User"))
    this.initBookStock();
    
  }

  addBookToStock(){

  }
  
}