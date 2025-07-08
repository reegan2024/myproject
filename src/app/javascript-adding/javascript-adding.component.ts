import { Component, OnInit } from '@angular/core';

declare function forforgot(): void;
@Component({
  selector: 'app-javascript-adding',
  templateUrl: './javascript-adding.component.html',
  styleUrls: ['./javascript-adding.component.css']
})
export class JavascriptAddingComponent implements OnInit {

  constructor() {
    
   }

  ngOnInit(): void {
    forforgot();
  }

  forforgot()
  {
    alert("333");
  }

}

