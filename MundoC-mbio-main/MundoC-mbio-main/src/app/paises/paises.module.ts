import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PaisesPage } from './paises.page';
import { PaisesPageRoutingModule } from './paises-routing.module'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaisesPageRoutingModule 
  ],
  declarations: [PaisesPage]
})
export class PaisesPageModule {}
