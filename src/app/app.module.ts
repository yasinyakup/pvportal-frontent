import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/shared/navbar/navbar.component';
import { MainComponent } from './component/main/main.component';
import { SidebarComponent } from './component/share/sidebar/sidebar.component';
import { MaterialModule } from './material/material.module';
import { RegisterComponent } from './component/register/register.component';
import { AuthService } from './service/auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Requestfilter } from './filter/requestfilter';
import { MainService } from './service/main.service';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NavbarComponent,
    MainComponent,
    SidebarComponent,
    RegisterComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule
  ],
  providers: [AuthService,
    MainService,
    [
      {
        provide: HTTP_INTERCEPTORS,
        useClass: Requestfilter,
        multi: true
      }
    ]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
