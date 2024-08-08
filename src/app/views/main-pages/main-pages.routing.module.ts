import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { MainPagesComponent } from './main-pages.component';
import { LoginGuard } from '@app/core/guards/login.guard';

const routes: Routes = [

  { path: '', redirectTo: 'user-dashboard', pathMatch: 'full' },

  {
    path: 'user-dashboard',
    component: MainPagesComponent,
    loadChildren: () =>
      import('@modules/home/home.module').then((m) => m.HomeModule),
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class MainPagesRoutingModule { }

