import { Component, OnInit } from '@angular/core';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-billmanagement',
  templateUrl: './billmanagement.component.html',
  styleUrls: ['./billmanagement.component.css']
})
export class BillmanagementComponent implements OnInit {

  billpagecontent= [{billId: 38,
        billNo: 0,
        customername: "babu",
        mobileno: 2345567899,
        address: "porur, chennai-222",
        fullypaid: true,
        paidamount: 0.0,
        balanceamount: 165.0,
        totalprice: 137.5,
        totalgst: 27.5,
        billDate: "2024-12-19",
        billValue: 165}];
        datareceived:boolean=false;
        message:string="";
  constructor(private commonService: CommonService) { }

  ngOnInit(): void {
    this.getBalancebills();
  }

getBalancebills(){
  this.commonService.viewBalancebills().subscribe({
    next:response=>{
      console.log("in geting product detaisl");
      console.log("response is " +JSON.stringify(response.body))
      let data = JSON.stringify(response.body);
      if(response.status==200){
        this.billpagecontent = JSON.parse(data);
        this.datareceived=true;
      }
      
    }
  ,
  error:eerror=>{
  console.log("error in getting product details")
  this.datareceived=false;
  if(navigator.onLine){
this.message="Server Error"
  }
  else{
this.message="Network Error"
  }
  }
    })
}

}
