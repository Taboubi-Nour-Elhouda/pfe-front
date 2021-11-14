import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpService } from '../http.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

    registerForm: FormGroup 
    constructor(private _httpService: HttpService, private fb: FormBuilder,private router: Router,private toastr: ToastrService ) {
        this.registerForm = this.fb.group({
            firstname: new FormControl(null, Validators.required),
            lastname: new FormControl(null, Validators.required),
            accountname: new FormControl(null, Validators.required),
            email: new FormControl(null, [Validators.email, Validators.required]),
            password: new FormControl(null, Validators.required),
            repassword: new FormControl(null, Validators.required),
            enabled: new FormControl("false")
        });
     }

    ngOnInit() {

    }
    get firstname() {
        return this.registerForm.get('firstname');
    }
    get lastname() {
        return this.registerForm.get('lastname');
    }
    get accountname() {
        return this.registerForm.get('accountname');
    }
    get email() {
        return this.registerForm.get('email');
    }
    get password() {
        return this.registerForm.get('password');
    }
    get repassword() {
        return this.registerForm.get('repassword');
    }
    register() {
        if ((!this.registerForm.valid) || (this.registerForm.controls.password.value != this.registerForm.controls.repassword.value)) {
            this.toastr.error( 'Invalid credentials!', 'ERROR');
            return;
        }
        this._httpService.register(JSON.stringify(this.registerForm.value))
            .subscribe(
                data => {console.log(data), setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 1000);},
                error => console.error(error)
                

            )
    }
}
