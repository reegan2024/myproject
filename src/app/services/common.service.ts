import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../model/usermodel';
import { data } from 'jquery';
import { throwError,Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import {EventEmitter} from '@angular/core';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonService {

  /* _url='http://ec2-15-206-179-29.ap-south-1.compute.amazonaws.com:8080/loginpage'; */


  constructor(private _http: HttpClient) {
  }

  evenemitter= new EventEmitter<string>();
  subject$=new Subject<string>();
  shardatausingemmiter(data:string){
      /* this.evenemitter.emit(data); */
    this.subject$.next(data);
  }

  _url: string = environment.BASE_API_URL;
  fethcurl=this._url+'userregistration';
  loginurl=this._url+'login';
  /* Note: no need to convert object data to json data while sending using observable, it defaultly convert object to json format */
  /* observe: 'response' is needed in header to get response status from API */
  signup(userModel: User) {
    let headersdata = new HttpHeaders();
    headersdata.append('Access-Control-Allow-Origin', '*');
    return this._http.post<any>(this._url + 'userregistration', userModel, { headers: headersdata, observe: 'response' })

    /* test using fetch API */
  }
  signup1(userModel: User) {
   return fetch(this._url + 'userregistration', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(
        userModel
      )
    })
  }
  login(uname: any, pass: any) {
    let headers = new HttpHeaders();
    let formData: FormData = new FormData();
    formData.append('email', uname);
    formData.append('password', pass);
    headers.append('Access-Control-Allow-Origin', '*');
    console.log(formData)
    return this._http.post<any>(this.loginurl, formData, { headers: headers, observe: 'response' })
  }

  /* Testing the jwt authentication to get token*/
  /* Noticed response text cannot received, so trying using fetch api */
  loginjwttoken(uname: any, pass: any) {
   let userModel={userName: uname,
    password: pass};
    console.log(userModel)
    let headersdata = new HttpHeaders();
    headersdata.append('Access-Control-Allow-Origin', '*');
    return this._http.post<string>('http://localhost:9192/authenticate', userModel, { headers: headersdata, observe:'response'})
  }

  loginjwttokenfetchapi(uname: any, pass: any) {
    let userModel={userName: uname,
     password: pass};
     console.log(userModel)
     return fetch('http://localhost:9192/authenticate', {
      method: "post",
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin':'*'
      },
      body: JSON.stringify(
        userModel
      )
    })
   }
 

  /* Sending jwt token in header to backend*/
  getAccessusingjwttoken(token:any) {
    let tokenstring="Bearer "+token;
     let headersdata = new HttpHeaders().set("Authorization",tokenstring);
     headersdata.append('Access-Control-Allow-Origin', '*');
     headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
   console.log(token);
   console.log(headersdata);
     return this._http.get<any>('http://localhost:9192/', { headers:headersdata, observe: 'response', responseType:'text' as 'json' })
   }

  forgetpassword(uname: any) {
    let headers = new HttpHeaders();
    let formData: FormData = new FormData();
    formData.append('email', uname);
     headers.append('Access-Control-Allow-Origin', '*');
    console.log(formData)
    return this._http.post<any>(this._url, formData, { headers: headers })
  }

getProductdetails(){
  let headersdata = new HttpHeaders();
    headersdata.append('Access-Control-Allow-Origin', '*');
    return this._http.get<any>(this._url + 'getproducts', { headers: headersdata, observe: 'response', responseType:'json' })
}

/* getAllProducts(){
  let headersdata = new HttpHeaders();
    headersdata.append('Access-Control-Allow-Origin', '*');
    return this._http.get<any>(this._url + 'getproducts', { headers: headersdata, observe: 'response', responseType:'json' })
} */

viewBalancebills(){
  let headersdata = new HttpHeaders();
    headersdata.append('Access-Control-Allow-Origin', '*');
    return this._http.get<any>(this._url + 'viewbalancebills', { headers: headersdata, observe: 'response', responseType:'json' })
}

getBilldetails(billcontent:object){
  let headersdata = new HttpHeaders();
  //let bcontent=JSON.stringify(billcotent);
    headersdata.append('Access-Control-Allow-Origin', '*');
    headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
    console.log(billcontent);
    return this._http.post<any>(this._url + 'addbill',billcontent, { headers: headersdata, observe: 'response'})
}

addProduct(product:object){
  let headersdata = new HttpHeaders();
  //let bcontent=JSON.stringify(billcotent);
    headersdata.append('Access-Control-Allow-Origin', '*');
    headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
    console.log(product);
    return this._http.post<any>(this._url + 'addproduct',product, { headers: headersdata, observe: 'response'})
}

updateProduct(product:object){
  let headersdata = new HttpHeaders();
  //let bcontent=JSON.stringify(billcotent);
    headersdata.append('Access-Control-Allow-Origin', '*');
    headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
    return this._http.put<any>(this._url + 'updateproduct',product, { headers: headersdata, observe: 'response'});
}

deleteProduct(product:object){
  let headersdata = new HttpHeaders();
  //let bcontent=JSON.stringify(billcotent);
    headersdata.append('Access-Control-Allow-Origin', '*');
    headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
    return this._http.delete(this._url + 'deleteproduct', { headers: headersdata,body:product, observe: 'response'});
  }
  /* To test catch error  */
deleteProduct1(product:object){
  let headersdata = new HttpHeaders();
  //let bcontent=JSON.stringify(billcotent);
    headersdata.append('Access-Control-Allow-Origin', '*');
    headersdata.append('Access-Control-Allow-Methods', "GET,POST,OPTIONS,DELETE,PUT");
    return this._http.delete(this._url + 'deleteproduct', { headers: headersdata,body:product}).pipe(catchError(this.handleError));
  }

/* Globally handing http errors */
private handleError(error: HttpErrorResponse) {
  if (error.status === 0) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error);
  }else if (error.status === 500) {
    // A client-side or network error occurred. Handle it accordingly.
    console.error('An error occurred:', error.error.error);
    return throwError(() => new Error(error.error.error));
  }
else if (error.status === 302) {
  // A client-side or network error occurred. Handle it accordingly.
  console.error('An error occurred:', error.error.error);
  return throwError(() => new Error(error.error.error));
}
  else {
    // The backend returned an unsuccessful response code.
    // The response body may contain clues as to what went wrong.
    console.error(
      `Backend returned code ${error.status}, body was: `, error.error);
  }
  // Return an observable with a user-facing error message.
  return throwError(() => new Error('Something bad happened; please try again later.'));
}

}
