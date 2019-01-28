import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ScrollDispatchModule} from '@angular/cdk/scrolling';


import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { StreamComponent } from './components/stream/stream.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { SingleviewComponent } from './components/singleview/singleview.component';
import { ProfileComponent } from './components/profile/profile.component';
import { UsersComponent } from './components/users/users.component';

import {
  AuthGuardService as AuthGuard
} from './services/auth-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    StreamComponent,
    NotfoundComponent,
    LoginComponent,
    DashboardComponent,
    FooterComponent,
    HeaderComponent,
    LayoutComponent,
    SingleviewComponent,
    ProfileComponent,
    UsersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ScrollDispatchModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([

    { path : '', component : UserComponent },
    { path : 'login', component : LoginComponent },
    { path : 'dashboard', component : DashboardComponent},
    { path : 'singleview/:id', component : SingleviewComponent},
    { path : 'stream', component : StreamComponent},
    { path : 'profile', component : ProfileComponent},
    { path : 'users', component : UsersComponent},
    { path : '**', component : NotfoundComponent }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
