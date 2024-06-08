import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerVisionComponent } from './modules/pages/computer-vision/computer-vision.component';
import { NavComponent } from './modules/pages/nav/nav.component';
import { ComputerGaleryComponent } from './modules/pages/computer-galery/computer-galery.component';

const routes: Routes = [
  {
    path: 'computer-vision',
    component: ComputerVisionComponent
  },
  {
    path: 'nav',
    component: NavComponent
  },
  {
    path: 'computer-galery',
    component: ComputerGaleryComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
