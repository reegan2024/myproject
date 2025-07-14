import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { BillingComponent } from './billing/billing.component';
import { TestComponent } from './test/test.component';
import { XmlconvertComponent } from './xmlconvert/xmlconvert.component';
import { ExternalhtmlComponent } from './externalhtml/externalhtml.component';
import { BillpageComponent } from './billpage/billpage.component';
import { JavascriptAddingComponent } from './javascript-adding/javascript-adding.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { IntroductionComponent } from './introduction/introduction.component';
import { ListusersComponent } from './usermanagement/listusers/listusers.component';
import { AuthenticateGuard } from './shared/authenticate.guard';
import { BillmanagementComponent } from './billmanagement/billmanagement.component';
import { ProductmanagementComponent } from './productmanagement/productmanagement.component';
import { TestjustComponent } from './testjust/testjust.component';
import { ProductsComponent } from './products/products.component';
import { BfoodsComponent } from './products/bfoods/bfoods.component';
import { AnfoodsComponent } from './products/anfoods/anfoods.component';

const routes: Routes = [
  /* {path:'', component:TestjustComponent}, */
  {path:'', component:IntroductionComponent},
  {path:'intro', component:IntroductionComponent},
  {path:'login', component:LoginComponent},
  {path:'header', component:HeaderComponent},
  /* {path:'products', component:HomepageComponent}, */
   {path:'products', component:ProductsComponent,children:[{path:"bfoods",component:BfoodsComponent},{path:"anfoods",component:AnfoodsComponent}]},
   {path:'products/**', redirectTo:"products"},
   {path:'billing', component:BillingComponent},
  {path:'test', component:TestComponent},
  {path:'learn', component:TestjustComponent},
  {path:'convert', component:XmlconvertComponent},
  {path:'ehtml', component:ExternalhtmlComponent},
  {path:'billmanagement', component:BillmanagementComponent},
  {path:'productmanagement', component:ProductmanagementComponent},
  {path:'listuser',component:ListusersComponent,canActivate:[AuthenticateGuard]},
  {path:'**', redirectTo:"", pathMatch:"full"},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
