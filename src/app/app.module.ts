import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http'

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
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    HttpClientModule,
    RouterModule.forRoot([    
      
      { path : '',
        children: [
          // /sifiso
          { path : '', component : UserComponent },
          // /sifiso/login
          { path : 'login', component : LoginComponent },
          { path : 'singleview', component : SingleviewComponent },
          { path : 'dashboard', component : DashboardComponent }
        ] },
    { path : 'stream', component : StreamComponent },
    { path : '**', component : NotfoundComponent }
  ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
