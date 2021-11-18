import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';


import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { applicationRoutes } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { QuizComponent } from './quiz/quiz.component';
import { HttpClientModule } from '@angular/common/http';
import { ResultComponent } from './result/result.component';
import { MenuComponent } from './menu/menu.component';
import { CuisineService } from './models/cuisine.service';
import { CartComponent } from './cart/cart.component';
import { ProductComponent } from './product/product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product/add-product.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { SuccesspageComponent } from './successpage/successpage.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';


@NgModule({
  declarations: [
    MainComponent,
    HomeComponent,
    AboutComponent,
    PagenotfoundComponent,
    FooterComponent,
    QuizComponent,
    ResultComponent,
    MenuComponent,
    CartComponent,
    ProductComponent,
    ProductDetailComponent,
    LoginComponent,
    AddProductComponent,
    CheckoutComponent,
    SuccesspageComponent,
    SignupComponent,
    LogoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(applicationRoutes)
  ],
  providers: [CuisineService],
  bootstrap: [MainComponent]
})
export class AppModule { }
