import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from '../http.service';
// import swal from 'sweetalert';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-com-scientific-interface',
  templateUrl: './com-scientific-interface.component.html',
  styleUrls: ['./com-scientific-interface.component.css']
})
export class ComScientificInterfaceComponent implements OnInit {
 mylist: any= [] ;
 mylist1: any= [] ;
  constructor(public http: HttpService ,private toaster:ToastrService) { }

  ngOnInit(): void {
    this.mylist1 = this.http.getconflist();
    for (let t in this.mylist1) {
      this.mylist[t] = this.mylist1[t];
    }   
  } 
  returnblob(res):Blob{
    return new Blob([res],{type: 'application/pdf'}); 

  }
  download(x){ 
    this.http.downloadfile(x).subscribe(
      res => {
        if(res){
          const url =window.URL.createObjectURL(this.returnblob(res));
          window.open(url);
        }
        
      },
      err => {
        this.toaster.error('Error!'); 
      }
    );
  }
  delete(id){
    Swal.fire({
      title: "warning !",
      text: "Did you want to delete this request !",
      icon: "warning",
      showCancelButton: true,
    })
  
      .then((willadd) => {
        if (willadd) {
          this.http.delprog(id).subscribe(
            res => {
              window.location.reload();
              
            },
            err => {
              this.toaster.error('Error!'); 
            }
          );

        } else {
          Swal.fire({
            title: 'Error!',
            text: 'the request is safe',
            icon: "error",
          });
        }
      });
  }
  valid(id){
    Swal.fire({
      title: "Info !",
      text: " Once validated, this request will forward to the coordinator  !",
      icon: "success", 
      showCancelButton: true,
    })
      .then((willadd) => { 
        if (willadd) {
          this.http.validprog(id,{"isValid":true}).subscribe(
            res => {
              window.location.reload();
              
            },
            err => {
              this.toaster.error('Error!'); 
            }
          );

        } else {
          Swal.fire({
            title: 'warning!',
            text: 'check the request again!',
            icon: "warning",
          });
        }
      });
  }
}
