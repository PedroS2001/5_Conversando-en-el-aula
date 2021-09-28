import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BPage } from './b.page';

const routes: Routes = [
  {
    path: '',
    component: BPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BPageRoutingModule {}
