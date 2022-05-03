import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductsComponent } from './products/products.component';
import { OktaAuthGuard, OktaCallbackComponent } from '@okta/okta-angular';
import { loadRemoteModule } from '@angular-architects/module-federation';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', component: ProductsComponent },
  {
    path: 'basket',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.mfe.mfeBasket}/remoteEntry.js`,
      exposedModule: './Module'
    }).then(m => m.BasketModule)
  },
  {
    path: 'profile',
    loadChildren: () => loadRemoteModule({
      type: 'module',
      remoteEntry: `${environment.mfe.mfeProfile}/remoteEntry.js`,
      exposedModule: './Module'
    }).then(m => m.ProfileModule),
    canActivate: [OktaAuthGuard]
  },
  { path: 'login/callback', component: OktaCallbackComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
