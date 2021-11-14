import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginForm : FormGroup = new FormGroup({
    email: new FormControl(null,[Validators.email, Validators.required]),
    password :new FormControl(null,Validators.required)
  })
  constructor( public router: Router, private http:HttpService,private toastr: ToastrService) { }

  ngOnInit() {
  }
  login(){

      if(!this.loginForm.valid){
        this.toastr.error( 'Invalid credentials!', 'ERROR');
        return;
      }
      this.http.login(JSON.stringify(this.loginForm.value))
      .subscribe(
        data=> {window.location.reload(); console.log(data); this.router.navigate(['/home']);},
        error=>  console.error(error)
        );
        
        
       }

}
