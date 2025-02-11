import { Component, inject } from '@angular/core';
import { LocalStorageService } from '../../services/local-storage.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent {

  localStorageService : LocalStorageService = inject(LocalStorageService)
  userService : UserService = inject(UserService);
  loggedIn : boolean = true;

  constructor(private route : Router){
    
  }

  logout(){
    this.localStorageService.deleteValue("User");
    this.loggedIn = false;
  }

  updateLoginState() {
    this.loggedIn = this.localStorageService.isLoggedIn();
  }

  ngOnInit(){
    this.userService.event$.subscribe(
      event => {
        if(event.type === "HeaderEvent"){
          this.loggedIn = event.data;
          console.log("From headers : loggedIn is ", this.loggedIn );
        }
      }
    )
  }

}
