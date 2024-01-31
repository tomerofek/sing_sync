import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeViewComponent } from './components/pages/home-view/home-view.component';
import { RoomViewComponent } from './components/pages/room-view/room-view.component';

// import { HomeComponent } from './components/pages/home/home.component';
// import { FoodPageComponent } from './components/pages/food-page/food-page.component';
// import { CartPageComponent } from './components/pages/cart-page/cart-page.component';
// import { LoginPageComponent } from './components/pages/login-page/login-page.component';

const routes: Routes = [
  //examples:
  // { path: '', component: HomeComponent },
  // { path: 'search/:searchTerm', component: HomeComponent },
  // { path: 'tag/:tag', component: HomeComponent },
  // {path:'food/:id', component:FoodPageComponent},
  // {path:'cart-page', component: CartPageComponent},
  // {path:'login', component: LoginPageComponent}

  {path: '', component: HomeViewComponent},
  {path: 'room/:roomid', component: RoomViewComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
