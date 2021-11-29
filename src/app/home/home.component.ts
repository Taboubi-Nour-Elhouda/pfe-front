import { Component, OnInit, OnDestroy, ElementRef } from '@angular/core';
import { HttpService } from '../http.service'
import { ExchangeService } from '../exchange.service'
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { CreateConferenceComponent } from '../create-conference/create-conference.component';
import { ProgramComponent } from '../program/program.component';
import Swal from 'sweetalert2';
import { ComScientificInterfaceComponent } from '../com-scientific-interface/com-scientific-interface.component';
import { CoordiantorComponent } from '../coordiantor/coordiantor.component';

declare const window: any;


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  private totalLength: String;
  time = new Date();
  private loggedIn: boolean;
  public pageSize = 1;
  public page = 1; 
  private user: any
  showconferences: any = [];
  myprograms: any = {};
  coorprograms: any = {};
  allprograms: any = {};
  constructor(private toaster: ToastrService, private dialog: MatDialog, public router: Router, public http: HttpService, private toastr: ToastrService, private shared: ExchangeService, private hostElement: ElementRef,
  ) { }

  ngOnInit() {
    setInterval(() => {
      this.time = new Date();
    }, 1000);
    this.http.user()
      .subscribe(
        data => { this.loggedIn = true; this.user = data; },
        error => this.loggedIn = false
      );
    this.http.getAllConferences().subscribe(
      res => {

        this.showconferences = res;
        this.totalLength = this.showconferences.length;

      },
      err => {
        this.toaster.error('Try again ', 'Cannot get  the list of conferences !');
      }
    );
    this.http.getAllPrograms()
      .subscribe(
        data => {
          this.allprograms = data;
          var x = 0;
          var y = 0;
          for (let t in this.allprograms) {
            if ((this.allprograms[t].com_scientifique == this.user._id) && (this.allprograms[t].isValid == false)) {
              this.myprograms[x] = this.allprograms[t];
              x += 1;
            }
             if ((this.allprograms[t].coordinator == this.user._id) && (this.allprograms[t].mailsent == false ) && (this.allprograms[t].isValid == true)) {
              this.coorprograms[y] = this.allprograms[t];
              y += 1;
            }
          }
          setTimeout(() => {
            if (x > 0) {
              this.http.setconflist(this.myprograms);
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = false;
              dialogConfig.autoFocus = true;
              dialogConfig.width = '60%';
              this.dialog.open(ComScientificInterfaceComponent, dialogConfig);
            }
            if (y>0){ 
              this.http.setcoordlist(this.coorprograms);
              const dialogConfig = new MatDialogConfig();
              dialogConfig.disableClose = false;
              dialogConfig.autoFocus = true;
              dialogConfig.width = '60%';
              this.dialog.open(CoordiantorComponent, dialogConfig);
            } 
          }, 1000);
          
        },
        error => { console.log(error); }
      );
  }
  scrolltop() {
    window.scrollTo(0, 0);
  }
  scrollist() {
    window.scrollTo(0, 2020);
  }

  createconf() {
    if (!this.loggedIn) {
      this.toastr.warning('You have to sign-in first !', 'Warning');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

      setTimeout(() => {
        this.toastr.info('Create an account  of you don\'t have one', 'Info');
      }, 2000);
    }
    else {
      this.http.setadmin(this.user._id);
      this.toastr.info('All fields except the short name can be modified by the administrator.', 'Info !');
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(CreateConferenceComponent, dialogConfig);
    }
  }

  registerconf(id: any) {
    if (!this.loggedIn) {
      this.toastr.warning('You have to sign-in first !', 'Warning');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

      setTimeout(() => {
        this.toastr.info('Create an account  of you don\'t have one', 'Info');
      }, 2000);
    }
    else {
      Swal.fire({
        title: "Notice !",
        text: "Once registered , you must be present at the event!",
        icon: "warning",
        showConfirmButton : true
      })
        .then((willadd) => {
          if (willadd) {
            this.http.confregister(id, { participants: this.user._id }).subscribe(
              res => {
                Swal.fire({
                  icon: "success",
                  text: "Success! your registration is done!",
                });
              },
              err => {
                this.toaster.error('Try again ', 'Can\'t register  !');
              }
            );

          } else {
            Swal.fire({
              icon: "error",
              text: "You are not registered for this event"
            });
          }
        });

    }
  }
  programconf(conference: any) {
    if (!this.loggedIn) {
      this.toastr.warning('You have to sign-in first !', 'Warning');
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1500);

      setTimeout(() => {
        this.toastr.info('Create an account  of you don\'t have one', 'Info');
      }, 2000);
    }
    else {
      this.http.setadmin(this.user._id);
      this.http.setconf(conference);
      const dialogConfig = new MatDialogConfig();
      dialogConfig.disableClose = true;
      dialogConfig.autoFocus = true;
      dialogConfig.width = '60%';
      this.dialog.open(ProgramComponent, dialogConfig);
    }
  }
}

