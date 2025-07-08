import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { PdfcontentService } from '../services/pdfcontent.service';
import { HttpClient } from '@angular/common/http';
import { map,pipe,interval,take } from 'rxjs';


@Component({
  selector: 'app-billpage',
  templateUrl: './billpage.component.html',
  styleUrls: ['./billpage.component.css']
})
export class BillpageComponent implements OnInit {

  billpagecontent: any = {};
  showContent: boolean = true;
  data = this.http.get('https://jsonplaceholder.typicode.com/todos/1');
  /* mydate$=interval(1000).pipe(
    map(x=>new Date().getSeconds()),take(20),x=>(x)) */

  constructor(public pdfService: PdfcontentService,private detectorChange: ChangeDetectorRef, public http:HttpClient) {
   
  }

  ngOnInit(): void {
    console.log("in bilpage com")
    this.pdfService.pdfContent$.subscribe(content => {
      if (content) {
        console.log("inside billpage intit method");
        console.log("the content is " +content);
        this.billpagecontent = content;
        let pdfcontent = document.getElementById('billpagecontent');
        setTimeout(() => this.convetToPDF(pdfcontent), 1000);
        //this.convetToPDF(pdfcontent);
        console.log("after pdf generation")

      }
    });
  }

/*   billcontentGeneration(){
    this.pdfService.pdfContent$.subscribe(content => {
      if (content) {
        
        this.billpagecontent = content;
        let pdfcontent = document.getElementById('billpagecontent');
        this.convetToPDF(pdfcontent);
          setTimeout(() => {
          this.convetToPDF(pdfcontent);
        }, 0);  
      }
    });

  }
 */
add(){
  let a=20;
  let b=30;
  console.log(a+b);
  let fname = this.person.fullName;
  console.log(fname);
}
person = {
  firstName:"John",
  lastName: "Doe",
  fullName: function() {
    return this.firstName + " " + this.lastName;
  }
}
member = {
  firstName:"Hege",
  lastName: "Nilsen",
}



  public convetToPDF(bcontent: any) {
   this.showContent = false;
   this.detectorChange.detectChanges();
    var data = bcontent as HTMLCanvasElement;
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
      pdf.save('Bill_no_'+this.billpagecontent.billId); // Generated PDF
      this.showContent = true;
      pdf.output("dataurlnewwindow");

      //var blob = new Blob([pdf], {type: 'application/pdf'});
//var blobURL = URL.createObjectURL(blob);
//window.open(blobURL);
    });
  }
}
