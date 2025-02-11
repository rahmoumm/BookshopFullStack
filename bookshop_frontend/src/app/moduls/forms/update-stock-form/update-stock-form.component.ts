import { Component, inject, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, FormControl } from '@angular/forms';
import { Stock } from '../../../models/stock';
import { StockService } from '../../../services/stock.service';
import { UserService } from '../../../services/user.service';
import { LocalStorageService } from '../../../services/local-storage.service';
import { User } from '../../../models/user';
import { HttpStatusCode } from '@angular/common/http';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-stock-form',
  imports: [ReactiveFormsModule],
  templateUrl: './update-stock-form.component.html',
  styleUrl: './update-stock-form.component.css'
})
export class UpdateStockFormComponent {

  stockUpdateForm! : FormGroup;
  loading : boolean = true; 

  oldStock! : Stock;

  bookId! : number;
  userId!  : number;

  stockService : StockService = inject (StockService);
  localStorageService : LocalStorageService = inject(LocalStorageService);
  userService : UserService = inject(UserService);

  constructor(private formBuilder : FormBuilder, private router : Router,
      private route : ActivatedRoute
  ){}

  ngOnInit(){
    this.bookId = this.route.snapshot.params["bookId"]
    this.userId = this.route.snapshot.params["userId"]
    this.stockService.getStockByUserAndBook(this.userId, this.bookId).subscribe(
      response => {
        if(response.status == HttpStatusCode.Ok){
          console.log(response.body)
          this.oldStock = response.body!;
          this.stockUpdateForm = new FormGroup({
            price : new FormControl(this.oldStock.price),
            availableQuantity : new FormControl(0)
          })
          this.loading = false;
        }else{
          console.log("mauvaise reponse du serveur")
        }

      },
      error => console.log(error)
    )    
  }

  updateStock(){
    const owner : User = JSON.parse(this.localStorageService.getValue("User"));
    this.stockService.updateStockOfUser(owner, this.userId, this.bookId, this.stockUpdateForm.value).
    subscribe( response => {
      if(response.status == HttpStatusCode.Ok){
        alert("Stock successfully updated"); 
        this.router.navigate(['myStock'])

      }
    })
  }

}
