import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule, TranslateStore } from '@ngx-translate/core';
import { LayoutModule } from './views/layout/layout.module';
import { InterceptorsProvider } from './core/interceptors/index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainPagesModule } from './views/main-pages/main-pages.module';
import { MaterialModule } from './shared/main/material.module';
import { SharedModule } from './views/shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

// export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
//   return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
// }

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    LayoutModule,
    MainPagesModule,
    MaterialModule,
    ReactiveFormsModule,
    SharedModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  exports: [],
  providers: [
    InterceptorsProvider
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }