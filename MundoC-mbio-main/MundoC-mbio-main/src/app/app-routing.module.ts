import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'home',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'saiba-mais',
    loadChildren: () => import('./saiba-mais/saiba-mais.module').then(m => m.SaibaMaisPageModule)
  },
  {
    path: 'contato',
    loadChildren: () => import('./contato/contato.module').then(m => m.ContatoPageModule)
  },
  {
    path: 'paises', 
    loadChildren: () => import('./paises/paises.module').then(m => m.PaisesPageModule)
  }
];


@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
