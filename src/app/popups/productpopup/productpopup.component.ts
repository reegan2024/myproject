import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { error } from 'console';
import { CommonService } from 'src/app/services/common.service';
import { MessageComponent } from '../message/message.component';

@Component({
  selector: 'app-productpopup',
  templateUrl: './productpopup.component.html',
  styleUrls: ['./productpopup.component.css']
})
export class ProductpopupComponent implements OnInit {
  productForm = new FormGroup({
    productId: new FormControl('', [Validators.required]),
    productName: new FormControl('', [Validators.required]),
    productQuantity: new FormControl('', [Validators.pattern('^([0-9]+)?\.?([0-9]+)?$')]),
    productPrice: new FormControl('', [Validators.required, Validators.pattern('^([0-9]+)?\.?([0-9]+)?$')]),
    gst: new FormControl('', [Validators.required, Validators.pattern('^([0-9]+)?\.?([0-9]+)?$')])
  });
  receivedata:any;
  msgdata: any;
  statusdata!: boolean;
  popuptitle: string = "";
  buttontext: string = "Save";
  productAction() {
    if (this.inputdata.activity == 'Edit') {
      this.updateProduct();
    }

    if (this.inputdata.activity == 'Delete') {
      console.log(this.inputdata.activity);
      console.log(this.productForm.value);
      this.deleteProduct1();
    }

    if (this.inputdata.activity == 'Add') {
      this.saveProduct();
    }

  }


  saveProduct() {
    if (this.productForm.valid == true) {
      console.log(this.productForm.valid);
      console.log(this.productForm.value);
      let productdetails = this.productForm.value;
      this.commonService.addProduct(productdetails).subscribe({
        next: result => {
          console.log("product saved" + result.body.message);
          this.msgdata = result.body.message;
          this.statusdata = true;
          this.openproductpopup();
          //this.ref.close("closed using function (in popup)");    
        },
        error: errors => {
          console.log("in default error " + errors)
          if (errors.message) {
            if (errors.error) {
              console.log("in custom error " + errors)
              this.msgdata = errors.error.message;
              this.statusdata = false;
              this.openproductpopup();
            } else {
              this.msgdata = errors.message;
              this.statusdata = false;
              this.openproductpopup();
            }
          }
          else {
            this.msgdata = "Either server or network error";
            this.statusdata = false;
            this.openproductpopup();
          }
        }
      });

    }
  }

  updateProduct() {
    if (this.productForm.valid == true) {
      this.productForm.get('productId')?.enable();
      this.productForm.get('productName')?.enable();
      console.log(this.productForm.valid);
      console.log(this.productForm.value);
      let productdetails = this.productForm.value;
      this.commonService.updateProduct(productdetails).subscribe({
        next: result => {
          console.log("product saved" + result.body.message);
          this.msgdata = result.body.message;
          this.statusdata = true;
          this.openproductpopup();
          this.closepopup();
          //this.ref.close("closed using function (in popup)");    
        },
        error: errors => {
          console.log("in default error " + errors)
          this.productForm.get('productId')?.disable();
          this.productForm.get('productName')?.disable();
          if (errors.message) {
            if (errors.error) {
              console.log("in custom error " + errors)
              this.msgdata = errors.error.message;
              this.statusdata = false;
              this.openproductpopup();
            } else {
              this.msgdata = errors.message;
              this.statusdata = false;
              this.openproductpopup();
            }
          }
          else {
            this.productForm.get('productId')?.disable();
            this.productForm.get('productName')?.disable();
            this.msgdata = "Either server or network error";
            this.statusdata = false;
            this.openproductpopup();
          }
        }
      });

    }
  }

  deleteProduct1(){
    this.productForm.enable();
    if (this.productForm.valid == true) {
      this.productForm.get('productId')?.enable();
      this.productForm.get('productName')?.enable();
      console.log(this.productForm.valid);
      console.log(this.productForm.value);
      let productdetails = this.productForm.value;
    this.commonService.deleteProduct1(productdetails).subscribe({
      next:result => {
        this.receivedata=result;
        this.msgdata = <object>this.receivedata.message;
        this.statusdata = true;
        this.openproductpopup();
        this.closepopup();
      }, error: errordata=>{
console.log("component error data" +errordata.message);
this.msgdata = errordata;
this.statusdata = false;
this.openproductpopup();

}
      
    })
  }
  }

  /* deleteProduct() {
    this.productForm.enable();
    if (this.productForm.valid == true) {
      this.productForm.get('productId')?.enable();
      this.productForm.get('productName')?.enable();
      console.log(this.productForm.valid);
      console.log(this.productForm.value);
      let productdetails = this.productForm.value;
      this.commonService.deleteProduct(productdetails).subscribe({
        next: result => {
          this.msgdata = result.body.message;
          this.statusdata = true;
          this.openproductpopup();
          this.closepopup();
        },
        error: errors => {
          console.log("in default error " + errors)
          this.productForm.get('productId')?.disable();
          this.productForm.get('productName')?.disable();
          if (errors.message) {
            if (errors.error) {
              console.log("in custom error " + errors)
              this.msgdata = errors.error.message;
              this.statusdata = false;
              this.openproductpopup();
            } else {
              this.msgdata = errors.message;
              this.statusdata = false;
              this.openproductpopup();
            }
          }
          else {
            this.productForm.get('productId')?.disable();
            this.productForm.get('productName')?.disable();
            this.msgdata = "Either server or network error";
            this.statusdata = false;
            this.openproductpopup();
          }
        },
      }
      );
    }
  } */


  constructor(@Inject(MAT_DIALOG_DATA) public ddata: any, private ref: MatDialogRef<ProductpopupComponent>, private commonService: CommonService, private messagedialog: MatDialog) { }
  inputdata: any;
  closepopup() {
    this.ref.close("closed using function (in popup)");
  }

  ngOnInit(): void {
    this.inputdata = this.ddata;
    if (this.inputdata.activity == 'Edit') {
      this.popuptitle = "Edit this Product";
      this.setValue();
    }

    if (this.inputdata.activity == 'Delete') {
      this.popuptitle = "Delete this Product";
      this.buttontext = "Delete";
      this.setValue();
      this.productForm.disable();
    }

    if (this.inputdata.activity == 'Add') {
      this.popuptitle = "Add New Product";
    }

  }

  setValue() {
    this.productForm.get('productId')?.setValue(this.inputdata.productId);
    this.productForm.get('productId')?.disable();
    this.productForm.get('productName')?.setValue(this.inputdata.productName);
    this.productForm.get('productName')?.disable();
    this.productForm.get('productQuantity')?.setValue(this.inputdata.productQuantity);
    this.productForm.get('productPrice')?.setValue(this.inputdata.productPrice);
    this.productForm.get('gst')?.setValue(this.inputdata.gst);
  }

  /* To open message popup */
  openproductpopup() {
    console.log("totest" + this.msgdata);
    this.messagedialog.open(MessageComponent, {
      autoFocus: false,
      data: {
        message: this.msgdata,
        status: this.statusdata
      },
    });
  }

}
