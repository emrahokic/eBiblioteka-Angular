import {BrowserModule, Title} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatSliderModule } from '@angular/material/slider';
import {MatSidenavModule} from '@angular/material/sidenav';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import { AuthComponent } from './auth/auth.component';
import {AppRoutingModule} from './app-routing/app-routing.module';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import {RouterStateSnapshot} from '@angular/router';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {FormsModule, NgModel} from '@angular/forms';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {AuthInterceptor} from './auth/auth.interceptor';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NavbarComponent } from './home/navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import {DropdownDirective} from './shared/dropdown.directive';
import {MatRippleModule} from '@angular/material/core';
import { BooksComponent } from './dashboard/books/books.component';
import { DashboardNavbarComponent } from './dashboard/dashboard-navbar/dashboard-navbar.component';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatListModule} from '@angular/material/list';
import {MatBadgeModule} from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';
import { NotificationsComponent } from './dashboard/notifications/notifications.component';
import { BookItemComponent } from './dashboard/books/book-item/book-item.component';
import { BookDetailsComponent } from './dashboard/books/book-details/book-details.component';
import {DatePipe} from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    RegisterComponent,
    LoginComponent,
    DashboardComponent,
    NavbarComponent,
    HomeComponent,
    DropdownDirective,
    BooksComponent,
    DashboardNavbarComponent,
    NotificationsComponent,
    BookItemComponent,
    BookDetailsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatSidenavModule,
    MatButtonModule,
    MatInputModule,
    MatRippleModule,
    HttpClientModule,
    FormsModule,
    MatCheckboxModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatTooltipModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule
  ],
  providers: [ DatePipe , {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
