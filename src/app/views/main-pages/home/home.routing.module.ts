import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'app/core/guards/auth.guard';
import { HomeComponent } from './home.component';
import { SpecificUserComponent } from './specific-user/specific-user.component';

const routes: Routes = [

  { path: '', redirectTo: 'users', pathMatch: 'full' },
  { path: 'users', component: HomeComponent },
  { path: 'users/:page', component: HomeComponent },
  { path: 'user/:id', component: SpecificUserComponent },



  { path: '', component: HomeComponent },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class HomeRoutingModule { }

