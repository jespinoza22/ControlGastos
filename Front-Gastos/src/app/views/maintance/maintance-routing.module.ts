import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TypeComponent } from '../maintance/type/type.component';

const routes: Routes = [
  {
    path: 'type',
    component: TypeComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MaintanceRoutingModule { }
