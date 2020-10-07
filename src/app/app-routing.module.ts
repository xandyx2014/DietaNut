import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./src/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'composicion',
    loadChildren: () => import('./composicion/composicion.module').then( m => m.ComposicionPageModule)
  },
  {
    path: 'intercambio',
    loadChildren: () => import('./intercambio/intercambio.module').then( m => m.IntercambioPageModule)
  },
  {
    path: 'aboutus',
    loadChildren: () => import('./aboutus/aboutus.module').then( m => m.AboutusPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot( routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
