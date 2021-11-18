import {Routes} from "@angular/router"
import { AboutComponent } from "./about/about.component"
import { AddProductComponent } from "./add-product/add-product.component"
import { CartComponent } from "./cart/cart.component"
import { CheckoutComponent } from "./checkout/checkout.component"
import { HomeComponent } from "./home/home.component"
import { LoginComponent } from "./login/login.component"
import { LogoutComponent } from "./logout/logout.component"
import { MenuComponent } from "./menu/menu.component"
import { PagenotfoundComponent } from "./pagenotfound/pagenotfound.component"
import { ProductDetailComponent } from "./product-detail/product-detail.component"
import { ProductComponent } from "./product/product.component"
import { QuizComponent } from "./quiz/quiz.component"
import { ResultComponent } from "./result/result.component"
import { SignupComponent } from "./signup/signup.component"
import { SuccesspageComponent } from "./successpage/successpage.component"

export const applicationRoutes: Routes = [
    // {path: '', component: HomeComponent},
    {path: '', redirectTo:'home', pathMatch:'full'},
    {path: 'quiz', component: QuizComponent},
    {path: 'home', component: HomeComponent},
    {path: 'menu', component: MenuComponent},
    {path: 'cart', component: CartComponent},
    {path: 'product', component: ProductComponent},
    {path: 'login', component: LoginComponent},
    {path: 'logout', component: LogoutComponent},
    { path: 'product-detail/:id', component: ProductDetailComponent },
    {path: 'signup', component: SignupComponent},
    {path: 'add-product', component: AddProductComponent},
    {path: 'checkout', component: CheckoutComponent},
    {path: 'success', component: SuccesspageComponent},
    {path: 'about', component: AboutComponent},
    {path: 'result', component: ResultComponent},
    {path: '**', component: PagenotfoundComponent}
]