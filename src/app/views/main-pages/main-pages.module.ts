import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainPagesComponent } from './main-pages.component';
import { MainModule } from '@app/core/shared/main/main.module';
import { LayoutModule } from '../layout/layout.module';
import { MainPagesRoutingModule } from './main-pages.routing.module';
import { HomeModule } from './home/home.module';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MainModule,
    LayoutModule,
    MainPagesRoutingModule,
    HomeModule,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [ MainPagesComponent ]
})
export class MainPagesModule { }
