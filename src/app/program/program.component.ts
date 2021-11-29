import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { HttpService } from '../http.service';
import { stringify } from '@angular/compiler/src/util';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const apis_path= "https://econf-apis.herokuapp.com/"


@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

  myForm: FormGroup;
  confadmin: String  ;
  file:any;
  private userlist:any;

  // tslint:disable-next-line:max-line-length
  constructor(private httpclient: HttpClient, private toaster: ToastrService , public dialogRef: MatDialogRef<ProgramComponent>, private http: HttpService, private fb: FormBuilder) {
    const formControls = {
      email: new FormControl(null, [Validators.email, Validators.required]),
      programname: new FormControl('', [Validators.required]),
      description: new FormControl('', [Validators.required]),
          
    };
    this.myForm = this.fb.group(formControls) ;
  }

// tslint:disable-next-line:typedef
  get email() {
    return this.myForm.get('email');
  }
    // tslint:disable-next-line:typedef
    get programname() {
      return this.myForm.get('programname');
    }
  // tslint:disable-next-line:typedef
  get description() {
    return this.myForm.get('description');
  }
  ngOnInit(): void {
    this.confadmin =  this.http.getadmin();
    this.http.getAllUsers().subscribe(
      res => {
        this.userlist = res ;
        
      },
      err => {
        this.toaster.warning('warning !  ' , 'there is no users !');
      }
    );
  }

  addprogram() {
    var x = this.http.getadmin();
    var y = this.http.getconf();
    this.myForm.setControl('cv',  this.fb.control(this.file.name)); 
    this.myForm.addControl('depositor',  this.fb.control(x));
    this.myForm.addControl('com_scientifique',  this.fb.control(y.com_scientifique));
    this.myForm.addControl('coordinator',  this.fb.control(y.coordinator));
    this.myForm.addControl('conference',  this.fb.control(y._id));
    this.myForm.addControl('isValid',  this.fb.control(false)); 
    this.myForm.addControl('mailsent',  this.fb.control(false)); 
    console.log(this.myForm.value);
    this.http.createProgram(this.myForm.value).subscribe(
      res => {  
        Swal.fire({
          icon: "success",
          text: "Request successfully sent! you will receive an email of confirmation soon!",
        }).then((willadd) => {
          if (willadd) {
            this.toaster.success('successfully !  ' , 'Request  sent');
            this.dialogRef.close();

          } else {
            Swal.fire({
              text: "You are not registered for this event",
              icon: "error",
            }); 
          }
        });
  
      },
      err => {
        //this.dialogRef.close();
        console.log(err);
        this.toaster.error('Try again ' , 'some error occured  !');
      }
    );
    const formData = new FormData();
    formData.append('file',this.file);
    console.log(this.file);
      return this.httpclient.post<any>(apis_path+'/programs/file',formData ).subscribe(
        (res)=>console.log(res),
        (err)=> console.log(err)        
        
      );
  }

  close() {
    this.dialogRef.close();
  }
  upload(event:any){

    this.file=event.target.files[0];
 
  }
}
