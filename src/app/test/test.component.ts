export interface productentity{
  productname:string,
  price:number,
  gst:number,
}
import { Component, OnInit } from '@angular/core';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  FormArray,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { AsyncPipe, CommonModule } from '@angular/common';
import {
  MatAutocomplete,
  MatAutocompleteModule,
} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable, map, of, startWith } from 'rxjs';

/**
 * @title Highlight the first autocomplete option
 */
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})


export class TestComponent implements OnInit {
  productFormarray: any;
//  formcontrol = new FormControl('');
  quantitylist = [0.5, 1, 1.5];
  items!: FormArray;
  totalGstPrice: number = 0;
  totalProductPrice: number = 0;
  productlists = [
    { productname: 'apple', price: 10, gst: 10 },
    { productname: 'orange', price: 20, gst: 12 },
    { productname: 'lemon', price: 30, gst: 20 },
    { productname: 'grape', price: 60, gst: 20 },  
    { productname: 'bringal', price: 25, gst: 20 },
    { productname: 'tomato', price: 40, gst: 20 },
    { productname: 'kiwi', price: 120, gst: 20 },
    { productname: 'potato', price: 500, gst: 20 }];

productlist!:productentity[];

  productlistoriginal = ['apple', 'lemon', 'orange','grape','bringal','tomato','kiwi','potato'];
  productlistss = this.productlistoriginal.sort();
  filteroptions!: Observable<productentity[]>;

  resetFilters() {
    this.filteroptions = of(this.productlist);
  }
  constructor(private fb: FormBuilder) {
    this.productFormarray = new FormGroup({
      customername: new FormControl('', Validators.required),
      productdetails: new FormArray([]),
      remember: new FormControl('true'),
      totalprice: new FormControl(''),
    });
  }

  onProductChange(event: any, index: number) {
    const selectedProductName=event.target.value;
   
    console.log("index vale = " +index);
     console.log(selectedProductName);
   
    const selectedProduct = this.productlist.find(
      (product) => product.productname === selectedProductName
    );
    if (selectedProduct) {
      const productDetailsArray = this.productFormarray.get(
        'productdetails'
      ) as FormArray;
      if (productDetailsArray && productDetailsArray.at(index)) {
        const quantityControl = productDetailsArray.at(index).get('quantit');
        if (quantityControl) {
          const quantity = quantityControl.value;
          const price = selectedProduct.price * quantity;
          const priceControl = productDetailsArray.at(index).get('price');
          if (priceControl) {
            priceControl.setValue(price);
          }
        }
      }
    }
    this.onPriceChange(index);
  }

  onProductChange1(event: any, index: number) {
    const selectedProductName=event.option.value;    
    console.log("index vale = " +index);
     console.log(selectedProductName);
   
    const selectedProduct = this.productlist.find(
      (product) => product.productname === selectedProductName
    );
    if (selectedProduct) {
      const productDetailsArray = this.productFormarray.get(
        'productdetails'
      ) as FormArray;
      if (productDetailsArray && productDetailsArray.at(index)) {
        const quantityControl = productDetailsArray.at(index).get('quantit');
        if (quantityControl) {
          const quantity = quantityControl.value;
          const price = selectedProduct.price * quantity;
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
          (product) => product.productname === selectedProductName
        );
        if (selectedProduct) {
          const price = selectedProduct.price * selectedQuantity;
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
          (product) => product.productname === selectedProductName
        );
        if (selectedProduct) {
          const priceControl = productDetailsArray.at(index).get('price');
          const gst = (selectedProduct.gst * priceControl?.value) / 100;
          const gstControl = productDetailsArray.at(index).get('gst');
          gstControl?.setValue(gst);
        }
      }
    }
  }

  addNewProduct() {
    this.items = this.productFormarray.get('productdetails') as FormArray;
    const newProduct = this.createNewProduct();
    this.items.push(newProduct);
    const indexvalue = this.items.length - 1;
    this.productFormarray
      .get('productdetails')
      .controls[indexvalue].get('quantit')
      .setValue(this.quantitylist[1]);
    // const productNameControl = newProduct.get('productname');
    // if (productNameControl) {
    //   productNameControl.valueChanges.subscribe((selectedProductName) => {
    //     this.onProductChange(selectedProductName, indexvalue);
    //   });
    // }
    // const quantityControl = newProduct.get('quantit');
    // if (quantityControl) {
    //   quantityControl.valueChanges.subscribe((selectedQuantity) => {
    //     this.onQuantityChange(selectedQuantity, indexvalue);
    //   });
    // }
    // const priceControl = newProduct.get('price');
    // if (priceControl) {
    //   priceControl.valueChanges.subscribe((selectedProductName) =>
    //     this.onPriceChange(selectedProductName, indexvalue)
    //   );
    // }
  }

  createNewProduct(): FormGroup {
    return new FormGroup({
      productname: new FormControl('', Validators.required),
      quantit: new FormControl('1', Validators.required),
      price: new FormControl('', Validators.required),
      gst: new FormControl('', Validators.required),
    });
  }


  removeProduct(index: any) {
    this.items = this.productFormarray.get('productdetails') as FormArray;
    this.items.removeAt(index);
  }
  get productdetailsarray() {
    return this.productFormarray.get('productdetails') as FormArray;
  }

  ngOnInit() {
    this.addNewProduct();
    this.productlist = this.productlists.sort((a:any,b:any)=> {
      return a.productname < b.productname ? -1 : a.productname > b.productname ? 1 : 0
    });
    console.log(this.productlist);
    console.log('filteroption--- = ' + this.filteroptions);
  }

  clicked(input: any) {
    //this.filteroptions = of(this.productlistss);
    if (input.value) {
      this.performFiltering(input);
    }
    else{
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
      option.productname.toLocaleLowerCase().includes(searchvalue)
    );
  }


onEnter(input: any){
console.log("enter value"+input.value);
this.filteroptions = of();
  }

  onSubmit() {}
}