import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormArray, FormBuilder, NgForm, Validators, ValidatorFn, ValidationErrors, AbstractControl, FormGroupDirective } from '@angular/forms'
import { EMPTY, Observable, map, of, startWith } from 'rxjs';
import { toArray } from 'rxjs';
import { validator } from '../productavailable';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfcontentService } from '../services/pdfcontent.service';
import { BillpageComponent } from '../billpage/billpage.component';
import { debug, error } from 'console';
import { AppComponent } from '../app.component';
import { MatDialog } from '@angular/material/dialog';
import { DialogpopupComponent } from '../dialogpopup/dialogpopup.component';
import { CommonService } from '../services/common.service';
export interface productentity {
  productId: string,
  productName: string,
  productQuantity: number,
  productPrice: number,
  gst: number,
}

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})


export class BillingComponent implements OnInit {

  @Output()
  downloadClicked: EventEmitter<any> = new EventEmitter();
  apphome: any = false;
  //fullypaid:any='';
  datadate = new Date();
  public files: any;
  message: any;
  billcontent: any = {};
  name = 'Bill';
  productsForm!: NgForm;
  @ViewChild('pFormarray') productsForminput!: NgForm;

  productFormarray: any;
  quantitylist = [0.5, 1, 1.5];
  items!: FormArray;
  totalGstPrice: number = 0;
  totalProductPrice: number = 0;
  /* productlists = [
   { productname: 'apple', price: 10, gst: 10 },
   { productname: 'orange', price: 20, gst: 12 },
   { productname: 'lemon', price: 30, gst: 20 },
   { productname: 'grape', price: 60, gst: 20 },
   { productname: 'bringal', price: 25, gst: 20 },
   { productname: 'tomato', price: 40, gst: 20 },
   { productname: 'kiwi', price: 120, gst: 20 },
   { productname: 'potato', price: 500, gst: 20 }]; */



  productfromapi = `[
  {
      "productId": "T000",
      "productName": "Punnakuuu",
      "productQuantity": "2",
      "productPrice": "40",
      "gst":"20"
  },
  {
      "productId": "T1111",
      "productName": "Thenkaai Punnaku",
      "productQuantity": "2",
      "productPrice": "40",
      "gst":"18"
  },
  {
      "productId": "MT1",
      "productName": "Mattu Theevanam",
      "productQuantity": "2",
      "productPrice": "55",
      "gst":"18"
  },
  {
      "productId": "CP1",
      "productName": "m Punnaku",
      "productQuantity": "10",
      "productPrice": "55",
      "gst":"12"
  }
]`;




  /* json = `[
    {
      "WebsiteName": "Acme Inc.",
      "Time": "08:30:00",
      "TheDate": "2021-12-23",
      "Hits": "39"
    },
    {
      "WebsiteName": "Acme Inc.",
      "Time": "08:45:00",
      "TheDate": "2021-12-23",
      "Hits": "37"
    }
    ]`; */

  //productlists = JSON.parse(this.productfromapi);

  productlists: any;



  productlist!: productentity[];

  productlistoriginal = ['apple', 'lemon', 'orange', 'grape', 'bringal', 'tomato', 'kiwi', 'potato'];
  productlistss = this.productlistoriginal.sort();
  filteroptions!: Observable<productentity[]>;
  spinnerview: any;
  //fullypaidvalue: any=true;
  constructor(private fb: FormBuilder, public pdfService: PdfcontentService, public matdialog: MatDialog, private commonService: CommonService) {
    this.productFormarray = new FormGroup({
      customername: new FormControl('', [Validators.required]),
      mobileno: new FormControl('', [Validators.required]),
      address: new FormControl(''),
      productdetails: new FormArray([]),
      fullypaid: new FormControl(true),
      paidamount: new FormControl(''),
      balanceamount: new FormControl(''),
      totalprice: new FormControl(''),
      totalgst: new FormControl(''),
      billValue: new FormControl('')
    })
  }

  onProductChange(event: any, index: number) {
    const selectedProductName = event.target.value;
    const selectedProduct = this.productlist.find(
      (product) => product.productName == selectedProductName
    );
    if (selectedProduct) {
      const productDetailsArray = this.productFormarray.get(
        'productdetails'
      ) as FormArray;
      if (productDetailsArray && productDetailsArray.at(index)) {
        const quantityControl = productDetailsArray.at(index).get('quantit');
        if (quantityControl) {
          const quantity = quantityControl.value;
          const price = selectedProduct.productPrice * quantity;
          const priceControl = productDetailsArray.at(index).get('price');
          if (priceControl) {
            priceControl.setValue(price);
            const gst = ((selectedProduct.gst * priceControl?.value) / 100);
            const gstControl = productDetailsArray.at(index).get('gst');
            gstControl?.setValue(gst);
            this.onPriceChange(index);

          }
        }
      }
    }
    else {
      const productDetailsArray = this.productFormarray.get(
        'productdetails'
      ) as FormArray;
      const priceControl = productDetailsArray.at(index).get('price');
      if (priceControl) {
        priceControl.setValue('');
        const gstControl = productDetailsArray.at(index).get('gst');
        gstControl?.setValue('');
        this.onPriceChange(index);
      }
    }
  }

  onProductChange1(event: any, index: number) {
    const selectedProductName = event.option.value;
    const selectedProduct = this.productlist.find(
      (product) => product.productName === selectedProductName
    );
    if (selectedProduct) {
      const productDetailsArray = this.productFormarray.get(
        'productdetails'
      ) as FormArray;
      if (productDetailsArray && productDetailsArray.at(index)) {
        const quantityControl = productDetailsArray.at(index).get('quantit');
        if (quantityControl) {
          const quantity = quantityControl.value;
          const price = selectedProduct.productPrice * quantity;
          const priceControl = productDetailsArray.at(index).get('price');
          if (priceControl) {
            priceControl.setValue(price);
          }
        }
      }
    }
    this.onPriceChange(index);
  }

  onQuantityChange(event: any, index: number) {
    const selectedQuantity = +(event || 0);
    const productDetailsArray = this.productFormarray.get(
      'productdetails'
    ) as FormArray;
    if (productDetailsArray && productDetailsArray.at(index)) {
      const productNameControl = productDetailsArray
        .at(index)
        .get('productname');
      if (productNameControl) {
        const selectedProductName = productNameControl.value;
        const selectedProduct = this.productlist.find(
          (product) => product.productName === selectedProductName
        );
        if (selectedProduct) {
          const price = selectedProduct.productPrice * selectedQuantity;
          const priceControl = productDetailsArray.at(index).get('price');
          if (priceControl) {
            priceControl.setValue(price);
          }
        }
      }
    }
    this.onPriceChange(index);
  }

  onPriceChange(index: number) {
    const productDetailsArray = this.productFormarray.get('productdetails') as FormArray;
    /* const priceControl = productDetailsArray.at(index).get('price');
    const gst = ((selectedProduct.gst * priceControl?.value) / 100);
    const gstControl = productDetailsArray.at(index).get('gst');
    gstControl?.setValue(gst); */

    if (productDetailsArray && productDetailsArray.at(index)) {
      const productNameControl = productDetailsArray.at(index).get('productname');
      if (productNameControl) {
        const selectedProductName = productNameControl.value;
        const selectedProduct = this.productlist.find(
          (product) => product.productName === selectedProductName
        );
        if (selectedProduct) {
          const priceControl = productDetailsArray.at(index).get('price');
          const gst = ((selectedProduct.gst * priceControl?.value) / 100);
          const gstControl = productDetailsArray.at(index).get('gst');
          gstControl?.setValue(gst);


        }
      }
    }
    console.log("function is");
    this.totalProductsPrice();
    this.totalGst();
  }

  onPaidChange(event: any) {
    this.balanceAmount();
  }

  addNewProduct() {

    this.items = this.productFormarray.get('productdetails') as FormArray;
    const newProduct = this.createNewProduct();
    this.items.push(newProduct);
    const indexvalue = this.items.length - 1;
    this.productFormarray.get('productdetails').controls[indexvalue].get('quantit').setValue(this.quantitylist[1]);
    /* const productNameControl = newProduct.get('productname');
    if (productNameControl) {
      this.filteroptions = productNameControl.valueChanges.pipe(startWith(''), map(value => this._filter(value)));
      console.log('filteroption--- = ' + this.filteroptions);

      productNameControl.valueChanges.subscribe(selectedProductName => {
        this.onProductChange(selectedProductName, indexvalue);
      }
      );
    }
    const quantityControl = newProduct.get('quantit');
    if (quantityControl) {
      quantityControl.valueChanges.subscribe(selectedQuantity => {
        this.onQuantityChange(selectedQuantity, indexvalue);
         })
    }
    const priceControl = newProduct.get('price');
    if (priceControl) {
      priceControl.valueChanges.subscribe((selectedProductName) =>
        this.onPriceChange(indexvalue)
      );
    } */
  }


  createNewProduct(): FormGroup {
    return new FormGroup({
      productname: new FormControl('', [Validators.required, validator(this.productlists).bind(this)]),
      quantit: new FormControl('1', Validators.required),
      price: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required)
    })
  }




  totalProductsPrice() {

    //const sum1 = this.productdetailsarray.reduce((acc:any, o:any) => acc + parseInt(o.value), 0);
    var sum: number = 0;//Initial value hast to be 0
    for (let i = 0; i < this.productdetailsarray.length; i++) {
      const priceControl = this.productdetailsarray.at(i).get('price');
      if (priceControl) {
        if (priceControl.value !== '') {
          const numbervalue = parseFloat(priceControl.value);//Convert to numbers with parseFloat
          sum = sum + numbervalue;
        }
      }
    }
    if (sum == 0) {
      this.productFormarray.get('totalprice').setValue('');
    } else {
      this.productFormarray.get('totalprice').setValue(sum);
    }

    const priceControl = this.productFormarray.get('totalprice');
    if (priceControl) {
      priceControl.valueChanges.subscribe(() => {
        this.overallBill();
      }
      );
    }

  }

  totalGst() {
    var sum: number = 0;//Initial value hast to be 0
    for (let i = 0; i < this.productdetailsarray.length; i++) {
      const gstControl = this.productdetailsarray.at(i).get('gst');
      if (gstControl) {
        if (gstControl.value !== '') {
          const numbervalue = parseFloat(gstControl.value);//Convert to numbers with parseFloat
          sum = sum + numbervalue;
        }
      }
    }
    if (sum == 0) {
      this.productFormarray.get('totalgst').setValue('');
      this.totalGstPrice = sum;
    } else {
      this.totalGstPrice = sum;
      this.productFormarray.get('totalgst').setValue(sum);
    }
    this.overallBill();

  }

  overallBill() {
    var totalbill: number = 0;//Initial value hast to be 0
    totalbill = Number(this.productFormarray.get('totalprice').value) + this.totalGstPrice;//Sum the numbers
    if (totalbill == 0) {

      this.productFormarray.get('billValue').setValue('');
    } else {
      this.productFormarray.get('billValue').setValue(Math.round(totalbill));
    }
    this.paidAmount();
    this.balanceAmount();

  }

  paidAmount() {
    if (this.fullypaidvalue == true) {
      let overallbill = this.productFormarray.get('billValue').value;
      this.productFormarray.get('paidamount').setValue(overallbill);
    }
    else {
      this.productFormarray.get('balanceamount').setValue(0);
    }
  }

  balanceAmount() {
    let overallbill = this.productFormarray.get('billValue').value;
    let paidamount = this.productFormarray.get('paidamount').value;
    if (this.fullypaidvalue == false) {
      let balanceamount = overallbill - paidamount;
      this.productFormarray.get('balanceamount').setValue(Math.round(balanceamount));
    }
    else {
      this.productFormarray.get('balanceamount').setValue(0);
    }
  }

  removeProduct(index: any) {
    this.items = this.productFormarray.get('productdetails') as FormArray;
    if (this.items.length > 1) {
      this.items.removeAt(index);
    }
    this.totalGst();
    this.totalProductsPrice();
  }
  get productdetailsarray() {
    return this.productFormarray.get('productdetails') as FormArray;
  }

  get fullypaidvalue(): boolean {
    return this.productFormarray.get('fullypaid')?.value;
  }

  ngOnInit() {
    this.getProducts();
    console.log("productlists is" + JSON.stringify(this.productlists));
    //this.addNewProduct();
    /* this.productlist = this.productlists.sort((a: any, b: any) => {
      return a.productName < b.productName ? -1 : a.productName > b.productName ? 1 : 0
    }); */
    console.log("productlist is" + this.productlist);
    console.log('filteroption--- = ' + this.filteroptions);

    //this.filteroptions= this.formcontrol.valueChanges.pipe(startWith(''), map(value=>this._filter(value||'')));
    /* this.productdetailsarray.valueChanges.subscribe(() => {
      this.totalProductsPrice();
      this.totalGst();
    }
    ); */

  }
  clicked(input: any) {
    //this.filteroptions = of(this.productlistss);
    if (input.value) {
      this.performFiltering(input);
    }
    else {
      this.filteroptions = of(this.productlist);
    }
  }

  performFiltering(input: any) {
    if (input.value) {
      this.filteroptions = of(this._filter(input.value));
    } else {
      this.filteroptions = of(this.productlist);
    }
  }
  private _filter(value: string): productentity[] {
    const searchvalue = value.toLocaleLowerCase();
    return this.productlist.filter((option) =>
      option.productName.toLocaleLowerCase().includes(searchvalue)
    );
  }


  onEnter(input: any) {
    console.log("enter value" + input.value);
    this.filteroptions = of();
  }

  openDialog() {
     let dialogpopupref = this.matdialog.open(DialogpopupComponent);
    dialogpopupref.afterClosed().subscribe(result => {
      console.log("dialog result is" + result);
      if (result == "true") {
        console.log("in true");
        this.billcontent = this.productFormarray.value;
        console.log("the bill value is " + this.productFormarray.value);
        this.commonService.getBilldetails(this.productFormarray.value).subscribe({
          next: response => {
            if (response.status == 200) {
              console.log("the received bill respones" + response.body);
              this.pdfService.updatePdfContent(response.body);
            }
          },
          error: errorreceived => {

          }
        })
      }
    }); 
  }
  onSubmit(formvalue: boolean) {
    console.log('in submit');
    this.productFormarray.markAllAsTouched();
    this.productFormarray.get('paidamount').markAsUntouched();
    this.onClickfullypaid();
     if (formvalue == true) {
      this.openDialog();

    }
  }
  getProducts() {
    //this.productlists = JSON.parse(this.productfromapi);
    this.commonService.getProductdetails().subscribe({
      next: response => {
        console.log("in geting product detaisl");
        console.log("response is " + JSON.stringify(response.body))
        let data = JSON.stringify(response.body);
        this.productlists = JSON.parse(data);
        if (response.status == 200) {
          this.addNewProduct();
          this.productlist = this.productlists.sort((a: any, b: any) => {
            return a.productName < b.productName ? -1 : a.productName > b.productName ? 1 : 0
          });

        }

      }
      ,
      error: eerror => {
        console.log("error in getting product details" + eerror)
      }
    })
  };

  onFileChange(event: any) {

    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.files = file;
    }
    if (this.files.size > 5000000) {
      console.log(this.files.type)

      this.message = "File too big"
      //  upl.value = "";
    }
    else {
      this.message = "";
    }
    debugger
    if (this.files.type == "application/vnd.openxmlformats-officedocument.wordprocessingml.document" || this.files.type == "text/plain" || this.files.type == "image/png"
      || this.files.type == "video/*" || this.files.type == "") {
      console.log(this.files.type)
      this.message = "Unsupported file format";
    } else {
      this.message = "";
    }
  }

  myGroup = new FormGroup({
    file: new FormControl(),
  });

  public convetToPDF(content: any) {
    var data = content as HTMLCanvasElement;
    console.log("mee");
    console.log(data);
    html2canvas(data).then(canvas => {
      // Few necessary setting options
      var imgWidth = 208;
      var pageHeight = 295;
      var imgHeight = canvas.height * imgWidth / canvas.width;
      var heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png')
      let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      var position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
      pdf.save('new-file.pdf');

    });
/*       let ss= document.getElementById("dynamicpage");
   if(ss){
    ss.style.display="none";
  }
 */   }

  onClickfullypaid() {
    if (this.productFormarray.get('fullypaid').value == true) {
      this.overallBill();
    }
    // this.productFormarray.get('paidamount').reset();
    // this.productFormarray.get('balanceamount').reset();
  }
  resetProduct() {
    this.items = this.productFormarray.get('productdetails') as FormArray;
    console.log("lenght is " + this.items.length);
    for (let i = 1; i < this.items.length - 1;) {
      this.items.removeAt(i);
      i++;
    }
    //this.items.removeAt(index);
    //this.totalGst();
    //this.totalProductsPrice();
  }

}
