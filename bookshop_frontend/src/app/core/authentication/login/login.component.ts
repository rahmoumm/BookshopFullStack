import { Component, inject } from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, FormBuilder} from '@angular/forms';
import { EventEmitter, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})

export class LoginComponent {
  userForm!: FormGroup;

  loginService = inject(UserService);

  constructor(private formBuilder: FormBuilder) {
    this.userForm = this.formBuilder.group({
      email: '',
      password: '',
    });
  }
  
  onSubmit() {
    this.loginService.userServiceEvent("loginEvent", this.userForm);
  }
}