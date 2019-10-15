import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DownloadComponent } from './views/download/download.component';
import { LibraryComponent } from './views/library/library.component';
import { SettingsComponent } from './views/settings/settings.component';


const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardComponent
  // },
  {
    path: 'add',
    component: DownloadComponent
  },
  {
    path: 'library',
    component: LibraryComponent
  },
  {
    path: 'settings',
    component: SettingsComponent
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/library'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
