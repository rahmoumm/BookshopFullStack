import { Component, inject } from '@angular/core';
import { User } from '../../models/user';
import { LocalStorageService } from '../../services/local-storage.service';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { first, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { HttpStatusCode } from '@angular/common/http';
import { StockService } from '../../services/stock.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  imports: [ReactiveFormsModule],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  owner! : User;

  informationsForm!: FormGroup;
  passwordForm!: FormGroup;

  modifyInformations : boolean = false;
  modifyPassword : boolean = false;

  localStorageService : LocalStorageService = inject(LocalStorageService);
  userService : UserService = inject(UserService);
  stockService : StockService = inject(StockService);

  ngOnInit(){
    this.owner = JSON.parse(this.localStorageService.getValue("User"));
  }

  constructor(private formBuilder: FormBuilder, private router: Router){
    
  }

  // startModifyingInformations(){
  //   this.informationsForm = new FormGroup<{
  //     email : FormControl<string | null>,
  //     firstname : FormControl<string | null>,
  //     lastname : FormControl<string | null>,

  //   }>({
  //     email :  new FormControl (this.owner.email),
  //     firstname :  new FormControl (this.owner.firstName),
  //     lastname :  new FormControl (this.owner.lastName),
  //   })
  //   this.modifyInformations = true;
  // }

  // startModifyingPassword(){
  //   this.passwordForm = this.formBuilder.group({
  //     newPassword : '',
  //     newPasswordRewritten : ''
  //   })
  //   this.modifyPassword = true;
  // }

  // sendNewInformations(){
  //   let newUserInfo = {
  //     firstName : this.informationsForm.value.firstname,
  //     lastName : this.informationsForm.value.lastname,
  //     email : this.informationsForm.value.email,
  //   }

  //   this.owner = JSON.parse(this.localStorageService.getValue("User"));

  //   this.userService.updateInformations(this.owner, newUserInfo).
  //     pipe(
  //       switchMap((response) => {
  //         if(response.status == HttpStatusCode.Ok){
  //           let payload = {"email" : newUserInfo.email , "password" : this.owner.password };
  //           return this.userService.login(payload)
  //         }else{
  //           return of(response)
  //         }
  //       })
  //     ).
  //    subscribe(
  //     (loggedIn) => {
  //       if(loggedIn.status == HttpStatusCode.Ok ){
  //         let newOwner = loggedIn.body;
  //         newOwner.password = this.owner.password;
  //         newOwner.mainRole = this.userService.getRole(newOwner.roles)!;
  //         this.localStorageService.setValue("User", JSON.stringify(newOwner));
  //         this.modifyInformations = false;
  //         alert("Infos updated !!!");
  //         window.location.reload();
  //       }else{
  //         alert("An error occured when trying to change the informations, please try after a while !")
  //       }
  //     }
  //   )
  // }

  // sendNewPassword(){
    
  //   while(this.passwordForm.value.newPassword != this.passwordForm.value.newPasswordRewritten){
  //     alert("The passwords does not macth")
  //   }

  //   let newPasswordChecked = {
  //     password : this.passwordForm.value.newPassword
  //   }

  //   this.owner = JSON.parse(this.localStorageService.getValue("User"));

  //   this.userService.updateInformations(this.owner, newPasswordChecked).pipe(
  //     switchMap( (response) => {
  //       if(response.status == HttpStatusCode.Ok){
  //         let payload = {"email" : this.owner.email , "password" : this.passwordForm.value.newPassword };
  //         return this.userService.login(payload);
  //       }else{
  //         return of(response)
  //       }
  //     } )
  //   ).subscribe(
  //     (loggedIn) => {
  //       if(loggedIn.status == HttpStatusCode.Ok){
  //         let newOwner = loggedIn.body;
  //         newOwner.password = this.passwordForm.value.newPassword;
  //         newOwner.mainRole = this.userService.getRole(newOwner.roles)!;
  //         this.localStorageService.setValue("User", JSON.stringify(newOwner))
  //         console.log(this.localStorageService.getValue("User"));
  //         this.modifyPassword = false;
  //         alert("Password updated !!!")
  //         // window.location.reload()
  //       }else{
  //         alert("An error occured when trying to change ypur password, please try after a while !")
  //       }
  //     }
  //   )

  // }

  initModifyInformations(){
    this.router.navigate(['modify_informations']);
  }

  initModifyPassword(){
    this.router.navigate(['modify_password'])
  }

  initPersonalStock(){
    this.stockService.stockServiceEvent('byUser', this.owner.id);

    this.router.navigate(['myStock'])
  }

}
