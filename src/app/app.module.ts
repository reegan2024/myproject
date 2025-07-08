import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatOptionModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ToastrModule} from 'ngx-toastr';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import {MatRadioModule} from '@angular/material/radio';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatCardModule} from '@angular/material/card'

import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { UsermanagementModule } from './usermanagement/usermanagement.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { BillingComponent } from './billing/billing.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponent } from './test/test.component';
import { XmlconvertComponent } from './xmlconvert/xmlconvert.component';
import { ExternalhtmlComponent } from './externalhtml/externalhtml.component';
import { BillpageComponent } from './billpage/billpage.component';
import { PdfcontentService } from './services/pdfcontent.service';
import { JavascriptAddingComponent } from './javascript-adding/javascript-adding.component';
import { CommonService } from './services/common.service';
import { LoginComponent } from './login/login.component';
import { NotificationService } from './services/notification.service';
import { SpinnerComponent } from './spinner/spinner.component';
import { HeaderComponent } from './header/header.component';
import { LeftpanelComponent } from './leftpanel/leftpanel.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { DialogpopupComponent } from './dialogpopup/dialogpopup.component';
import { AuthService } from './services/auth.service';
import { TokenInterceptorService } from './sharedd/token-interceptor.service';
import { BillmanagementComponent } from './billmanagement/billmanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { ProductpopupComponent } from './popups/productpopup/productpopup.component';
import { TestjustComponent } from './testjust/testjust.component';
import { MessageComponent } from './popups/message/message.component';
import { TestchildComponent } from './testchild/testchild.component';
import { ProductsComponent } from './products/products.component';
import { BfoodsComponent } from './products/bfoods/bfoods.component';
import { AnfoodsComponent } from './products/anfoods/anfoods.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    BillingComponent,
    TestComponent,
    XmlconvertComponent,
    ExternalhtmlComponent,
    BillpageComponent,
    JavascriptAddingComponent,
    LoginComponent,
    SpinnerComponent,
    HeaderComponent,
    LeftpanelComponent,
    IntroductionComponent,
    DialogpopupComponent,
    BillmanagementComponent,
    ProductmanagementComponent,
    ProductpopupComponent,
    TestjustComponent,
    MessageComponent,
    TestchildComponent,
    ProductsComponent,
    BfoodsComponent,
    AnfoodsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule, 
    MatButtonModule,
    NoopAnimationsModule,
    MatSlideToggleModule,
    BrowserAnimationsModule,
    MatOptionModule,
    MatSelectModule,
    MatRadioModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatDialogModule,
    UsermanagementModule,
    MatTableModule,
    MatInputModule,
    MatSortModule,
    MatTooltipModule,
    MatCardModule,
    ToastrModule.forRoot({})
  ],
  providers: [PdfcontentService, CommonService, AuthService,{provide:HTTP_INTERCEPTORS,useClass:TokenInterceptorService,multi:true}],
  bootstrap: [AppComponent],
  entryComponents:[DialogpopupComponent,ProductpopupComponent,MessageComponent]
})
export class AppModule { }
