import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home.routing.module';
import { MainModule } from '@app/core/shared/main/main.module';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@app/shared/main/material.module';
import { HttpClientModule } from '@angular/common/http';
import { SpecificUserComponent } from './specific-user/specific-user.component';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '@app/views/shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    HomeRoutingModule,
    MainModule,
    TranslateModule,
    MaterialModule,
    HttpClientModule,
    MatCardModule,
    SharedModule,

  ],
  declarations: [ HomeComponent, SpecificUserComponent ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]

})
export class HomeModule { }