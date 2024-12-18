import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guard/AuthGuard';
import { RegisterComponent } from './components/auth/register/register.component';
import { MenusComponent } from './pages/menus/menus.component';
import { OrdersComponent } from './pages/orders/orders.component';
import { ClientOrderComponent } from './pages/orders/client/client.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
  },
  {
    path: "register",
    component: RegisterComponent
  },
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "restaurants/:restaurantId/menu",
    component: MenusComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "restaurants/:restaurantId/orders",
    component: OrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "client/:clientId/orders",
    component: ClientOrderComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
