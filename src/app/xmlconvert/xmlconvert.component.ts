import { Component, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser'; 

@Component({
  selector: 'app-xmlconvert',
  templateUrl: './xmlconvert.component.html',
  styleUrls: ['./xmlconvert.component.css']
})
export class XmlconvertComponent implements OnInit {
  _httpClient!: HttpClient;
  xmlcontent:any;
  htmlcontent: any;
  sanitizer!: DomSanitizer;
  convert() {
    // const xml = this.loadXMLDoc("https://mydtd.s3.ap-northeast-1.amazonaws.com/xslt/XSLT-Javascript/test.xml");
    //const xsl = this.loadXMLDoc("https://mydtd.s3.ap-northeast-1.amazonaws.com/xslt/XSLT-Javascript/test.xsl");
    //https://mydtd.s3.ap-northeast-1.amazonaws.com/xslt/test.html
    const xml = this.loadXMLDoc("assets/xml/test.xml");
    const xsl = this.loadXMLDoc("assets/xml/test.xsl");
    const xsltProcessor = new XSLTProcessor();
    xsltProcessor.importStylesheet(xsl);
    const resultDocument = xsltProcessor.transformToFragment(xml, document);
        //document.getElementById("xmlcontent")?.appendChild(resultDocument);
    this.xmlcontent=resultDocument;
  }
  constructor(_httpClient: HttpClient) { 

  }
  ngOnInit(): void {
  }

  loadXMLDoc(filename: any): any {
    console.log(filename);
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", filename, false);
    try { xhttp.responseType = 'document' } catch (err) { } // Helping IE11
    xhttp.send("");
    return xhttp.responseXML;
  }

  getHtmlFile() {
    let path = 'assets/xml/test.html';
    this._httpClient.get(path, {responseType: "text"}).subscribe(
      data => {
        this.htmlcontent = this.sanitizer.bypassSecurityTrustHtml(data);
      });
    //document.getElementById("htmlcontent")?.appendChild(this.htmlcontent);
  }
 
}

