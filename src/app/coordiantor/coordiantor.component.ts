import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
import swal from 'sweetalert';

const apis_path= "https://econf-apis.herokuapp.com/"

@Component({
  selector: 'app-coordiantor',
  templateUrl: './coordiantor.component.html',
  styleUrls: ['./coordiantor.component.css']
})
export class CoordiantorComponent implements OnInit {
  mylist: any= [] ;
  mylist1: any= [] ;
   constructor(public http: HttpService ,private toaster:ToastrService) { }
 
   ngOnInit(): void {
     this.mylist1 = this.http.getcoordlist();
     for (let t in this.mylist1) {
       this.mylist[t] = this.mylist1[t];
     }   
   } 
   sendemail(prog){
     swal({
       title: "Info !",
       text: " You will send an email to the depositor !",
       icon: "success", 
       dangerMode: false,
       buttons: ["Cancel", true]
     })
       .then((willadd) => { 
         if (willadd) {
           //mailsend 
           let user = {
            email: prog.email,
            program: prog.programname
          }
          this.http.sendEmail(apis_path+"/sendmail", user).subscribe(
            data => {
              console.log(data);
                 //validate thaat the email is sent 
           this.http.validmail(prog._id,{"mailsent": true}).subscribe(
            res => {
              window.location.reload();
              
            },
            err => {
              this.toaster.error('Error!');  
            }
          );
            },
            err => {
              console.log(err);
                this.toaster.error('Error!'); 
            }
          );
         } else {
           swal("check the request again!", {
             icon: "warning",
           });
         }
       });
   }
 }
 