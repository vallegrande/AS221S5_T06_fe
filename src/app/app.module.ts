import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Importar FormsModule

import { AppComponent } from './app.component';
import { ComputerVisionService } from './modules/service/computer-vision.service';
import { AppRoutingModule } from './app-routing.module';
import { ComputerVisionComponent } from './modules/pages/computer-vision/computer-vision.component';
import { NavComponent } from './modules/pages/nav/nav.component';
import { ComputerGaleryComponent } from './modules/pages/computer-galery/computer-galery.component';



@NgModule({
  declarations: [
    NavComponent,
    AppComponent,
    ComputerGaleryComponent,
    ComputerVisionComponent],
  imports: [
    ToastrModule.forRoot(),
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [
    ComputerVisionService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
