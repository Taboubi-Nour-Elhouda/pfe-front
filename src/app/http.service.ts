import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';

const apis_path= "https://econf-apis.herokuapp.com"

@Injectable()
export class HttpService {
  idadmin: string;
  conf: any;
  listconf: any = {}; 
  listcoord: any = {}; 
  constructor(private http: HttpClient) { }

  register(body:any ){
    return this.http.post(apis_path+'/users/register',body,{
      observe:'body',
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  login(body:any ){
    return this.http.post(apis_path+'/users/login',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  user(){
    return this.http.get(apis_path+'/users/user',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  logout(){
    return this.http.get(apis_path+'/users/logout',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  createConferences(body:any ){
    return this.http.post(apis_path+'/conferences',body,{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }

  getAllConferences(){
    return this.http.get(apis_path+'/conferences',{
      observe:'body',
      withCredentials:true,
      headers:new HttpHeaders().append('content-Type','application/json')
    } );
  }
  getAllUsers(){
    return this.http.get(apis_path+'/users',{
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
  return this.http.put(apis_path+'/conferences/'+id , body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
createProgram(body:any ){
  return this.http.post(apis_path+'/programs',body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
getAllPrograms(){
  return this.http.get(apis_path+'/programs',{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
delprog(id:any ){
  return this.http.delete(apis_path+'/programs/'+id ,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
validprog(id:any , body:any ){
  return this.http.put(apis_path+'/programs/valid'+id , body,{
    observe:'body',
    withCredentials:true,
    headers:new HttpHeaders().append('content-Type','application/json')
  } );
}
validmail(id:any , body:any ){
  return this.http.put(apis_path+'/programs/mailsent'+id , body,{
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
  return this.http.get(apis_path+'/programs/download',{...options,responseType:'blob'})
 
}
}
