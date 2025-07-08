import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { User } from '../model/usermodel';
import { CommonService } from '../services/common.service';
import { NotificationService } from '../services/notification.service';
import { filter, of, reduce, map } from 'rxjs';
import { HttpStatusCode } from '@angular/common/http';
import { error } from 'console';
//import { StudentprofileComponent } from '../studentprofile/studentprofile.component';
//import { ToastrService } from 'ngx-toastr';

declare var $: any;
//import { data } from 'jquery';
/* import { FormBuilder } from '@angular/forms'; */


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {


onSubmitjwttokentest(arg0: boolean) {
  
  this._loginservice.loginjwttoken(this.userModel.email, this.userModel.password).subscribe(response=>{console.log(response)
    let authToken:any="";
      authToken = response.headers.get('Authorization');
      console.log(authToken);
  });

  
  

    
/*     {
    next:response=>{

          console.log("in response block");
    }
  ,
    error:eerror=>{

      console.log("in errror block");
      console.log(eerror);
    }
}); 
 */    
}
/* Get jwt token text using fetch api,working fine */
onSubmitjwttokentestfetch(arg0: boolean) {
  
  this._loginservice. loginjwttokenfetchapi(this.userModel.email, this.userModel.password).then(response=>response.text()).then(resp=>
    {console.log(resp);
    localStorage.setItem('token',resp);
    console.log(localStorage.getItem('token'));
    }
  )
}
/* Sendig  jwt token to backend to authenticate get api,working fine */
onSubmitjwttokenbackend(arg0: boolean) {
  let token=localStorage.getItem('token');
  this._loginservice.getAccessusingjwttoken(token).subscribe({
    next:response=>console.log("response is " +response.body)
  ,
    error:eerror=>{console.log("error is "+eerror)}
}); 
    
}


@Input() public testname;

  public loginsection: boolean = false;
  public forgotsection: boolean = true;
  public passwordsection: boolean = true;
  public signupsection: boolean = true;
  //submitted = false;

  userModel = new User("", "", "");
  forgotModel = new User('', '');
  userSignupModel = new User('', '', '');
  public email = this.userModel.email;
  public pass = this.userModel.password;

  //received data --login
  public loginstatus: any;
  public loginmessage: any;
  public successmsg: boolean = true;
  public failuremsg: boolean = true;
  public receivedmessage: string = "";

  /* for forgot password */
  public forgotpasswordstatus: any;
  public successmsgforgot: boolean = true;
  public failuremsgforgot: boolean = true;
  public receivedmessageforgot: string = "";

  /* Password hide and show */
  show_button: boolean = false;
  show_eye: boolean = false;

  public done: boolean = false;

  isJqueryWorking: any;
  spinnerview: boolean = true;
  

  constructor(public _loginservice: CommonService, public _signupservice: CommonService, public _router: Router, public notification: NotificationService) { 
  }
  ngOnInit(): void {
    console.log("login component initialised");
    /*     $(document).ready(() => {  
        console.log("SSSS");
        $("#pwdshow").click(function(){
          alert("Hello! I am an alert box!!");
            $("#upassword").attr('type', 'text');
             $('.showspan').removeClass('la-eye-slash');
            $('.showspan').addClass('fa-eye');
            });  
      
    });  */

  }
  

  showPassword() {
    this.show_button = !this.show_button;
    this.show_eye = !this.show_eye;
  }

  forgotpassection() {
    this.loginsection = true;
    this.forgotsection = false;
    this.successmsg = true;
    this.failuremsg = true;
  }

  signupaccountsection() {
    this.loginsection = true;
    this.forgotsection = true;
    this.successmsg = true;
    this.failuremsg = true;
    this.signupsection = false;
  }

  loginaccountsection() {
    this.loginsection = false;
    this.forgotsection = true;
    this.successmsg = true;
    this.failuremsg = true;
    this.signupsection = true;
  }
  /* for forgot password */
  forgotsubmit(formemailvalue: boolean) {
    if (formemailvalue == true) {
      this._loginservice.forgetpassword(this.forgotModel.email)
        .subscribe(
          (data: any) => {
            //this.forgotpasswordstatus=data.status;
            //console.log(this.forgotpasswordstatus);
            this.receivedmessageforgot = data.message;
            console.log("to test");
            if (data.status == 200) {
              this.successmsgforgot = false;
              this.failuremsgforgot = true;
              //this.toastr.success(this.receivedmessageforgot)
            }
            else if (data.status == 1004) {
              //this.loginstatus=false;
              console.log(data.status);
              this.successmsgforgot = true;
              this.failuremsgforgot = false;
              //this.toastr.error(this.receivedmessageforgot)

            }

          },
          (error: any) => console.error('errorrrrr', error)
        )

    }

  }

  backtologin() {
    this.forgotsection = true;
    this.loginsection = false;
    this.passwordsection = true;
    this.successmsgforgot = true;
    this.successmsgforgot = true;
    this.failuremsgforgot = true;
  }

  onFocus() {
    this.failuremsg = true;
    this.failuremsgforgot = true;
  }

  onSignup(formvalue: boolean) {
    if (formvalue == true) {
      this.spinnerview = false;
      this._signupservice.signup(this.userSignupModel).subscribe({
        next: response => {
          $('.spinner').hide();
          console.log("in response block");
          console.log(response.status);
          console.log(response);
          if (response.status == 200) {
            console.log(response.status);
            console.log("in response block");
            console.log(response.body);
            this.successmsg = false;
            this.failuremsg = true;
            this.receivedmessage = response.body.message;
            //this.router.navigateByUrl('/url');
            //this.toastr.success(this.receivedmessage)
            this.notification.showSuccess(this.receivedmessage, 'Login')
            //this._router.navigate(["studentprofile"]);
            $('.spinner').show();
            setTimeout(() => {

              this._router.navigate(['/home']);
            }, 5000)
            console.log(response.body)
            localStorage.setItem('userId', JSON.stringify(response.body.uid));
          } else {

          }
        },
        error: eresponse => {
          $('.spinner').hide();
          let message = "";
          console.log("fir" + eresponse.status);
          console.log("secd" + eresponse.error);
          console.log("third" + eresponse.error.message);
          console.log("in error block");
          console.log(eresponse.message);
          if (eresponse.status == 302) {


            this.successmsg = true;
            this.failuremsg = false;
            this.receivedmessage = eresponse.error.message;
            this.notification.showError(eresponse.error.message, 'Error')
          } else {
            this.receivedmessage = "Server or Network error";
            this.notification.showError(this.receivedmessage, 'Error')
          }

        }
      })
    }
  }

  onSignup1(formvalue: boolean) {
    if (formvalue == true) {
      this.spinnerview=false
      this._signupservice.signup1(this.userSignupModel)
        .then(response => {
          console.log(response.status);
          this.spinnerview = true;
          if (response.status == 200) {
            response.json().then((data) => {
              console.log(data.message)
              this.notification.showSuccess(data.message, 'Login')
              $('.spinner').show();
              setTimeout(() => {
                this._router.navigate(['/home']);
              }, 5000)
              console.log(data.data.userid)
              localStorage.setItem('userId', data.data.userid);
              localStorage.setItem('username', data.data.name);

            })
          };
          if (response.status == 406) {
            response.json().then((data) => {
              console.log(data.message)
              console.log(data.listmsgs[0])
              this.notification.showError(data.message, 'Error')
            })
          };
          if (response.status == 400) {
            response.json().then((data) => {
              const errortypes = data;
              let text = "";
              for (let [errors, value] of Object.entries(errortypes)) {
                text += errors + ": " + value + "\n";
              }
              this.notification.showError(text, 'Error')
            })
          };
        })
        .catch((error) => {
          console.log("In error block" + error);
        });
    }
  }
  /* For Login screen */
  onSubmit(formvalue: boolean) {

    if (formvalue == true) {
      this.spinnerview=false
      console.log(this.userModel);


      /* this._loginservice.login(this.userModel.email, this.userModel.password)
        .subscribe(
        data => {
          this.loginstatus = data.status;          
          this.receivedmessage = data.message;
          console.log(data.message);
          if (this.loginstatus == 200) {
            console.log(this.loginstatus == 200);
            this.successmsg = false;
            this.failuremsg = true;
            //this.router.navigateByUrl('/url');
            this.toastr.success(this.receivedmessage)
            //this._router.navigate(["studentprofile"]);
            setTimeout(() =>{
              this._router.navigate(['/studentprofile']);
            }, 5000)
            console.log(data.result)
            localStorage.setItem('userId',JSON.stringify(data.result));
          }
          else if (this.loginstatus == 1001) {
            this.successmsg = true;
            this.failuremsg = false;
            this.toastr.error(this.receivedmessage)

          }
          else if (this.loginstatus == 1002) {
            console.log('sdfdf');
            this.successmsg = true;
            this.failuremsg = false;
            this.toastr.error(this.receivedmessage)
          }
        },
        error => console.error('errorrrrr', error)
        ) */

      this._loginservice.login(this.userModel.email, this.userModel.password).subscribe({
        next: response => {
          $('.spinner').hide();
          if (response.status == 200) {
            this.successmsg = false;
            this.failuremsg = true;
            this.receivedmessage = response.body.message;
            console.log(response.body.message);
            //this.router.navigateByUrl('/url');
            //this.toastr.success(this.receivedmessage)
            this.notification.showSuccess(this.receivedmessage,'')
            //this._router.navigate(["studentprofile"]);
            setTimeout(() => {
              this._router.navigate(['/products']);
            }, 2000)
            localStorage.setItem("userId", JSON.stringify(response.body.data.userid));
            localStorage.setItem('userName', JSON.stringify(response.body.data.name));
          } else {

          }
        },

        error: eresponse => {
          $('.spinner').hide();
          if (eresponse.status == 400) {
            this.receivedmessage = eresponse.error.message;
            this.notification.showError(this.receivedmessage,'')
          } else
            if (eresponse.status == 401) {
                 this.receivedmessage = eresponse.error.message;
                 this.notification.showError(this.receivedmessage,'')
            }
            else {
              this.receivedmessage = "Server or Network error";
              this.notification.showWarning(this.receivedmessage,'Error')
            }

        }
      })
      /* data => {
      
      
      console.log(data.body);
      console.log(data.body.message);
      console.log(data.status);
      //console.log(data.headers);
      
    }, 
    
    error => console.error('errorrrrr', error)
    ) 
 
 
  }*/



    }

/* pwdshow() {
  $("#upassword").attr('type', 'text');
  $('.showspan').removeClass('la-eye-slash');
  $('.showspan').addClass('fa-eye');
}
pwdhide() {
  $("#upassword").attr('type', 'password');
  $('.showspan').removeClass('fa-eye');
  $('.showspan').addClass('la-eye-slash');
}

 */}


  /* $("#pwdshow").click(function () {
    alert("Hello! I am an alert box!!");
    $("#upassword").attr('type', 'text');
    $('.showspan').removeClass('la-eye-slash');
    $('.showspan').addClass('fa-eye');
  }); */


}

