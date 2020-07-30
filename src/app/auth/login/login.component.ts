import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {map, take} from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  isLogingIn = false;
  ngOnInit(): void {
    this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        if (isAuth) {
          if (this.authService.user){
            this.isLogingIn = true;
            setTimeout(() => {
              this.isLogingIn = false;
              this.router.navigate(['/dashboard']);

            }, 2500);
          }
        }
      })).subscribe(r => {
    });

  }

  onSubmit(authF: NgForm): void{
    if (!authF.valid) {
      return;
    }
    const email = authF.control.get(['email']).value;
    const pass = authF.control.get(['password']).value;
    const rememberMe = authF.control.get(['remember']).value;
    this.isLogingIn = true;
    this.authService.login(email, pass, rememberMe).subscribe(res => {
      console.log(res);
      this.isLogingIn = false;
    });
  }
}
