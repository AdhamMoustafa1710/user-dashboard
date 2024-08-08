import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadSpinnerComponent } from './load-spinner/load-spinner.component';




@NgModule({
  declarations: [
    LoadSpinnerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,

  ],
  exports: [

    LoadSpinnerComponent,


  ]
})
export class SharedModule { }
