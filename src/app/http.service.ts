import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable()
export class HttpService {
  idadmin: string;
  conf: any;
  listconf: any = {}; 
  listcoord: any = {}; 
  constructor(private http: HttpClient) { }

  register(body:any ){
    return this.http.post('http://127.0.0.1:3000/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  login(body:any ){
    return this.http.post('http://127.0.0.1:3000/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  user(){
    return this.http.get('http://127.0.0.1:3000/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  logout(){
    return this.http.get('http://127.0.0.1:3000/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  createConferences(body:any ){
    return this.http.post('http://127.0.0.1:3000/conferences',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }

  getAllConferences(){
    return this.http.get('http://127.0.0.1:3000/conferences',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  getAllUsers(){
    return this.http.get('http://127.0.0.1:3000/users',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  getadmin(){
     return this.idadmin;
  }
  setadmin(admin){
     this.idadmin=admin;
 }
 getconf(){
  return this.conf; 
}
setconf(conf){
  this.conf=conf;
}
getconflist(){
  return this.listconf; 
}
setconflist(list){
  this.listconf=list;
}
getcoordlist(){
  return this.listcoord; 
}
setcoordlist(list){
  this.listcoord=list;
}
 confregister(id:any , body:any ){
  return this.http.put('http://127.0.0.1:3000/conferences/'+id , body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
createProgram(body:any ){
  return this.http.post('http://127.0.0.1:3000/programs',body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
getAllPrograms(){
  return this.http.get('http://127.0.0.1:3000/programs',{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
delprog(id:any ){
  return this.http.delete('http://127.0.0.1:3000/programs/'+id ,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
validprog(id:any , body:any ){
  return this.http.put('http://127.0.0.1:3000/programs/valid'+id , body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
validmail(id:any , body:any ){
  return this.http.put('http://127.0.0.1:3000/programs/mailsent'+id , body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
sendEmail(url, data) {
  return this.http.post(url, data); 
}
downloadfile(x:string):Observable<any>{
  const param= new HttpParams().set('filename',x);
  const options ={
    params :param
  };
  return this.http.get('http://127.0.0.1:3000/programs/download',{...options,responseType:'blob'})
 
}
}
