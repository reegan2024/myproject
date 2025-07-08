import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit{
  ngOnInit(): void {
    //this.apphome=false;;
  }
  title = 'RRMILL';
  appbody:boolean=false;
  uname:string="name is reegan";
}
