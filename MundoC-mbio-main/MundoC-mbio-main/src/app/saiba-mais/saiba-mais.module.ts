import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SaibaMaisPageRoutingModule } from './saiba-mais-routing.module';

import { SaibaMaisPage } from './saiba-mais.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SaibaMaisPageRoutingModule
  ],
  declarations: [SaibaMaisPage]
})
export class SaibaMaisPageModule {}
