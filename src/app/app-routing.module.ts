import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComputerVisionComponent } from './modules/pages/computer-vision/computer-vision.component';

const routes: Routes = [
  {
    path: 'computer-vision',
    component: ComputerVisionComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
