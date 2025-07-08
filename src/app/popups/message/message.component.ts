import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {
inputdata:any;
message:string="";
statusdata!:boolean;
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    console.log(this.data.message)
   }

  ngOnInit(): void {
    this.inputdata=this.data;
    this.message=this.data.message;
    this.statusdata=this.data.status;
    console.log("in message");
  }

}
