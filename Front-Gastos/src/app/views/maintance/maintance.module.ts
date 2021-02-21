import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaintanceRoutingModule } from './maintance-routing.module';
import { TypeComponent } from '../maintance/type/type.component';


@NgModule({
  declarations: [
    TypeComponent
  ],
  imports: [
    CommonModule,
    MaintanceRoutingModule
  ]
})
export class MaintanceModule { }
