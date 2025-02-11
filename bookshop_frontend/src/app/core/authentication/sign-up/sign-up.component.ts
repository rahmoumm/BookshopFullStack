import { Component, EventEmitter, inject, Output } from '@angular/core';
import {  FormGroup, ReactiveFormsModule, FormBuilder, Form } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Role } from '../../../models/role';

@Component({
  selector: 'app-sign-up',
  imports: [ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css'
})
export class SignUpComponent {

  signUpForm !: FormGroup;
  signUpService = inject(UserService)
  
  constructor(private formBuilder : FormBuilder){
    this.signUpForm = this.formBuilder.group({
      email: '',
      password: '',
      firstName : '',
      lastName : '',
      roleId: 3,
    });
  }

  signUp(){
    console.log("sign up")
    let role! : Role;
    if(this.signUpForm.controls['roleId'].value === 2){
      role = { id : 2}
    }else if (this.signUpForm.controls['roleId'].value === 3){
      role = { id : 3}
    }
    this.signUpForm.addControl('roles', this.formBuilder.control([role]))
    this.signUpForm.removeControl('roleId');
    this.signUpService.userServiceEvent('signUpEvent', this.signUpForm);

  }
}
