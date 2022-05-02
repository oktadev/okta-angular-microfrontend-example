import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { OktaCallbackComponent } from '@okta/okta-angular';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  { path: 'basket', loadChildren: () => import('mfeBasket/Module').then(m => m.BasketModule) },
  { path: 'profile', loadChildren: () => import('mfeProfile/Module').then(m => m.ProfileModule)},
  { path: 'login/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
