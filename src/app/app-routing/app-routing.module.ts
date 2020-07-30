import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {AppComponent} from '../app.component';
import {AuthComponent} from '../auth/auth.component';
import {LoginComponent} from '../auth/login/login.component';
import {RegisterComponent} from '../auth/register/register.component';
import {AuthGuard} from '../auth/auth.guard';
import {DashboardComponent} from '../dashboard/dashboard.component';
import {HomeComponent} from '../home/home.component';
import {BooksComponent} from '../dashboard/books/books.component';
import {BookDetailsComponent} from '../dashboard/books/book-details/book-details.component';

const appRoutes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'  },
  {path: 'home', component: HomeComponent },
  {path: 'dashboard', canActivate: [AuthGuard], component: DashboardComponent, children: [
      {path: 'books', component: BooksComponent},
      {path: 'books/:id', component: BookDetailsComponent}
    ]},
  {path: 'auth', component: AuthComponent, children: [
      { path: 'login', component: LoginComponent},
      { path: 'register', component: RegisterComponent}
    ]}
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(appRoutes),
    CommonModule
  ],
  exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule { }
