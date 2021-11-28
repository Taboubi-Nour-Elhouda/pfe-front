import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import {ToastrService} from 'ngx-toastr';
import { HttpService } from '../http.service';



@Component({
  selector: 'app-create-conference',
  templateUrl: './create-conference.component.html',
  styleUrls: ['./create-conference.component.css']
})
export class CreateConferenceComponent implements OnInit {
  myForm: FormGroup;
  confadmin: String  ;
  private userlist:any;
  idcoord:any;

  // tslint:disable-next-line:max-line-length
  constructor(private toaster: ToastrService , public dialogRef: MatDialogRef<CreateConferenceComponent>, private http: HttpService, private fb: FormBuilder) {
    const formControls = {
      shortname: new FormControl('', Validators.required),
      label: new FormControl('', Validators.required),
      description: new FormControl('', [Validators.required]),
      scientificdomain: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      to: new FormControl('', [Validators.required]),
      location: new FormControl('', [Validators.required]),
      organizations: new FormControl('', [Validators.required]),
      people: new FormControl('', [Validators.required]),
      event: new FormControl('', [Validators.required]),
      com_scientifique: new FormControl('', [Validators.required]),
      coordinator: new FormControl('', [Validators.required])

      
    };
    this.myForm = this.fb.group(formControls) ;
  }

// tslint:disable-next-line:typedef
  get shortname() {
    return this.myForm.get('shortname');
  }
// tslint:disable-next-line:typedef
  get label() {
    return this.myForm.get('label');
  }
  // tslint:disable-next-line:typedef
  get description() {
    return this.myForm.get('description');
  }
  // tslint:disable-next-line:typedef
  get scientificdomain() {
    return this.myForm.get('scientificdomain');
  }
  // tslint:disable-next-line:typedef
  get from() {
    return this.myForm.get('from');
  }
  get to() {
    return this.myForm.get('to');
  }
  // tslint:disable-next-line:typedef
  get location() {
    return this.myForm.get('location');
  }
    // tslint:disable-next-line:typedef
    get organizations() {
      return this.myForm.get('organizations');
    }
    // tslint:disable-next-line:typedef
    get people() {
      return this.myForm.get('people');
    }
    // tslint:disable-next-line:typedef
    get event() {
      return this.myForm.get('event');
    }
// tslint:disable-next-line:typedef
get com_scientifique() {
  return this.myForm.get('com_scientifique');
}
// tslint:disable-next-line:typedef
get coordinator() {
  return this.myForm.get('coordinator');
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

  addconference() {

    this.myForm.addControl('confadmin',  this.fb.control(this.confadmin))
    this.http.createConferences(this.myForm.value).subscribe(
      res => { 
        this.toaster.success('successfully !  ' , 'Conference Created');
        this.dialogRef.close();
        window.location.reload();
      },
      err => {
        this.dialogRef.close();
        this.toaster.error('Try again ' , 'some error occured  !');
      }
    );
  }
  
  close() {
    this.dialogRef.close();
  }
}
