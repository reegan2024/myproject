import { Component, OnInit, OnChanges, Input, OnDestroy, SimpleChanges, AfterViewInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-testchild',
  templateUrl: './testchild.component.html',
  styleUrls: ['./testchild.component.css']
})
export class TestchildComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  @Input() testname:any;
  
  shareddata:string="";

  childvalue:string="hi";
 
  ngAfterViewInit(): void {
    this.childvalue="hi in viewinit";
    console.log("in testchild afterviewinit");
  }


  ngOnChanges(changes: SimpleChanges): void {
    console.log("in testchild ngonchanges");
  }

  constructor(private commonservie:CommonService) { }

  ngOnInit(): void {
    console.log("in testchild oninit");
    this.testname="sss";

    /* this.commonservie.evenemitter.subscribe(a=>this.shareddata=a); */
    this.commonservie.subject$.subscribe(a=>this.shareddata=a);
  }
  

  ngOnDestroy(){
    console.log("in testchild destroy");
  }


}
