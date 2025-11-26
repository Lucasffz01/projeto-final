import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SaibaMaisPage } from './saiba-mais.page';

const routes: Routes = [
  {
    path: '',
    component: SaibaMaisPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SaibaMaisPageRoutingModule {}
