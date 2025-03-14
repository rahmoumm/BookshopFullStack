import { Component, inject } from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { RouterOutlet, Router } from '@angular/router';
import { LoginComponent } from './core/authentication/login/login.component';
import { UserService } from './services/user.service';
import { HttpResponse, HttpStatusCode } from '@angular/common/http';
import { User } from './models/user';
import { LocalStorageService } from './services/local-storage.service';
import { HeaderComponent } from './core/header/header.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ReactiveFormsModule, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  
  payload! : any;
  codeStatusOk! : boolean;
  loginService = inject(UserService);
  localStorageService = inject(LocalStorageService)

  showHeader: boolean = true;

  constructor(private router: Router) {

    this.router.events.subscribe(() => {
      const noHeaderRoutes = ['/login', '/register'];
      this.showHeader = !noHeaderRoutes.includes(this.router.url);
    });
  }

  ngOnInit() {
    this.loginService.event$.subscribe(event => {
      console.log("user service")
      if(event.type === 'loginEvent'){

        this.payload = {"email" : event.data.value.email , "password" : event.data.value.password };

        this.loginService.login(this.payload).subscribe(
          (val : HttpResponse<User>) => {
            if (val.status == HttpStatusCode.Ok){

              // this.localStorageService.setValue("loggedIn", true);

              let owner : User = val.body!;
              owner.password = event.data.value.password;
              owner.mainRole = this.loginService.getRole(owner.roles)!;
              console.log(owner)
              this.localStorageService.setValue("User", JSON.stringify(owner))
                            
              this.loginService.userServiceEvent("HeaderEvent", true);

              this.router.navigate(['books'])

            }else{
              console.log("FLOP")
            }
          }
        )
      }else if (event.type === 'signUpEvent'){

        this.payload = {"email" : event.data.value.email , "password" : event.data.value.password,
                        "firstName" : event.data.value.firstName, "lastName" : event.data.value.lastName,
                        "roles":  event.data.value.roles
         };
         console.log("hello")
         this.loginService.signUp(this.payload).subscribe(
          (val : HttpResponse<any>) => {
            if (val.status == HttpStatusCode.Created){
              this.router.navigate(['login'])
              alert("Account created successfully")
              console.log("hello")
            }else{
              console.log("FLOP")
            }
          }
         )
      }
    });
  }


}