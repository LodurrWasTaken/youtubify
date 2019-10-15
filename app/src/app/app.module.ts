import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';

import { MaterialModule } from './modules/material/material.module';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './views/login/login.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DownloadComponent } from './views/download/download.component';
import { SettingsComponent } from './views/settings/settings.component';
import { LibraryComponent } from './views/library/library.component';
import { StoreModule } from '@ngrx/store';
import { libraryReducer } from './store/reducers';
import { ControlsComponent } from './components/controls/controls.component';

const config: SocketIoConfig = {
  url: 'http://localhost:3000',
  options: {}
}

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    DashboardComponent,
    SidebarComponent,
    DownloadComponent,
    SettingsComponent,
    LibraryComponent,
    ControlsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    SocketIoModule.forRoot(config),
    StoreModule.forRoot({ library: libraryReducer }),
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
