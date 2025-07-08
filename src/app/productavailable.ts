import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";



/* export function Productavailable(control:AbstractControl):{[key:string]:any}|null
{
const customerror = /admin/.test(control.value);
return customerror?{'customerrorname':{value:control.value}}:null;
} */



/* export function Productavailable(val: string): ValidatorFn {
 
    return (control: AbstractControl): ValidationErrors | null => {
      let productvalue: string = control.value;
      let productlists = [
        { productname: 'apple', price: 10, gst: 10 },
        { productname: 'orange', price: 20, gst: 12 },
        { productname: 'lemon', price: 30, gst: 20 },
        { productname: 'grape', price: 60, gst: 20 },  
        { productname: 'bringal', price: 25, gst: 20 },
        { productname: 'tomato', price: 40, gst: 20 },
        { productname: 'kiwi', price: 120, gst: 20 },
        { productname: 'potato', price: 500, gst: 20 }];

        const selectedProduct = productlists.find(
            (product) => product.productname === productvalue
          );

          if (productvalue=='') {
            return null;
          }      
           if (selectedProduct==null) {
            return { 'productnotavailable': true, 'requiredValue': val }
          }      
      return null;
    }
   
  } */


  export function validator(product:any[]){
    return (control: AbstractControl): ValidationErrors | null => {
      let productvalue: string = control.value;
      
      const selectedProduct = product.find(
          (products) => products.productName === productvalue
        );

        if (productvalue=='') {
          return null;
        }      
         if (selectedProduct==null) {
          return { 'productnotavailable': true, 'requiredValue': productvalue }
        }      
    return null;
  }
    }