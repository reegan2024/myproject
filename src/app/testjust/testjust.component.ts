import { Component, OnInit, OnDestroy, OnChanges, DoCheck, AfterViewInit, ViewChild, ElementRef, Renderer2, ViewChildren, QueryList } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { fontStyle } from 'html2canvas/dist/types/css/property-descriptors/font-style';
import { TestchildComponent } from '../testchild/testchild.component';
import { TestComponent } from '../test/test.component';
import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { BehaviorSubject, Subject } from 'rxjs';
import { of, from, map, filter } from 'rxjs'
import { CommonService } from '../services/common.service';


@Component({
  selector: 'app-testjust',
  templateUrl: './testjust.component.html',
  styleUrls: ['./testjust.component.css']
})
export class TestjustComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {

  mystyle: any = "";
  testnamedata: any = "";
  toppings = new FormControl();
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];
  email: string = "sdfdsdfdff";
  haserrorClass: any = "haserror";
  successClass: any = "success";
  testform: any = "";
  colors: string = "forcolors";
  numSequence(n: number): Array<number> {
    return Array(n);
  }
  myemitterdata: string = "";

  @ViewChild("div1") viewtestchildtemplatedom!: ElementRef;
  @ViewChildren("div1") viewtestchildrenstemplatedom!: QueryList<ElementRef>;
  @ViewChild('mychild1') viewtestchild!: TestchildComponent;
  @ViewChildren(TestchildComponent) viewtestchildrens!: QueryList<Component>;

  myobserable$ = new Observable(sender => {
    sender.next('First value');
    setTimeout(() => sender.next('Second value'), 3000);
    sender.next('third value');
    setInterval(() => sender.next(new Date()), 1000);
  });
  subscription!: Subscription;

  mySubject$ = new Subject()

  ngOnChanges() {
    console.log("in parent on changes");
  }

  ngOnInit(): void {
    console.log("in parent oninit");
    let mstring = "how r 2";
    let result = "";
    for (let i = mstring.length; i >= 0; i--) {
      result += mstring.charAt(i);
    }
    console.log("the value is" + result);

  }

  ngOnDestroy() {
    console.log("in parent destroy");
    if (this.subscription) {
      this.subscription.unsubscribe();
    }

  }
  ngAfterViewInit(): void {
    //this.viewtestchildtemplatedom.nativeElement.style.color='red';
    //this.viewtestchildrenstemplatedom[0].nativeElement.style.color='green';
    let content = this.viewtestchildrenstemplatedom;
    content.forEach(element => {
      element.nativeElement.style.color = 'green';
      console.log(element.nativeElement);

    });
  }

  test() {
    this.renderer.setProperty(this.viewtestchildrenstemplatedom[1].nativeElement, 'innerHTML', '<p>Hello World<p>');
    this.viewtestchild.childvalue = "hi i am frm parent component";
    this.viewtestchild.testname

  }

  add() {
    console.log("in parent destroy");
  }


  messagecolors = {
    'text-color': true,
    'text-style': true
  }

  stylecolors = {
    fontStyle: 'italic',
    color: 'green'
  }



  productlists = [
    {
      productname: 'orange', price:
        [{ small: 20 }, { medium: 30 }, { large: 40 }], gst: 12
    },
    {
      productname: 'lemon', price:
        [{ small: 40 }, { medium: 80 }, { large: 102 }], gst: 20
    },
    {
      productname: 'apple', price:
        [{ small: 40 }, { medium: 80 }, { large: 102 }], gst: 20
    }

  ];


  constructor(private fb: FormBuilder, private renderer: Renderer2, private sharedservice: CommonService) {
    //debugger;
    this.testform = new FormGroup({
      customername: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z\s]+')])

    });
  }
  /* Tested promise my self */
  Promise() {
    let myPromise = new Promise(function (resolve, reject) {
      let a = 10, b = 2;
      fetch('https://jsonplaceholder.typicode.com/posts/1')
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(json => resolve(json))
        .catch(error => {
          reject(error);
        })

    });
    myPromise.then(
      (dataa: any) => {
        console.log("the data is " + JSON.stringify(dataa));
      },
      (error) => {
        console.log(error);
      }
    );
  }

  mycallbackfunction(data, callbak) {
    let sum = 4 + data;
    callbak(sum);

  }

  obserablecheck() {


    /* myobserable$.subscribe((data:any)=>{console.log(data)},(error:any)=>{console.log("eeeee" +error)},(complete)=>{});
     */
    this.subscription = this.myobserable$.subscribe({
      next: data => {
        console.log('Custom Observable:', data)
        let childelement = document.createElement("p");
        childelement.innerHTML = String(data) + "<br>";

        const element = document.getElementById('out');
        if (element) {
          element.appendChild(childelement);
        }
      },
      error: error => console.error('Custom Observable Error:', error),
      complete: () => console.log('Custom Observable completed'),
    });

  }

  rxjsoperator() {
    let aray1 = [1, 2, 3]
    let rjxsof = of(aray1);

    let rjxsfrom = from(aray1);

    rjxsfrom.subscribe(a => {
      console.log(a);
    })
    /* pipe, map and filter */
    let mapfilter = rjxsfrom.pipe(
      map(a => { return a + 5 }), filter(a => { return a > 2 })
    );


    mapfilter.subscribe(a => {
      console.log(a);
    })


  }

  enteredtext($event: any) {
    console.log($event?.target.value);
  }

  sharingdataemitter() {
    this.sharedservice.shardatausingemmiter(this.myemitterdata);
  }
  

}
