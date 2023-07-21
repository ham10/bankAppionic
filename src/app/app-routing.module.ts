import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '',
    redirectTo: 'subscribe',
    pathMatch: 'full'
  },
  {
    path: 'subscribe',
    loadChildren: () => import('./subscribe/subscribe.module').then( m => m.SubscribePageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'home-bank',
    loadChildren: () => import('./home-bank/home-bank.module').then( m => m.HomeBankPageModule)
  },
  {
    path: 'barcode-scanning',
    loadChildren: () =>
      import('./barcode-scanning/barcode-scanning.module').then(
        (m) => m.BarcodeScanningModule
      ),
  },
  {
    path: 'transaction-client',
    loadChildren: () => import('./transaction-client/transaction-client.module').then( m => m.TransactionClientPageModule)
  },  {
    path: 'depot-retrait-transfert',
    loadChildren: () => import('./depot-retrait-transfert/depot-retrait-transfert.module').then( m => m.DepotRetraitTransfertPageModule)
  },
  {
    path: 'retrait',
    loadChildren: () => import('./retrait/retrait.module').then( m => m.RetraitPageModule)
  },
  {
    path: 'details',
    loadChildren: () => import('./details/details.module').then( m => m.DetailsPageModule)
  },
  {
    path: 'transfert',
    loadChildren: () => import('./transfert/transfert.module').then( m => m.TransfertPageModule)
  },
  {
    path: 'home-transaction',
    loadChildren: () => import('./home-transaction/home-transaction.module').then( m => m.HomeTransactionPageModule)
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
