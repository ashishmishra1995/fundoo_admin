import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from "./components/admin-login/admin-login.component";
import { AdminDashboardComponent } from "./components/admin-dashboard/admin-dashboard.component";
import { AuthGuard } from './auth.guard';
import { AdminQNaComponent } from './components/admin-q-na/admin-q-na.component';

const routes: Routes = [

  { path: 'admin-login', component: AdminLoginComponent },
  { path: 'admin-home', component: AdminDashboardComponent, canActivate: [AuthGuard] },
  { path: 'admin-questionAndAnswer', component:AdminQNaComponent, canActivate: [AuthGuard] },
  { path: '', component: AdminDashboardComponent, pathMatch: 'full' , canActivate: [AuthGuard] },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


