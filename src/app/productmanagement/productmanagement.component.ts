import { Component, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {AfterViewInit, ViewChild} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { LiveAnnouncer } from '@angular/cdk/a11y';
import { CommonService } from '../services/common.service';
import {TooltipPosition} from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { ProductpopupComponent } from '../popups/productpopup/productpopup.component';
import { SSL_OP_ALL } from 'constants';
export interface PeriodicElement {
  productId: string;
  productName: string;
  productQuantity: number;
  productPrice: number;
  gst:number;
}

@Component({
  selector: 'app-productmanagement',
  templateUrl: './productmanagement.component.html',
  styleUrls: ['./productmanagement.component.css']
})



export class ProductmanagementComponent implements OnInit {
  dataSource:any;
  applyFilter($event: KeyboardEvent) {
    const filterValue = ($event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  
    displayedColumns: string[] = ['productId', 'productName', 'productQuantity', 'productPrice','gst', 'action'];
    
    
   @ViewChild(MatSort) sort!: MatSort;

    constructor(private _liveAnnouncer: LiveAnnouncer, private authservice:AuthService, private commonService:CommonService, private dialog:MatDialog) { 
      this.getAllProducts();
    }

  ngOnInit(): void {
    
    
  }
  ngAfterViewInit() {
    //this.dataSource.sort = this.sort;
  }
  
  openproductpopup(product:any,activity:any){
    console.log(product.productId);
    this.dialog.open(ProductpopupComponent,{
       autoFocus: false,
        data:{
          activity,
          productId:product.productId,
          productName:product.productName,
          productQuantity:product.productQuantity,
          productPrice:product.productPrice,
          gst:product.gst
        },
        
    });
/*      popup.afterClosed().subscribe(data=>{
      console.log(data);
    });     
 */  }

  getAllProducts(){
    this.commonService.getProductdetails().subscribe({
      next:response=>{
        console.log("in geting product detaisl");
        console.log("response is " +JSON.stringify(response.body))
        let data = JSON.stringify(response.body);
        if(response.status==200){
         this.dataSource= new MatTableDataSource(JSON.parse(data));
         this.dataSource.sort=this.sort;
         }
        
      }
    ,
    error:eerror=>{
    console.log("error in getting product details")
    }
      })
  }

}
