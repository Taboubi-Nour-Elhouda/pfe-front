import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app.routing';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { WebcamModule } from 'ngx-webcam';
import { HomeModule } from './home/home.module';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ExchangeService } from './exchange.service'
import { HttpService } from './http.service';
import { CookieService } from 'ngx-cookie-service';
import { CreateConferenceComponent } from './create-conference/create-conference.component';
import { MatDialogModule } from '@angular/material/dialog';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProgramComponent } from './program/program.component';
import { ComScientificInterfaceComponent } from './com-scientific-interface/com-scientific-interface.component';
import { CoordiantorComponent } from './coordiantor/coordiantor.component';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    ProfileComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    CreateConferenceComponent,
    ProgramComponent,
    ComScientificInterfaceComponent,
    CoordiantorComponent
  ],
  imports: [
    BrowserModule,
    NgbPaginationModule, 
    NgbAlertModule, 
    NgSelectModule,
    MatDialogModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    AppRoutingModule,
    WebcamModule,
    HttpClientModule,
    HomeModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ExchangeService, HttpService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [
    CreateConferenceComponent,
    ProgramComponent,
    ComScientificInterfaceComponent,
    CoordiantorComponent
  ]
})
export class AppModule { }
